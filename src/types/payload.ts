import type { EnumUserRole } from 'src/data/roles';

export interface Payload {
  id: string;
  name: string;
  email: string;
  role: EnumUserRole;
  avatarUrl: string;
}
