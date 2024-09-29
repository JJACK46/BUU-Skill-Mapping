import { Role } from './role';

export interface Payload {
  id: string;
  email: string;
  roles: Role[];
  avatarUrl: string;
}
