import { Branch } from './branch';
import { CourseEnrollment } from './course';
import { SkillCollection } from './skill-collection';
import { SocialForm } from './social';

export interface Student {
  id?: number;
  name: string;
  engName: string;
  dateEnrollment: Date | string;
  courseEnrollment: Partial<CourseEnrollment>[];
  skillCollection: SkillCollection[];
  socials: Partial<SocialForm> | null;
  branch: Partial<Branch> | null;
}
