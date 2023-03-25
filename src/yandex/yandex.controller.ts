import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { YandexService } from './yandex.service';

@Controller()
export class YandexController {
  constructor(private readonly yandexService: YandexService) {}
  @MessagePattern('translate')
  async getNotifications(@Payload() text: string) {
    return JSON.stringify(await this.yandexService.translate(text, 'en'));
  }
}
