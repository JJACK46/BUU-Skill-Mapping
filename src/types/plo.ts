import type { Clo } from './clo';
import type { Curriculum } from './curriculum';

export type Plo = {
  id: number;
  name: string;
  thaiDescription: string;
  engDescription: string;
  type: string;
  curriculum?: Curriculum;
  curriculumId: number;
  clos?: Clo[]; // CLOs
};
