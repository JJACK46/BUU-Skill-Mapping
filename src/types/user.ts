import { UserRole } from 'src/enums/roles';
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
  role: UserRole;
  teacher?: Teacher;
  student?: Student;
}
