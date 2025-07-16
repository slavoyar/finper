import { BaseCommand } from './base.command';
import { CommandContext, CommandResult, ICommand } from './command.interface';

export class HelpCommand extends BaseCommand implements ICommand {
  public override execute(context: CommandContext): Promise<CommandResult> {
    const helpText = `
*💼 Финансовый помощник*  
Это приложение предназначено для ведения и анализа личных финансов\\.

В текущей версии доступен *подбор облигаций с фиксированным купоном* и *точный расчёт доходности без учёта реинвестирования*\\.

🔧 В будущем планируется добавить:  
— Анализ инвестиционного портфеля  
— Расширенные инструменты управления активами

*📋 Доступные команды:*  
/start \\- начать работу с ботом  
/help \\- показать справку  
/bonds \\- подбор облигаций:  
\\- при наличии сохранённых пресетов будет предложен выбор  
\\- если пресетов нет — показан список низкорискованных облигаций

*🌐 Мини\\-приложение*  
Используйте встроенный веб\\-интерфейс для настройки фильтров и сохранения пресетов\\.
`;
    return Promise.resolve({
      message: {
        chat_id: context.chatId,
        text: helpText.trim(),
        parse_mode: 'MarkdownV2',
      },
    });
  }
}
