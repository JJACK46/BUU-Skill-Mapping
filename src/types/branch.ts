import { Curriculum } from './curriculum';
import { Faculty } from './faculty';

export interface Branch {
  id?: number;
  name: string;
  engName: string
  faculty: Partial<Faculty>
  abbreviation: string
  curriculums?: Curriculum[];
}
