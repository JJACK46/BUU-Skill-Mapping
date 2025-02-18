import type { Branch } from './branch';
import type { Lesson } from './lesson';
import type { PLO } from './plo';
import type { Skill } from './skill';
import type { Subject } from './subject';
import type { Coordinator } from './coordinator';
export interface Curriculum {
  id?: number;
  code: string;
  branchId: number;
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
  subjects: Lesson[];
  courseSpecs?: Subject[];
  branch: Branch;
  skills?: Skill[];
}
