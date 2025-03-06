import type { RouteRecordRaw } from 'vue-router';

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/landing',
    component: () => import('src/layouts/FullLayout.vue'),
    meta: { public: true },
    children: [
      {
        path: '',
        name: 'Landing Page',
        component: () => import('src/pages/LandingPage.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/FullLayout.vue'),
    meta: { public: true },
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('pages/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/transcript',
    component: () => import('layouts/FullLayout.vue'),
    meta: { public: true },
    children: [
      {
        path: ':code',
        name: 'Student Transcript',
        component: () => import('src/pages/TranscriptPage.vue'),
      },
    ],
  },
  {
    path: '/about',
    component: () => import('src/layouts/FullLayout.vue'),
    meta: { public: true },
    children: [
      {
        path: '',
        name: 'About',
        component: () => import('pages/AboutPage.vue'),
      },
    ],
  },
];
