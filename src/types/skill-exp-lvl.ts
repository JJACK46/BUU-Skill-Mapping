
import { Skill } from './skill';
import { SkillCollection } from './skill-collection';
import { Subject } from './subject';

export interface SkillExpectedLevel {
    id?: number
    expectedLevel: 1 | 2 | 3 | 4 | 5;
    subject: Partial<Subject>;
    skill: Partial<Skill>
    skillCollection: SkillCollection[]
}