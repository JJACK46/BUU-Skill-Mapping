import type { Skill } from './skill';
import type { Course } from './course';

export interface SkillCollection {
  id?: number;
  course?: Partial<Course>;
  courseId: number;
  studentId: number;
  skillId: number;
  skill?: Partial<Skill>;
  gained: number;
  expected?: number;
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
