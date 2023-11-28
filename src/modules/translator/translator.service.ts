import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpMethod } from '../yandex/type/yandex.type';
import { YandexService } from '../yandex/yandex.service';
import {
  DetectLanguageBody,
  DetectLanguageResult,
  TranslateBody,
  TranslateResult,
} from './type/translator.type';

@Injectable()
export class TranslatorService {
  constructor(
    private configService: ConfigService,
    private yandexService: YandexService,
  ) { }
  private readonly folderId =
    this.configService.get<string>('FOLDER_ID_YANDEX');

  async detectLanguage(text: string): Promise<DetectLanguageResult> {
    const body = {
      text,
      folderId: this.folderId,
    };
    const result = await this.yandexService.httpAdapter<
      DetectLanguageBody,
      DetectLanguageResult
    >(HttpMethod.Post, 'translate/v2/detect', body);

    return result;
  }

  async translate(
    text: string,
    targetLanguageCode: string,
  ): Promise<TranslateResult> {
    const body = {
      texts: [text],
      targetLanguageCode,
      folderId: this.folderId,
    };
    const result = await this.yandexService.httpAdapter<
      TranslateBody,
      TranslateResult
    >(HttpMethod.Post, 'translate/v2/detect', body);

    return result;
  }
}
