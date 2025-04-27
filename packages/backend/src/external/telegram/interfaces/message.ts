import { Chat } from './chat';
import { User } from './user';

export type BotMessageType =
  | 'mention'
  | 'hashtag'
  | 'cashtag'
  | 'bot_command'
  | 'url'
  | 'email'
  | 'phone_number'
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'code'
  | 'pre'
  | 'text_link'
  | 'text_mention'
  | 'custom_emoji';

export interface MessageEntity {
  type: BotMessageType;
  offset: number;
  length: number;
  url?: string;
  user?: User;
  language?: string;
}

export interface Message {
  message_id: number;
  message_thread_id?: number;
  from?: User;
  date: number;
  chat: Chat;
  text: string;
  entities?: MessageEntity[];
}
