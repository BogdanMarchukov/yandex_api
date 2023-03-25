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

interface Translation {
  text: string;
  detectedLanguageCode: string;
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
  private readonly folderId =
    this.configService.get<string>('FOLDER_ID_YANDEX');
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

  async detectLanguage(text: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .post<{ languageCode: string }>(
          'https://translate.api.cloud.yandex.net/translate/v2/detect',
          {
            text,
            folderId: this.folderId,
          },
          {
            headers: {
              Authorization: `Bearer ${this.iamToken}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );
    return data;
  }

  async translate(text: string, targetLanguageCode: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .post<Translation[]>(
          'https://translate.api.cloud.yandex.net/translate/v2/translate',
          {
            texts: [text],
            targetLanguageCode,
            folderId: this.folderId,
          },
          {
            headers: {
              Authorization: `Bearer ${this.iamToken}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );
    return data;
  }
}
