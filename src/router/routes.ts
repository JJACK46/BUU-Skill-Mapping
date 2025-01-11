import type { RouteRecordRaw } from 'vue-router';
import { publicRoutes } from './publicRoutes';
import { adminRoutes } from './adminRoutes';
import { studentRoutes } from './studentRoutes';
import { instructorRoutes } from './instructorRoutes';
import { coordinatorRoutes } from './coordinatorRouts';

const routes: RouteRecordRaw[] = [
  ...publicRoutes,
  ...adminRoutes,
  ...coordinatorRoutes,
  ...instructorRoutes,
  ...studentRoutes,
  // remove on production
  {
    path: '/debug',
    component: () => import('pages/DebugPage.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
