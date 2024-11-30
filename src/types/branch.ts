import { Curriculum } from './curriculum';
import { Faculty } from './faculty';

export interface Branch {
  id?: string;
  name: string;
  engName: string
  faculty: Partial<Faculty>
  abbrev: string
  description: string
  curriculums?: Curriculum[];
}
