import type { Branch } from './branch';
import type { CourseEnrollment } from './course';
import type { SkillCollection } from './skill-collection';
import type { SocialForm } from './social';

export interface Student {
  id?: number;
  thaiName: string;
  engName: string;
  dateEnrollment: Date | string;
  courseEnrollment: Partial<CourseEnrollment>[];
  skillCollection: SkillCollection[];
  socials?: Partial<SocialForm>;
  branch?: Partial<Branch> | null;
  branchId: number;
  tel: string;
}
