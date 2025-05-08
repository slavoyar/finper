import { InlineKeyboardMarkup } from '@external/telegram/interfaces';

import { BaseCommand } from './base.command';
import { CommandContext, CommandResult, ICommand } from './command.interface';

export class HelpCommand extends BaseCommand implements ICommand {
  public override execute(context: CommandContext): Promise<CommandResult> {
    return Promise.resolve({
      message: {
        chat_id: context.chatId,
        text: `Вот список доступных команд:\n/help - Помощь\n/menu - Меню`,
        reply_markup: this.constructInlineKeyboardMarkup(),
      },
    });
  }

  private constructInlineKeyboardMarkup(): InlineKeyboardMarkup {
    return {
      inline_keyboard: this.keyboardBuilder
        .addRow()
        .addColumn({ text: 'Меню', callback_data: 'menu' })
        .construct(),
    };
  }
}
