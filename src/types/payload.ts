import type { User } from './user';

export interface Payload {
  messages: string;
  accessToken: string;
  refreshToken: string;
  statusCode: number;
  user: User;
}
