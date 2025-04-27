import { TelegramService } from '@external/telegram/telegram.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { BotService } from './bot.service';

@Injectable()
export class BotCronService {
  private offset: number;

  constructor(
    private readonly telegramService: TelegramService,
    private readonly botService: BotService
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleUpdates() {
    const updates = await this.telegramService.getUpdates(this.offset);
    for (const update of updates) {
      await this.botService.handleUpdate(update);
      this.offset = update.update_id + 1;
    }
  }
}
