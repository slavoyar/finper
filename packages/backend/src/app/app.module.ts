import { BotModule } from '@modules/bot/bot.module';
import { TinkoffModule } from '@modules/tinkoff/tinkoff.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TinkoffModule,
    BotModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
