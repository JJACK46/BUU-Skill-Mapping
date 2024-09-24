import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/login',
    component: () => import('layouts/FullLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/skills',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/SkillPage.vue') }],
  },
  {
    path: '/skill-mapping',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SkillMappingPage.vue') },
    ],
  },
  {
    path: '/subjects',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/SubjectPage.vue') }],
  },
  {
    path: '/students',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/StudentPage.vue') }],
  },
  {
    path: '/teachers',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/TeacherPage.vue') }],
  },

  {
    path: '/about',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AboutPage.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
