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
  teacher: Partial<Teacher>;
  score: Score;
  courseEnrollments: CourseEnrollment[];
}
export interface CourseEnrollment {
  id?: number;
  gainScore: Score;
  student: Partial<Student>;
  skillCollection: SkillCollection[];
}

interface Score {
  project: number;
  examMid: number;
  examFinal: number;
  assignment: number;
}
