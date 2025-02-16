import type { Branch } from './branch';

export interface Faculty {
  id: number;
  thaiName: string;
  engName: string;
  abbrev: string;
  thaiDescription: string;
  engDescription: string;
  branch: Branch[];
}
