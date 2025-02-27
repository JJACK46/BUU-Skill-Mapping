import { EnumUserRole } from 'src/data/roles';
import type { RouteRecordRaw } from 'vue-router';

export const studentRoutes: RouteRecordRaw[] = [
  {
    path: `/${EnumUserRole.STUDENT}`,
    name: EnumUserRole.STUDENT,
    component: () => import('src/layouts/StudentLayout.vue'),
    meta: {
      role: EnumUserRole.STUDENT,
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('pages/DashboardPage.vue'),
      },
      {
        path: 'skills',
        component: () => import('pages/SkillPage.vue'),
      },
      {
        path: 'courses',
        component: () => import('pages/Course/CoursePage.vue'),
        children: [
          {
            path: ':id',
            component: () => import('src/pages/Course/CourseDetails.vue'),
          },
        ],
      },
    ],
  },
];
