import { MessageEntity } from './message';

export interface KeyboardButton {
  text: string;
  request_contact?: boolean;
  request_location?: boolean;
}

export interface ReplyKeyboardMarkup {
  keyboard: KeyboardButton[];
  is_persistent?: boolean;
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
  selective?: boolean;
}

export interface MessageResponse {
  chat_id: number | string;
  text: string;
  parse_mode?: string;
  entities?: MessageEntity[];
  reply_markup?: ReplyKeyboardMarkup;
}
