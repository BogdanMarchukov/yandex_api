import { Module } from '@nestjs/common';
import { YandexController } from './yandex.controller';
import { YandexService } from './yandex.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule],
  controllers: [YandexController],
  providers: [YandexService],
})
export class YandexModule {}
