import { Branch } from './branch';

export interface Faculty {
  id: string;
  name: string;
  branches?: Branch[];
}
