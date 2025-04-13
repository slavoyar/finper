import { BondService } from '@modules/bond/bond.service';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { BondCommand } from './bond.command';
import { CommandName, ICommand } from './command.interface';
import { HelpCommand } from './help.command';
import { StartCommand } from './start.command';

@Injectable()
export class CommandFactory {
  constructor(private readonly moduleRef: ModuleRef) {}

  public async createCommand(name: CommandName): Promise<ICommand | undefined> {
    switch (name) {
      case 'start':
        return new StartCommand();
      case 'help':
        return new HelpCommand();
      case 'bonds': {
        const bondService = await this.moduleRef.resolve(BondService);
        return new BondCommand(bondService);
      }
      default:
        return Promise.resolve(undefined);
    }
  }
}
