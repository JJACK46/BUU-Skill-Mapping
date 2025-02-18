import type { Curriculum } from './curriculum';
// import type { SkillExpectedLevel } from './skill-exp-lvl';

export interface Lesson {
  id?: number;
  code: string;
  thaiName: string;
  engName: string;
  curriculum?: Curriculum;
  // skillExpectedLevels?: Partial<SkillExpectedLevel>[];
}
