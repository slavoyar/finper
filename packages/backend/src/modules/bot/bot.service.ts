import { CallbackQuery, Message, Update } from '@external/telegram/interfaces';
import { TelegramService } from '@external/telegram/telegram.service';
import { Injectable } from '@nestjs/common';

import { CommandFactory } from './commands/command.factory';
import { CommandName, CommandResult, ICommand } from './commands/command.interface';

@Injectable()
export class BotService {
  constructor(
    private commandFactory: CommandFactory,
    private telegramService: TelegramService
  ) {}

  public async handleUpdate(update: Update) {
    let response: CommandResult | undefined;
    if (update.message) {
      response = await this.handleMessage(update.message);
    } else if (update.callback_query) {
      response = await this.handleCallbackQuery(update.callback_query);
    }

    if (response) {
      await this.telegramService.sendMessage(response.message);
    }
  }

  private async handleMessage(message: Message): Promise<CommandResult | undefined> {
    // If we have many entities, we need to find the one that is a command
    // and process it
    const entity = message.entities?.find((entity) => entity.type === 'bot_command');
    if (!entity) {
      return undefined;
    }
    const command = await this.createCommand(
      message.text.slice(entity.offset + 1, entity.offset + entity.length)
    );
    return command?.execute({
      userId: message.from?.id,
      chatId: message.chat.id,
    });
  }

  private async handleCallbackQuery(callbackQuery: CallbackQuery): Promise<CommandResult | undefined> {
    if (!callbackQuery.data || !callbackQuery.message) {
      return undefined;
    }
    const command = await this.createCommand(callbackQuery.data);
    return command?.execute({
      userId: callbackQuery.from.id,
      chatId: callbackQuery.message.chat.id,
    });
  }

  private createCommand(commandName: string): Promise<ICommand | undefined> {
    return this.commandFactory.createCommand(commandName as CommandName);
  }
}
