import { Message } from './message';
import { User } from './user';

export interface CallbackQuery {
  id: string;

  from: User;

  message?: Message;

  /**
   * Optional. Data associated with the callback button.
   * Be aware that a bad client can send arbitrary data in this field.
   */
  data?: string;

  inline_message_id?: string;
}
