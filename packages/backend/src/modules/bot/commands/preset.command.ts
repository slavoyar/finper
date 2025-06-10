import { quotationToNumber } from '@common/utils';
import { PresetDto } from '@finper/shared';
import { BondService } from '@modules/bond/bond.service';
import { PresetService } from '@modules/preset/preset.service';

import { ListBuilder } from '../builders/list.builder';
import { BaseCommand } from './base.command';
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

    const listBuilder = new ListBuilder(
      'Список облигаций',
      bonds,
      (bond) => `${bond.name} - ${quotationToNumber(bond.lastPrice?.price)}`
    );

    return Promise.resolve({
      message: {
        chat_id: context.chatId,
        text: listBuilder.build(),
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
