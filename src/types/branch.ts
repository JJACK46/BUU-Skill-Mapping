import type { Curriculum } from './curriculum';
import type { Faculty } from './faculty';

export interface Branch {
  id?: number;
  thaiName: string;
  engName: string;
  faculty: Partial<Faculty>;
  abbrev: string;
  description: string;
  curriculums?: Curriculum[];
}
