import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('notifications')
  getNotifications(@Payload() data: string, @Ctx() context: RmqContext) {
    console.log(`data: ${data}`);
    return 'test-test';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
