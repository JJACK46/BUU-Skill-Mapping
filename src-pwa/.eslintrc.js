import { resolve } from 'path';

export const parserOptions = {
  project: resolve(__dirname, './tsconfig.json'),
};
export const overrides = [
  {
    files: ['custom-service-worker.ts'],
    env: {
      serviceworker: true,
    },
  },
];
