import { SkillCollection } from './skill-collection';
import { Student } from './student';
import { Subject } from './subject';
import { Instructor } from './instructor';

export interface Course {
  id?: number;
  name: string;
  description: string;
  active: boolean;
  subject: Partial<Subject> | null;
  // curriculum: Partial<Curriculum> | null;
  teachers: Partial<Instructor>[];
  courseEnrollment: CourseEnrollment[];
}
export interface CourseEnrollment {
  id?: number;
  course: Partial<Course>;
  student: Partial<Student>;
  skillCollections: SkillCollection[];
}
