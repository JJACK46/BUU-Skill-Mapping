import type { RouteRecordRaw } from 'vue-router';

export const curriculumRoutes: RouteRecordRaw[] = [
  {
    path: '/curriculums',
    name: 'Curriculum',
    component: () => import('src/layouts/CurriculumLayout.vue'),
    children: [
      {
        path: ':code',
        name: 'Curriculum Code',
        component: () => import('src/pages/Curriculum/CurriculumTab.vue'),
      },
      {
        path: ':code/coordinators',
        name: 'Coordinators of Curriculum',
        component: () => import('src/pages/Curriculum/CoordinatorsTab.vue'),
      },
      {
        path: ':code/plos',
        name: 'PLOs',
        component: () => import('src/pages/Curriculum/PloTab.vue'),
      },
      {
        path: ':code/skills',
        name: 'Skills of Curriculum',
        component: () => import('src/pages/Curriculum/SkillTab.vue'),
      },
      {
        path: ':code/subjects/:subjectId/clos',
        name: 'ClOs',
        component: () => import('src/pages/Curriculum/CloDialog.vue'),
      },
      {
        path: ':code/subjects',
        name: 'Subjects of Curriculum',
        component: () => import('src/pages/Curriculum/SubjectTab.vue'),
      },
      {
        path: ':code/summary',
        name: 'Summary of Curriculum',
        component: () => import('src/pages/Curriculum/SummaryTab.vue'),
      },
    ],
  },
];
