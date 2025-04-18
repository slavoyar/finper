import { BondService } from '@modules/bond/bond.service';

import { ListBuilder } from '../builders/list.builder';
import { InlineKeyboardMarkup } from '../telegram';
import { BaseCommand } from './base.command';
import { CommandContext, CommandResult, ICommand } from './command.interface';

export class BondCommand extends BaseCommand implements ICommand {
  constructor(private readonly bondService: BondService) {
    super();
  }

  public override async execute(context: CommandContext): Promise<CommandResult> {
    const listBuilder = new ListBuilder<{ name: string; description: string }>(
      'Список облигаций',
      [],
      (bond) => {
        return `${bond.name}\n\n${bond.description}`;
      }
    );
    return Promise.resolve({
      message: {
        chat_id: context.chatId,
        text:
          'Нет доступных пресетов.\n Их можно создать в приложении.\n\nПо умолчанию будет показан список облигаций cо следующими параметрами:\n сортировка - по доходности\n фильтры - рейтинг (3)\n\n' +
          listBuilder.build(),
      },
    });
  }

  private constructInlineKeyboardMarkup(
    presets: {
      name: string;
      id: number;
    }[]
  ): InlineKeyboardMarkup | undefined {
    presets.forEach((preset, index) => {
      if (index % 3 === 0) {
        this.keyboardBuilder.addRow();
      }
      this.keyboardBuilder.addColumn({ text: preset.name, callback_data: preset.id.toString() });
    });

    return {
      inline_keyboard: this.keyboardBuilder.construct(),
    };
  }
}
