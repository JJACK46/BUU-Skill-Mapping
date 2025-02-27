import { EnumUserRole } from 'src/data/roles';
import type { RouteRecordRaw } from 'vue-router';

export const instructorRoutes: RouteRecordRaw[] = [
  {
    path: `/${EnumUserRole.INSTRUCTOR}`,
    name: EnumUserRole.INSTRUCTOR,
    component: () => import('src/layouts/InstructorLayout.vue'),
    meta: {
      role: EnumUserRole.INSTRUCTOR,
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
            component: () => import('src/pages/Course/CourseDetails.vue'),
          },
        ],
      },
    ],
  },
];
