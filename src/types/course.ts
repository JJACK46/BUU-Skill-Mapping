import { Curriculum } from './curriculum';
import { Subject } from './subject';
import { Teacher } from './teacher';

export interface Course {
  id?: number;
  name: string;
  engName: string;
  description: string;
  engDescription?: string;
  curriculumId: number;
  curriculum?: Curriculum;
  teacherId: number;
  teacher?: Teacher;
  subjects: Partial<Subject>[];
}
