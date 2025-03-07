import type { LearningDomain } from 'src/data/learning_domain';
import type { Curriculum } from './curriculum';

export type Skill = {
  id: number;
  thaiName: string;
  engName: string;
  thaiDescription: string;
  engDescription: string;
  domain: LearningDomain;
  parentId?: number;
  parent?: Skill;
  subs?: Skill[];
  curriculum?: Curriculum;
  curriculumId: number;
};
