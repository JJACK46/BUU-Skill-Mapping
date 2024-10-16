import { Curriculum } from './curriculum';

export interface Branch {
  id?: number;
  name: string;
  curriculums?: Curriculum[];
}
