import type { RouteRecordRaw } from 'vue-router';

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: () => import('src/layouts/FullLayout.vue'),
    meta: { public: true },
  },
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
  // {
  //   path: '/curriculum',
  //   component: () => import('layouts/CurriculumLayout.vue'),
  //   meta: {public: true},
  //   children: [
  //     {
  //       path: ':id',
  //       name: 'Curriculum Detail',
  //       component: () =>
  //         import('src/pages/Curriculum/CurriculumDetailPage.vue'),
  //     },
  //   ],
  // },
];
