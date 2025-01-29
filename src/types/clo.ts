import type { Skill } from './skill';

export type Clo = {
  id: number;
  name: string;
  description: string;
  expectedLevel: 1 | 2 | 3 | 4 | 5;
  skill?: Partial<Skill>;
};
