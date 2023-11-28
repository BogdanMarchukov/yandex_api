import { Module } from '@nestjs/common';
import { YandexModule } from '../yandex/yandex.module';
import { TranslatorController } from './translator.controller';
import { TranslatorService } from './translator.service';

@Module({
  imports: [YandexModule],
  controllers: [TranslatorController],
  providers: [TranslatorService],
})
export class TranslatorModule { }
