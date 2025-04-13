import { Body, Controller } from '@nestjs/common';

import { BotService } from './bot.service';
import { Update } from './telegram';

@Controller('bot')
export class BotController {
  constructor(private botService: BotService) {}

  public async handleMessage(@Body() body: Update) {
    await this.botService.handleUpdate(body);
  }
}
