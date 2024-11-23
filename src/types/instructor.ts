import { Branch } from './branch';
import { Course } from './course';
import { Curriculum } from './curriculum';
import { SocialForm } from './social';
import { User } from './user';

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
