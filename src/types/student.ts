import { Branch } from './branch';
import { SkillCollection } from './skill-collection';
import { SocialForm } from './social';

export interface Student {
  id?: number;
  name: string;
  engName: string;
  dateEnrollment: Date | string;
  skillCollection: SkillCollection[];
  socials: Partial<SocialForm> | null;
  branch: Partial<Branch> | null;
}
