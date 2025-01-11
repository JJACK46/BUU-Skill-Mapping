import { EnumUserRole } from 'src/enums/roles';
import type { RouteRecordRaw } from 'vue-router';

export const coordinatorRoutes: RouteRecordRaw[] = [
  {
    path: `/${EnumUserRole.COORDINATOR}`,
    name: EnumUserRole.COORDINATOR,
    component: () => import('src/layouts/CoordinatorLayout.vue'),
    meta: {
      role: EnumUserRole.COORDINATOR,
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('pages/DashboardPage.vue'),
      },
      {
        path: 'curriculums',
        component: () => import('src/pages/Curriculum/CurriculumsPage.vue'),
      },
      {
        path: 'courses',
        component: () => import('pages/Course/CoursePage.vue'),
        children: [
          {
            path: ':id',
            component: () => import('pages/Course/Course-id.vue'),
          },
        ],
      },
    ],
  },
];
