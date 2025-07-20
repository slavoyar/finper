import { PresetDto } from '@finper/shared';
import { BondService } from '@modules/bond/bond.service';
import { PresetService } from '@modules/preset/preset.service';

import { BaseCommand } from './base.command';
import { getBondList } from './bond-utils';
import { CommandContext, CommandResult, ICommand } from './command.interface';

export class PresetCommand extends BaseCommand implements ICommand {
  constructor(
    private readonly presetService: PresetService,
    private readonly bondService: BondService
  ) {
    super();
  }

  public override async execute(context: CommandContext): Promise<CommandResult> {
    const preset = await this.getPreset(context);

    if (typeof (preset as PresetDto).id !== 'string') {
      return preset as CommandResult;
    }

    const bonds = await this.bondService.getFilteredBonds(preset as PresetDto);

    return Promise.resolve({
      message: {
        chat_id: context.chatId,
        text: getBondList(bonds),
        parse_mode: 'MarkdownV2',
        link_preview_options: {
          is_disabled: true,
        },
      },
    });
  }

  private async getPreset(context: CommandContext): Promise<PresetDto | CommandResult> {
    const presetId = context.data?.split(':')[1];

    const errorMessage = {
      message: {
        chat_id: context.chatId,
        text: 'Данный пресет сломан, попробуйте другой',
      },
    };

    if (!presetId) {
      return errorMessage;
    }

    const preset = await this.presetService.getPreset(presetId);

    if (!preset) {
      return errorMessage;
    }

    return preset as PresetDto;
  }
}
