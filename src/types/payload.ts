import type { UserRole } from 'src/enums/roles';

export interface Payload {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
}
