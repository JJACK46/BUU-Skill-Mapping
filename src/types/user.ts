import { Role } from './role';
import { Student } from './student';
import { Teacher } from './teacher';

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
  role: Role;
  teacher?: Teacher;
  student?: Student;
}
