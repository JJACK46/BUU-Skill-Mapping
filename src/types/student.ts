import { SkillCollection } from './skill-collection';

export interface Student {
  id?: number;
  name: string;
  engName: string;
  gpa: number;
  phone: string;
  startDate: Date;
  skillCollection: SkillCollection[];
}
