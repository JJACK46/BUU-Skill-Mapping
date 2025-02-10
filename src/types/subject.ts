import type { EnumSubjectType } from 'src/data/subject_type';
import type { Curriculum } from './curriculum';
// import type { SkillExpectedLevel } from './skill-exp-lvl';

export interface Subject {
  id?: number;
  code: string;
  thaiName: string;
  engName: string;
  thaiDescription: string;
  engDescription: string;
  credit: string;
  type: EnumSubjectType;
  curriculum?: Curriculum;
  // skillExpectedLevels?: Partial<SkillExpectedLevel>[];
}
