import type { Skill } from './skill';
import type { SkillCollection } from './skill-collection';
import type { Lesson } from './subject';

export interface SkillExpectedLevel {
  id?: number;
  expectedLevel: 1 | 2 | 3 | 4 | 5;
  subject: Partial<Lesson>;
  skill: Partial<Skill>;
  skillCollection: SkillCollection[];
}
