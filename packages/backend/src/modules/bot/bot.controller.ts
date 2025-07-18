import { Update } from '@external/telegram/interfaces';
import { Body, Controller, Post } from '@nestjs/common';

import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
  constructor(private botService: BotService) {}

  @Post()
  public async handleMessage(@Body() body: Update) {
    await this.botService.handleUpdate(body);
  }
}
