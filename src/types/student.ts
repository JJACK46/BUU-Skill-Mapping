import { SkillMapping } from './skill_mapping';

export interface Student {
  id?: number;
  name: string;
  engName: string;
  gpa: number;
  phone: string;
  startDate: Date;
  skillCollection: SkillCollection[];
}

export interface SkillCollection {
  id?: number;
  skillMapping: SkillMapping;
  acquiredLevel: number;
  pass: boolean;
}
