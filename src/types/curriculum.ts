import { Branch } from './branch';
import { Subject } from './subject';
import { Instructor } from './instructor';
export interface Curriculum {
  id: string;
  name: string;
  engName: string;
  degreeName: string;
  engDegreeName: string;
  description: string;
  period: number;
  minimumGrade: number;
  coordinators: Instructor[];
  // plos: any[];
  subjects?: Subject[];
  branch: Branch;
}
