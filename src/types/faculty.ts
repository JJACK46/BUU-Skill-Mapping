import type { Branch } from './branch';

export interface Faculty {
  id: number;
  name: string;
  engName: string;
  abbrev: string;
  description: string;
  branches: Branch[];
}
