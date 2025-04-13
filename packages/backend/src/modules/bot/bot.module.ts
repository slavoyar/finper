import { BondModule } from '@modules/bond/bond.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { CommandFactory } from './commands/command.factory';
import { TelegramService } from './telegram/telegram.service';
import { TelegramCronService } from './telegram/telegram-cron.service';

@Module({
  imports: [HttpModule, BondModule],
  // TODO: Run telegram cron service only in dev mode
  providers: [BotService, CommandFactory, TelegramService, TelegramCronService],
  controllers: [BotController],
})
export class BotModule {}
