import { Skill } from './skill';
import { Subject } from './subject';

export interface SkillCollection {
  id?: number;
  subject: Partial<Subject>;
  skill: Partial<Skill>;
  expectedLevel: number; //max 6
  gainLevel: number; //gain level
  passed: boolean | null;
}
// export enum SkillLevel {
//   Cognitive1 = '1 - Remember',
//   Cognitive2 = '2 - Understand',
//   Cognitive3 = '3 - Apply',
//   Cognitive4 = '4 - Analyze',
//   Cognitive5 = '5 - Evaluate',
//   Cognitive6 = '6 - Create',
//   Psychomotor1 = '1 - Imitation',
//   Psychomotor2 = '2 - Manipulation',
//   Psychomotor3 = '3 - Precision',
//   Psychomotor4 = '4 - Articulation',
//   Psychomotor5 = '5 - Naturalization',
//   Ethics1 = '1 - Basic',
//   Ethics2 = '2 - Intermediate',
//   Ethics3 = '3 - Advance',
//   Affective1 = '1 - Underperformed',
//   Affective2 = '2 - Common',
//   Affective3 = '3 - Uncommon',
// }
