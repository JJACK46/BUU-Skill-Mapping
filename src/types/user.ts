import { Role } from './role';
import { Student } from './student';
import { Teacher } from './teacher';

export interface User {
  id: number;
  email: string;
  password?: string;
  role: Role;
  teacher?: Teacher;
  student?: Student;
}
