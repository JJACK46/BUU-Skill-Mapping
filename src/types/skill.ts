import { SkillDomain } from './skill_mapping';

export interface Skill {
  id?: number;
  name: string;
  description: string;
  domain: SkillDomain;
  type: SkillType;
  children?: Skill[];
}

export enum SkillType {
  Specific = 'Specific',
  Generic = 'Generic',
}
