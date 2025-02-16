import type { Branch } from './branch';
import type { Subject } from './subject';
import type { PLO } from './plo';
import type { Skill } from './skill';
import type { CourseSpec } from './course-spec';
import type { Coordinator } from './coordinator';
export interface Curriculum {
  id?: number;
  code: string;
  thaiName: string;
  engName: string;
  thaiDegree: string;
  engDegree: string;
  thaiDescription: string;
  engDescription: string;
  period: number;
  minimumGrade: string; //decimal point for DTO
  coordinators: Coordinator[];
  plos?: PLO[];
  subjects: Subject[];
  courseSpecs?: CourseSpec[];
  branch: Branch;
  skills?: Skill[];
}
