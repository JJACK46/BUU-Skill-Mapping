import type { Plo } from './plo';
import type { Skill } from './skill';

export type Clo = {
  id?: number;
  name: string;
  thaiDescription: string;
  engDescription: string;
  plo?: Plo;
  skill?: Skill;
  expectedLevel: 1 | 2 | 3 | 4 | 5;
  // courseSpec: CourseSpec; prevent circular dependency
  // skillexpectedlevels: SkillExpectedLevel[]; ถ้า skill สามารถยืมจากคณะอื่่นได้ จำเป็นที่จะต้องกำหนด ตัวกลาง ระหว่าง skill กับ curriculumn เหมือน coursespec
};
