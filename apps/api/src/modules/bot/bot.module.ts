import { TelegramModule } from '@external/telegram/telegram.module';
import { Module } from '@nestjs/common';

import { BotController } from './bot.controller';

@Module({
  imports: [TelegramModule],
  controllers: [BotController],
})
export class BotModule {}
