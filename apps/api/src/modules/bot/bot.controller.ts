import { Public } from '@common/decorators/public';
import { TelegramService } from '@external/telegram/telegram.service';
import { Body, Controller, Post } from '@nestjs/common';

const MINI_APP_HINT = 'Откройте мини-приложение, чтобы посмотреть облигации.';

@Controller('bot')
export class BotController {
  constructor(private telegram: TelegramService) {}

  @Public()
  @Post()
  public async handleMessage(@Body() body: { message?: { chat?: { id?: number } } }) {
    const chatId = body.message?.chat?.id;
    if (!chatId) {
      return;
    }
    try {
      await this.telegram.sendMessage(chatId, MINI_APP_HINT);
    } catch (error) {
      console.error(error);
    }
  }
}
