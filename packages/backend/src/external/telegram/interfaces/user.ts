export interface User {
  id: number;
  is_bot?: boolean;
  is_premium?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  allows_write_to_pm?: boolean;
  photo_url?: string;
}
