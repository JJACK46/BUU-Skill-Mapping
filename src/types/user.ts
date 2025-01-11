import type { EnumUserRole } from 'src/enums/roles';
import type { Student } from './student';
import type { Instructor } from './instructor';

export interface User {
  id: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  password?: string;
  gender: string;
  googleId: string;
  phone: string;
  role: EnumUserRole;
  teacher?: Instructor;
  student?: Student;
}
