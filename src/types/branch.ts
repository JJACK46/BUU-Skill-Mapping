import { Curriculum } from './curriculum';

export interface Branch {
  id?: string;
  name: string;
  curriculums?: Curriculum[];
}
