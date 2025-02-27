import type { Branch } from './branch';
import type { SkillCollection } from './skill-collection';
import type { SocialForm } from './social';

export interface Student {
  id?: number;
  thaiName: string;
  engName: string;
  dateEnrollment: Date | string;
  skillCollection: SkillCollection[];
  socials?: Partial<SocialForm>;
  branch?: Partial<Branch> | null;
  branchId: number;
  tel: string;
}
