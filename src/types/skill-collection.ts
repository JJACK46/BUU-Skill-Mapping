import { Skill } from './skill';
import { Subject } from './subject';

export interface SkillCollection {
  id?: number;
  subject: Partial<Subject>;
  skill: Partial<Skill>;
  level: SkillLevel;
  passed: boolean | null;
}
export enum SkillLevel {
  Psychomotor1 = '1 - Remember',
  Psychomotor2 = '2 - Understand',
  Psychomotor3 = '3 - Apply',
  Psychomotor4 = '4 - Analyze',
  Psychomotor5 = '5 - Evaluate',
  Psychomotor6 = '6 - Create',
  Ability1 = '1 - Imitation',
  Ability2 = '2 - Manipulation',
  Ability3 = '3 - Precision',
  Ability4 = '4 - Articulation',
  Ability5 = '5 - Naturalization',
  Ethics1 = '1 - Basic',
  Ethics2 = '2 - Intermediate',
  Ethics3 = '3 - Advance',
  PersonalAttributes1 = '1 - Underperformed',
  PersonalAttributes2 = '2 - Common',
  PersonalAttributes3 = '3 - Uncommon',
}
