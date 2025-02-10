import type { LearningDomain } from 'src/data/learning_domain';
import type { Curriculum } from './curriculum';

export type Skill = {
  id: number;
  thaiName: string;
  engName: string;
  thaiDescription: string;
  engDescription: string;
  domain: LearningDomain;
  parent?: Skill;
  children?: Skill[];
  curriculum?: Curriculum;
};
