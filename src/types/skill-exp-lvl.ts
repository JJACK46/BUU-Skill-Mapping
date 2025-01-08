import type { Skill } from './skill';
import type { SkillCollection } from './skill-collection';
import type { Subject } from './subject';

export interface SkillExpectedLevel {
  id?: number;
  expectedLevel: 1 | 2 | 3 | 4 | 5;
  subject: Partial<Subject>;
  skill: Partial<Skill>;
  skillCollection: SkillCollection[];
}
