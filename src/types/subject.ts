import { SkillExpectedLevel } from './skill-exp-lvl';

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

export enum SubjectType {
  Compulsory = 'Compulsory',
  Core = 'Core',
  General = 'General',
  Elective = 'Elective',
  FreeElective = 'Free Elective',
  CWIE = 'CWIE',
}
