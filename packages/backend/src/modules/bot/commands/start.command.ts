import { InlineKeyboardMarkup } from '../telegram';
import { BaseCommand } from './base.command';
import { CommandContext, CommandResult, ICommand } from './command.interface';

export class StartCommand extends BaseCommand implements ICommand {
  public override execute(context: CommandContext): Promise<CommandResult> {
    return Promise.resolve({
      message: {
        chat_id: context.chatId,
        text: `Привет!\nЯ бот, который поможет тебе управлять инвестициями.\nВыбери команду из меню ниже и начни работу`,
        reply_markup: this.constructInlineKeyboardMarkup(),
      },
    });
  }

  private constructInlineKeyboardMarkup(): InlineKeyboardMarkup {
    return {
      inline_keyboard: this.keyboardBuilder
        .addRow()
        .addColumn({ text: 'Help', callback_data: 'help' })
        .addColumn({ text: 'Меню', callback_data: 'menu' })
        .construct(),
    };
  }
}
