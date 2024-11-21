import { Branch } from './branch';
import { Subject } from './subject';
import { Teacher } from './teacher';
export interface Curriculum {
  id: string;
  thaiName: string;
  engName: string;
  thaiDegreeName: string;
  engDegreeName: string;
  description: string;
  period: number;
  minimumGrade: number;
  coordinators?: Teacher[] | '';
  // plos: any[];
  subjects?: Subject[] | '';
  branch: Branch | '';
}
