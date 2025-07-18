import { TelegramModule } from '@external/telegram/telegram.module';
import { TelegramService } from '@external/telegram/telegram.service';
import { BondModule } from '@modules/bond/bond.module';
import { BondService } from '@modules/bond/bond.service';
import { PresetModule } from '@modules/preset/preset.module';
import { PresetService } from '@modules/preset/preset.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { CommandFactory } from './commands/command.factory';

@Module({
  imports: [HttpModule, BondModule, TelegramModule, PresetModule],
  // TODO: Run bot cron service only in dev mode
  // providers: [BotService, CommandFactory, BotCronService, TelegramService, BondService, PresetService],
  providers: [BotService, CommandFactory, TelegramService, BondService, PresetService],
  controllers: [BotController],
})
export class BotModule {}
