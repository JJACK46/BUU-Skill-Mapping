import { SkillCollection } from './skill-collection';

export interface Student {
  id?: number;
  name: string;
  engName: string;
  dateEnrollment: Date;
  skillCollection: SkillCollection[];
}
