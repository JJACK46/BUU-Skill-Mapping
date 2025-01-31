import type { Curriculum } from './curriculum';
import type { LearningDomain } from './learning-domain.enum';

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
