import { Skill } from './skill';

export interface Subject {
  id?: number;
  name: string;
  engName: string;
  description: string;
  credit: string;
  type: SubjectType;
  skills?: Skill[];
}

export enum SubjectType {
  Compulsory = 'Compulsory',
  Core = 'Core',
  General = 'General',
  Elective = 'Elective',
  FreeElective = 'Free Elective',
  CWIE = 'CWIE',
}
