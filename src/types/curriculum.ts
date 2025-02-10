import type { Branch } from './branch';
import type { Subject } from './subject';
import type { Plo } from './plo';
import type { Skill } from './skill';
import type { CourseSpec } from './course-spec';
import type { Coordinator } from './coordinator';
export interface Curriculum {
  id: number;
  code: string;
  thaiName: string;
  engName: string;
  thaiDegree: string;
  engDegree: string;
  thaiDescription: string;
  period: number;
  minimumGrade: number;
  coordinators: Coordinator[];
  plos?: Plo[];
  subjects: Subject[];
  courseSpecs?: CourseSpec[];
  branch: Branch;
  skills?: Skill[];
}
