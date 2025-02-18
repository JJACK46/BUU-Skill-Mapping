// import type { Curriculum } from './curriculum';
import type { EnumSubjectType } from 'src/data/subject_type';
import type { Clo } from './clo';
import type { Lesson } from './lesson';
import type { Curriculum } from './curriculum';
export interface Subject {
  id: number;
  code: string;
  thaiName: string;
  engName: string;
  engDescription: string;
  thaiDescription: string;
  type: EnumSubjectType;
  credit: string;
  lesson?: Lesson;
  curriculumId: number;
  curriculums?: Partial<Curriculum>;
  clos?: Clo[];
}
