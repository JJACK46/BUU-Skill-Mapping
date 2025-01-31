import type { RouteRecordRaw } from 'vue-router';

export const curriculumRoutes: RouteRecordRaw[] = [
  {
    path: '/curriculum/:id',
    name: 'Curriculum',
    component: () => import('src/layouts/CurriculumLayout.vue'),
    children: [
      {
        path: '',
        name: 'Curriculum Id',
        component: () => import('src/pages/Curriculum/CurriculumTab.vue'),
      },
      {
        path: 'coordinators',
        name: 'Coordinators of Curriculum',
        component: () => import('src/pages/Curriculum/CoordinatorsTab.vue'),
      },
      {
        path: 'plos',
        name: 'PLOs',
        component: () => import('src/pages/Curriculum/PloTab.vue'),
      },
      {
        path: 'skills',
        name: 'Skills of Curriculum',
        component: () => import('src/pages/Curriculum/SkillTab.vue'),
      },
      {
        path: 'clos',
        name: 'ClOs',
        component: () => import('src/pages/Curriculum/CloTab.vue'),
      },
      {
        path: 'subjects',
        name: 'Subjects of Curriculum',
        component: () => import('src/pages/Curriculum/SubjectTab.vue'),
      },
      {
        path: 'summary',
        name: 'Summary of Curriculum',
        component: () => import('src/pages/Curriculum/SummaryTab.vue'),
      },
    ],
  },
];
