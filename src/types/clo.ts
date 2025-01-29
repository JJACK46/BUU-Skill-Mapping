import type { CourseSpec } from './course-spec';
import type { Plo } from './plo';
import type { Skill } from './skill';

export type Clo = {
  id: number;
  name: string;
  description: string;
  expectedLevel: 1 | 2 | 3 | 4 | 5;
  courseSpec: CourseSpec;
  plo?: Plo;
  skill?: Skill;
  // skillexpectedlevels: SkillExpectedLevel[]; ถ้า skill สามารถยืมจากคณะอื่่นได้ จำเป็นที่จะต้องกำหนด ตัวกลาง ระหว่าง skill กับ curriculumn เหมือน coursespec
};
