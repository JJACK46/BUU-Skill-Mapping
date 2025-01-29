import type { Clo } from './clo';
import type { Subject } from './subject';

export type CourseSpec = {
  id: string;
  name: string;
  description: string;
  clos: Clo[];
  subject: Subject;
};
