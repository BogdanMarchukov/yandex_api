import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller('yandex')
export class YandexController {
  @MessagePattern('notifications')
  getNotifications(@Payload() data: string, @Ctx() context: RmqContext) {
    console.log(`data: ${data}`);
    return 'test-test';
  }
}
