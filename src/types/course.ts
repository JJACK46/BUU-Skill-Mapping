import { Curriculum } from './curriculum';
import { SkillCollection } from './skill-collection';
import { Student } from './student';
import { Subject } from './subject';
import { Teacher } from './teacher';

export interface Course {
  id?: number;
  description: string;
  active: boolean;
  subject: Partial<Subject>;
  curriculum: Partial<Curriculum>;
  teachers: Partial<Teacher>[];
  courseEnrollments: CourseEnrollment[];
}
export interface CourseEnrollment {
  id?: number;
  student: Partial<Student>;
  skillCollection: SkillCollection[];
}
