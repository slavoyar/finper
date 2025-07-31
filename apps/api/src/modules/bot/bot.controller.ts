import { Public } from '@common/decorators/public';
import { Update } from '@external/telegram/interfaces';
import { Body, Controller, Post } from '@nestjs/common';

import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
  constructor(private botService: BotService) {}

  @Public()
  @Post()
  public async handleMessage(@Body() body: Update) {
    try {
      await this.botService.handleUpdate(body);
    } catch (error) {
      console.error(error);
    }
  }
}
