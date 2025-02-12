// import type { Curriculum } from './curriculum';
import type { EnumSubjectType } from 'src/data/subject_type';
import type { Clo } from './clo';
import type { Subject } from './subject';

// export type CourseSpec = {
//   // id?: number; //autopgenerate
//   thaiName: string;
//   engName: string;
//   engDescription: string;
//   thaiDescription: string;
//   type: SubjectType;
//   credit: string;
//   subjectCode: string;
//   curriculumId: number;
//   subject?: Subject[];
//   clos: Clo[];
//   // curriculum: Curriculum;
// };

export interface CourseSpec {
  id: number;
  thaiName: string;
  engName: string;
  engDescription: string;
  thaiDescription: string;
  type: EnumSubjectType;
  credit: string;
  subject: Subject;
  curriculumId?: number;
  clos?: Clo[];
}
