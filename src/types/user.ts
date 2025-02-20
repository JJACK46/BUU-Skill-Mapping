import type { EnumUserRole } from 'src/data/roles';
import type { Student } from './student';
import type { Instructor } from './instructor';

export interface User {
  id: string;
  email: string;
  password?: string;
  googleId?: string;
  avatarUrl: string;
  role: EnumUserRole;
  instructorId?: number;
  instructor?: Instructor;
  studentId?: number;
  student?: Student;
}
