import type { Branch } from './branch';
import type { Course } from './course';
import type { Curriculum } from './curriculum';
import type { SocialForm } from './social';
import type { User } from './user';

export interface Instructor {
  id?: number;
  name: string;
  engName: string;
  tel: string;
  picture: string;
  email: string;
  officeRoom: string;
  specialists: string[];
  socials: Partial<SocialForm> | null;
  bio: string;
  position: string;
  branch: Partial<Branch> | null;
  courses?: Course[];
  curriculums: Partial<Curriculum>[] | null;
  user?: User;
}
