import type { Branch } from './branch';
import type { Subject } from './subject';
import type { Instructor } from './instructor';
import type { Plo } from './plo';
import type { Skill } from './skill';
import type { CourseSpec } from './course-spec';
export interface Curriculum {
  id: string;
  name: string;
  engName: string;
  degree: string;
  engDegree: string;
  description: string;
  period: number;
  minimumGrade: number;
  coordinators: Instructor[];
  plos?: Plo[];
  subjects: Subject[];
  courseSpecs?: CourseSpec[];
  branch: Branch;
  skills?: Skill[];
}
