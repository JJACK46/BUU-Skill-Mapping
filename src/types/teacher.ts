import { Branch } from './branch';
import { Course } from './course';
import { Curriculum } from './curriculum';

export interface Teacher {
  id: number;

  name: string;

  engName: string;

  tel: string;

  picture: string;

  position: string;

  email: string;

  officeRoom: string;

  specialists: string;

  socials: string;

  bio: string;

  branch?: Branch;

  curriculums?: Curriculum[];

  courses?: Course[];
}
