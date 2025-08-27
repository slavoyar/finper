import { TelegramAuthGuard } from '@external/telegram/telegram-auth.guard';
import { BondModule } from '@modules/bond/bond.module';
import { BotModule } from '@modules/bot/bot.module';
import { BudgetModule } from '@modules/budget/budget.module';
import { PresetModule } from '@modules/preset/preset.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    BotModule,
    BondModule,
    BudgetModule,
    PresetModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: TelegramAuthGuard,
    },
  ],
})
export class AppModule {}
