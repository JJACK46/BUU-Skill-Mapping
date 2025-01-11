import type { EnumUserRole } from 'src/enums/roles';

export interface Payload {
  id: string;
  name: string;
  email: string;
  role: EnumUserRole;
  avatarUrl: string;
}
