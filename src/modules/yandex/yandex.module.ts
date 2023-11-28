import { Module } from '@nestjs/common';
import { YandexService } from './yandex.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule.register({ baseURL: 'https://translate.api.cloud.yandex.net/' }),
  ],
  providers: [YandexService],
  exports: [YandexService],
})
export class YandexModule { }
