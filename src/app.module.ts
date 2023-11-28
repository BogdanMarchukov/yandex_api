import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TranslatorModule } from './modules/translator/translator.module';
import { YandexModule } from './modules/yandex/yandex.module';

@Module({
  imports: [
    YandexModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TranslatorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
