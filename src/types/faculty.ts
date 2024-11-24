import { Branch } from './branch';

export interface Faculty {
  id: string;
  name: string;
  engName: string
  abbrev: string;
  description: string;
  branches?: Branch[];
}
