import { escapeMarkdownV2 } from '@common/utils';
import { InlineKeyboardMarkup } from '@external/telegram/interfaces';
import { PresetDto } from '@finper/shared';
import { BondService } from '@modules/bond/bond.service';
import { PresetService } from '@modules/preset/preset.service';

import { BaseCommand } from './base.command';
import { getBondList } from './bond-utils';
import { CommandContext, CommandResult, ICommand } from './command.interface';

export class BondCommand extends BaseCommand implements ICommand {
  constructor(
    private readonly presetService: PresetService,
    private readonly bondService: BondService
  ) {
    super();
  }

  public override async execute(context: CommandContext): Promise<CommandResult> {
    const keyboard = await this.constructInlineKeyboardMarkup(context.userId);

    const text = await this.constructText(!!keyboard);

    return {
      message: {
        chat_id: context.chatId,
        text,
        reply_markup: keyboard,
        parse_mode: 'MarkdownV2',
        link_preview_options: {
          is_disabled: true,
        },
      },
    };
  }

  private async constructInlineKeyboardMarkup(userId?: number): Promise<InlineKeyboardMarkup | undefined> {
    if (!userId) {
      return undefined;
    }
    const presetType: PresetDto['type'] = 'bond';
    const presets = await this.presetService.getPresets(presetType, userId);
    if (!presets.length) {
      return undefined;
    }
    presets.forEach((preset, index) => {
      if (index % 3 === 0) {
        this.keyboardBuilder.addRow();
      }
      this.keyboardBuilder.addColumn({
        text: preset.name,
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

    const text = escapeMarkdownV2(
      'Отображаются первые 10 облигаций с минимальным риском и максимальной доходностью.\n\nМожно настроить свои фильтры в приложении \\(пресеты\\)'
    );

    return `${text}\n\n${getBondList(bonds)}`.trim();
  }
}
