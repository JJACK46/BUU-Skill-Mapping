import type { Clo } from './clo';
export interface PLO {
  id?: number;
  name: string;
  thaiDescription: string;
  engDescription: string;
  type: string;
  curriculumId: number;
  clos?: Clo[];
}
