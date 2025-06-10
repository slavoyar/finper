import { BondService } from '@modules/bond/bond.service';
import { PresetService } from '@modules/preset/preset.service';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { BondCommand } from './bond.command';
import { CommandName, ICommand } from './command.interface';
import { HelpCommand } from './help.command';
import { PresetCommand } from './preset.command';
import { StartCommand } from './start.command';

@Injectable()
export class CommandFactory {
  constructor(private readonly moduleRef: ModuleRef) {}

  public async createCommand(name: CommandName): Promise<ICommand | undefined> {
    const presetService = await this.moduleRef.resolve(PresetService);
    const bondService = await this.moduleRef.resolve(BondService);
    switch (name) {
      case 'start':
        return new StartCommand();
      case 'help':
        return new HelpCommand();
      case 'bonds': {
        return new BondCommand(presetService, bondService);
      }
      case 'preset': {
        return new PresetCommand(presetService, bondService);
      }
      default:
        return Promise.resolve(undefined);
    }
  }
}
