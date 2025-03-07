import type { Instructor } from './instructor';
import type { Subject } from './subject';

export type Course = {
  id: number;
  active: boolean;
  subject: Partial<Subject>;
  instructors?: Partial<Instructor>[];
  semester: 'first' | 'second' | 'summer';
  year: number;
};
// export interface CourseEnrollment {
//   id?: string;
//   course: Partial<Course>;
//   student: Partial<Student>;
//   skillCollections: SkillCollection[];
// }
