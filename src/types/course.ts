import type { SkillCollection } from './skill-collection';
import type { Student } from './student';
import type { Lesson } from './lesson';
import type { Instructor } from './instructor';

export interface Course {
  id?: string;
  name: string;
  description: string;
  active: boolean;
  subject: Partial<Lesson> | null;
  // curriculum: Partial<Curriculum> | null;
  teachers: Partial<Instructor>[];
  courseEnrollment: CourseEnrollment[];
}
export interface CourseEnrollment {
  id?: string;
  course: Partial<Course>;
  student: Partial<Student>;
  skillCollections: SkillCollection[];
}
