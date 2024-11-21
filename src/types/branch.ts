import { Curriculum } from './curriculum';
import { Faculty } from './faculty';

export interface Branch {
  id?: string;
  name: string;
  engName: string
  faculty: Partial<Faculty>
  abbreviation: string
  curriculums?: Curriculum[];
}
