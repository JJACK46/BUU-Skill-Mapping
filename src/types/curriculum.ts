import type { Branch } from './branch';
import type { Subject } from './subject';
import type { Plo } from './plo';
import type { Skill } from './skill';
import type { CourseSpec } from './course-spec';
import type { Coordinator } from './coordinator';
export interface Curriculum {
  id: string;
  curriculumId: string;
  name: string;
  engName: string;
  degree: string;
  engDegree: string;
  description: string;
  period: number;
  minimumGrade: number;
  coordinators: Coordinator[];
  plos?: Plo[];
  subjects: Subject[];
  courseSpecs?: CourseSpec[];
  branch: Branch;
  skills?: Skill[];
}
