import type { LearningDomain } from 'src/data/learning_domain';
import type { Curriculum } from './curriculum';

export type Skill = {
  id: number;
  name: string;
  description: string;
  domain: LearningDomain;
  parent?: Skill[];
  children?: Skill[];
  techSkills?: Skill[];
  curriculum?: Curriculum;
};
