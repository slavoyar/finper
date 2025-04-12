import { CallbackQuery } from './callback-query';
import { ChosenInlineResult } from './chosen-inline-result';
import { InlineQuery } from './inline-query';
import { Message } from './message';

export interface Update {
  update_id: number;
  message?: Message;
  edited_message?: Message;
  inline_query?: InlineQuery;
  chosen_inline_result?: ChosenInlineResult;
  callback_query?: CallbackQuery;
}
