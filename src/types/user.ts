import { UserRole } from 'src/enums/roles';
import { Student } from './student';
import { Instructor } from './instructor';

export interface User {
  id: string;
  email: string;
  password?: string;
  role: UserRole;
  teacher?: Instructor;
  student?: Student;
}
