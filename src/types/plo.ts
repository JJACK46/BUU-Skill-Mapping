import type { Clo } from './clo';

export type Plo = {
  id: number;
  name: string;
  description: string;
  clos?: Clo[]; // CLOs
};
