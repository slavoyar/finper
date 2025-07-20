import { User } from './user';

export interface InlineQuery {
  id: string;
  from: User;
  query: string;
  offset: string;
}
