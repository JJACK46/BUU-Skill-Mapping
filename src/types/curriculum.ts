import { Branch } from './branch';
import { Subject } from './subject';
import { Teacher } from './teacher';

export interface Curriculum {
  id?: number;
  name: string;
  engName?: string;
  degree: string;
  engDegree?: string;
  branch: Branch[];
  description: string;
  period: string;
  minimumGrade: number;
  coordinators: Teacher[];
  subjects: Subject[];
}
