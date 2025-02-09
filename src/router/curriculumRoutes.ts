import type { RouteRecordRaw } from 'vue-router';

export const curriculumRoutes: RouteRecordRaw[] = [
  {
    path: '/curriculums',
    name: 'Curriculum',
    component: () => import('src/layouts/CurriculumLayout.vue'),
    children: [
      {
        path: ':id',
        name: 'Curriculum Id',
        component: () => import('src/pages/Curriculum/CurriculumTab.vue'),
      },
      {
        path: ':id/coordinators',
        name: 'Coordinators of Curriculum',
        component: () => import('src/pages/Curriculum/CoordinatorsTab.vue'),
      },
      {
        path: ':id/plos',
        name: 'PLOs',
        component: () => import('src/pages/Curriculum/PloTab.vue'),
      },
      {
        path: ':id/skills',
        name: 'Skills of Curriculum',
        component: () => import('src/pages/Curriculum/SkillTab.vue'),
      },
      {
        path: ':id/subjects/:subjectId/clos',
        name: 'ClOs',
        component: () => import('src/pages/Curriculum/CloTab.vue'),
      },
      {
        path: ':id/subjects',
        name: 'Subjects of Curriculum',
        component: () => import('src/pages/Curriculum/SubjectTab.vue'),
      },
      {
        path: ':id/summary',
        name: 'Summary of Curriculum',
        component: () => import('src/pages/Curriculum/SummaryTab.vue'),
      },
    ],
  },
];
