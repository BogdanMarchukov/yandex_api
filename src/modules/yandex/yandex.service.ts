import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { HttpMethod, IamToken } from './type/yandex.type';

@Injectable()
export class YandexService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) { }

  private readonly tokenUrl = this.configService.get<string>(
    'GER_IAM_TOKEN_URL_YANDEX',
  );
  private readonly oAuthYandexToken =
    this.configService.get<string>('OAUTH_TOKEN_YANDEX');

  public iamToken = '';

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

  async httpAdapter<B, R>(
    mhetod: HttpMethod,
    url: string,
    body?: B,
  ): Promise<R> {
    const { data } = await firstValueFrom(
      this.httpService[mhetod]<R>(url, body, {
        headers: {
          Authorization: `Bearer ${this.iamToken}`,
          'Content-Type': 'application/json',
        },
      }).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    return data;
  }
}
