import type { Clo } from './clo';

export type Plo = {
  id: string;
  name: string;
  description: string;
  clos: Clo[]; // CLOs
};
