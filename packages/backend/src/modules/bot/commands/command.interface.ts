import { MessageResponse } from '@external/telegram/interfaces';

export interface CommandResult {
  message: MessageResponse;
}

export interface CommandContext {
  userId?: number;
  chatId: number;
}

export interface ICommand {
  execute(context: CommandContext): Promise<CommandResult>;
}

export type CommandName = 'start' | 'help' | 'bonds';
