import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/login',
    meta: {
      public: true,
    },
    component: () => import('layouts/FullLayout.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('pages/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/skills',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Skill Management',
        component: () => import('pages/Skill/skillView.vue'),
      },
    ],
  },
  // {
  //   path: '/skills',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'Skill Management',
  //       component: () => import('pages/SkillPage.vue'),
  //     },
  //   ],
  // },
  {
    path: '/subjects',

    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Subject Management',
        component: () => import('pages/SubjectPage.vue'),
      },
    ],
  },
  {
    path: '/skill-mapping',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Skill Mapping',
        component: () => import('pages/SkillMappingPage.vue'),
      },
    ],
  },
  {
    path: '/curriculums',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Curriculums Management',
        component: () => import('pages/CurriculumPage.vue'),
      },
    ],
  },
  {
    path: '/courses',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Course Management',
        component: () => import('pages/CoursePage.vue'),
      },
    ],
  },
  {
    path: '/users',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'User Management',
        component: () => import('pages/UserPage.vue'),
      },
    ],
  },
  {
    path: '/students',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Student Management',
        component: () => import('pages/StudentPage.vue'),
      },
    ],
  },
  {
    path: '/teachers',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Teacher Management',
        component: () => import('pages/TeacherPage.vue'),
      },
    ],
  },
  {
    path: '/account',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Account',
        component: () => import('pages/AccountPage.vue'),
      },
    ],
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
