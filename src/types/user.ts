import { UserRole } from 'src/enums/roles';
import { Student } from './student';
import { Teacher } from './teacher';

export interface User {
  id: string;
  email: string;
  password?: string;
  role: UserRole;
  teacher?: Teacher;
  student?: Student;
}
