import { Branch } from './branch';
import { Course } from './course';
import { Curriculum } from './curriculum';
import { SocialForm } from './social';
import { User } from './user';

export interface Teacher {
  id?: number;
  name: string;
  engName: string;
  tel: string;
  picture: string;
  user: Partial<User> | null;
  email: string;
  officeRoom: string;
  specialists: string[];
  socials: Partial<SocialForm> | null;
  bio: string;
  position: string;
  branch: Partial<Branch> | null;
  courses?: Course[];
  curriculums: Partial<Curriculum>[] | null;
}
