import type { Curriculum } from './curriculum';
import type { SkillExpectedLevel } from './skill-exp-lvl';
import type { SubjectType } from './subjectType.enum';

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
