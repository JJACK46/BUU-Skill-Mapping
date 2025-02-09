// import type { Curriculum } from './curriculum';
import type { Clo } from './clo';
import type { Subject } from './subject';
import type { SubjectType } from './subjectType.enum';

export type CourseSpec = {
  // id?: number; //autopgenerate
  thaiName: string;
  engName: string;
  engDescription: string;
  thaiDescription: string;
  type: SubjectType;
  credit: string;
  subjectCode: string;
  curriculumId: number;
  subject?: Subject[];
  clos: Clo[];
  // curriculum: Curriculum;
};
