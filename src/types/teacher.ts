import { Branch } from './branch';
import { Curriculum } from './curriculum';
import { User } from './user';

export interface Teacher {
  id: number;
  name: string;
  engName: string;
  tel: string;
  picture: string;
  user: Partial<User> | null;
  email: string;
  officeRoom: string;
  specialists: string[];
  socials: string;
  bio: string;
  position: string;
  branch: Partial<Branch> | null;
  curriculums: Partial<Curriculum>[] | null;
}
