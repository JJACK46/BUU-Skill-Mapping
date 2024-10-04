import { Curriculum } from './curriculum';
import { Student } from './student';
import { Subject } from './subject';
import { Teacher } from './teacher';

export interface Course {
  id?: number;
  subject: Subject;
  curriculumId: number;
  curriculum?: Curriculum;
  teacherId: number;
  teacher?: Teacher;
  students: Student[];
}
