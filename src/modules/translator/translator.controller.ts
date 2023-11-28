import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TranslatorService } from './translator.service';

@Controller('translator')
export class TranslatorController {
  constructor(private readonly translatorService: TranslatorService) { }

  @MessagePattern('translate')
  async getNotifications(@Payload() text: string) {
    return JSON.stringify(await this.translatorService.translate(text, 'en'));
  }
}
