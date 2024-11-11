import { LearningDomain } from './learning-domain';

export type Skill = {
  id: number;
  name: string;
  description: string;
  domain: LearningDomain;
  parent?: Skill[];
  children: Skill[];
  techSkills: Skill[];
};
