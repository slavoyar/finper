import { KeyboardBuilder } from '../builders/keyboard.builder';
import { CommandContext, CommandResult, ICommand } from './command.interface';

export abstract class BaseCommand implements ICommand {
  protected keyboardBuilder = new KeyboardBuilder();

  public execute(context: CommandContext): Promise<CommandResult> {
    return Promise.resolve({
      message: {
        chat_id: context.chatId,
        text: 'Command not implemented',
      },
      state: 'MAIN',
    });
  }
}
