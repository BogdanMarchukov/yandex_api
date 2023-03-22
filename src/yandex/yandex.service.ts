import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

interface IamToken {
  iamToken: string;
  expiresAt: string;
}
@Injectable()
export class YandexService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  private iamToken = '';
  private readonly tokenUrl = this.configService.get<string>(
    'GER_IAM_TOKEN_URL_YANDEX',
  );
  private readonly oAuthYandexToken =
    this.configService.get<string>('OAUTH_TOKEN_YANDEX');
  @Cron('* * 1 * * *')
  async getToken() {
    const { data } = await firstValueFrom(
      this.httpService
        .post<IamToken>(this.tokenUrl, {
          yandexPassportOauthToken: this.oAuthYandexToken,
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );
    this.iamToken = data.iamToken;
  }
  async onModuleInit() {
    await this.getToken();
  }
}
