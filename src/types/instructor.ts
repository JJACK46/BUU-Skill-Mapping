import type { Branch } from './branch';
import type { Course } from './course';
import type { Curriculum } from './curriculum';
import type { SocialForm } from './social';
import type { User } from './user';

export interface Instructor {
  id?: number;
  email: string;
  thaiName: string;
  engName: string;
  code?: string;
  tel?: string;
  picture?: string;
  officeRoom?: string;
  specialists?: string;
  socials?: Partial<SocialForm>;
  bio?: string;
  position?: string;
  branch?: Partial<Branch>;
  branchId: number;
  courses?: Course[];
  curriculums: Partial<Curriculum>[];
  user?: User;
}
