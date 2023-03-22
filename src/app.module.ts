import { Module } from '@nestjs/common';
import { YandexModule } from './yandex/yandex.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    YandexModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
