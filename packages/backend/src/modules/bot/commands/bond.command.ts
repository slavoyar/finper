import { quotationToNumber } from '@common/utils';
import { InlineKeyboardMarkup } from '@external/telegram/interfaces';
import { PresetDto } from '@finper/shared';
import { BondService } from '@modules/bond/bond.service';
import { PresetService } from '@modules/preset/preset.service';

import { ListBuilder } from '../builders/list.builder';
import { BaseCommand } from './base.command';
import { CommandContext, CommandResult, ICommand } from './command.interface';

export class BondCommand extends BaseCommand implements ICommand {
  constructor(
    private readonly presetService: PresetService,
    private readonly bondService: BondService
  ) {
    super();
  }

  public override async execute(context: CommandContext): Promise<CommandResult> {
    const keyboard = await this.constructInlineKeyboardMarkup();

    console.log(JSON.stringify(keyboard));
    const text = await this.constructText(!!keyboard);

    return {
      message: {
        chat_id: context.chatId,
        text,
        reply_markup: keyboard,
      },
    };
  }

  private async constructInlineKeyboardMarkup(): Promise<InlineKeyboardMarkup | undefined> {
    const presetType: PresetDto['type'] = 'bond';
    const presets = await this.presetService.getPresets(presetType);
    if (!presets.length) {
      return undefined;
    }
    presets.forEach((preset, index) => {
      if (index % 3 === 0) {
        this.keyboardBuilder.addRow();
      }
      this.keyboardBuilder.addColumn({
        text: preset.name as string,
        callback_data: `preset:${preset.id}`,
      });
    });

    return {
      inline_keyboard: this.keyboardBuilder.construct(),
    };
  }

  private async constructText(hasPreset: boolean): Promise<string> {
    if (hasPreset) {
      return 'Выберите пресет';
    }
    const bonds = await this.bondService.getFilteredBonds({
      riskLevels: [1],
      count: 10,
    });

    const listBuilder = new ListBuilder(
      'Список облигаций',
      bonds,
      (bond) => `${bond.name} - ${quotationToNumber(bond.lastPrice?.price)}`
    );

    const text =
      'Отображаются первые 10 облигаций с минимальным риском и максимальной доходностью.\n\n Можно сконфигурировать свои фильтры в приложении';

    return `${text}\n\n${listBuilder.build()}`;
  }
}
