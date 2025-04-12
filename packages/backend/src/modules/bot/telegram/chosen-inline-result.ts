import { User } from './user';

export interface ChosenInlineResult {
  result_id: string;
  from: User;
  inline_message_id?: string;
  query: string;
}
