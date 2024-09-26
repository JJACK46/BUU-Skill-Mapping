export interface Subject {
  id?: number;
  name: string;
  engName: string;
  description: string;
  engDescription: string;
  credit: CourseCredit;
  type: SubjectType;
}

export enum SubjectType {
  Compulsory = 'Compulsory',
  Core = 'Core',
  General = 'General',
  Elective = 'Elective',
  FreeElective = 'Free Elective',
  CWIE = 'CWIE',
}
export enum CourseCredit {
  Two = '2 (1-2-3)',
  Three = '3 (2-2-5)',
  Four = '4 (0-12-6)',
  Six = '6 (0-18-9)',
}
