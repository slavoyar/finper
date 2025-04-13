import { Injectable } from '@nestjs/common';

import { CommandProcessor } from './commands/command.processor';
import { CallbackQuery, Message, MessageResponse, Update } from './telegram';
import { TelegramService } from './telegram/telegram.service';

@Injectable()
export class BotService {
  constructor(
    private commandProcessor: CommandProcessor,
    private telegramService: TelegramService
  ) {}

  public async handleUpdate(update: Update) {
    let response: MessageResponse | undefined;
    if (update.message) {
      response = await this.handleMessage(update.message);
    } else if (update.callback_query) {
      response = await this.handleCallbackQuery(update.callback_query);
    }

    if (response) {
      await this.telegramService.sendMessage(response);
    }
  }

  private async handleMessage(message: Message): Promise<MessageResponse | undefined> {
    // If we have many entities, we need to find the one that is a command
    // and process it
    const entity = message.entities?.find((entity) => entity.type === 'bot_command');
    if (!entity) {
      return undefined;
    }
    return this.commandProcessor.processCommand(
      message.text.slice(entity.offset + 1, entity.offset + entity.length),
      { userId: message.from?.id, chatId: message.chat.id }
    );
  }

  private async handleCallbackQuery(callbackQuery: CallbackQuery): Promise<MessageResponse | undefined> {
    if (!callbackQuery.data || !callbackQuery.message) {
      return undefined;
    }
    return this.commandProcessor.processCommand(callbackQuery.data, {
      userId: callbackQuery.from.id,
      chatId: callbackQuery.message.chat.id,
    });
  }
}
