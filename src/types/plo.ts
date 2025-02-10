import type { Clo } from './clo';

export type Plo = {
  id: number;
  name: string;
  thaiDescription: string;
  engDescription: string;
  type: string | null;
  clos?: Clo[]; // CLOs
};
