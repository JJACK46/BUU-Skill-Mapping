import type { SubjectType } from 'src/data/subject_type';
import type { Curriculum } from './curriculum';
import type { SkillExpectedLevel } from './skill-exp-lvl';

export interface Subject {
  id?: number;
  name: string;
  engName: string;
  description: string;
  credit: string;
  type: SubjectType;
  curriculum?: Curriculum;
  skillExpectedLevels?: Partial<SkillExpectedLevel>[];
}
