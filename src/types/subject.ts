import type { SkillExpectedLevel } from './skill-exp-lvl';
import type { SubjectType } from './subjectType.enum';

export interface Subject {
  id?: number;
  name: string;
  engName: string;
  description: string;
  credit: string;
  type: SubjectType;
  skillExpectedLevels?: Partial<SkillExpectedLevel>[];
  // clos:Clo[]
  // courses:Course[]
}
