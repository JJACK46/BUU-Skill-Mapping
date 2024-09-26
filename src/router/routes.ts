import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
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
    name: 'Skill Management',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/SkillPage.vue') }],
  },
  {
    path: '/skill-mapping',
    name: 'Skill Mapping',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SkillMappingPage.vue') },
    ],
  },
  {
    path: '/subjects',
    name: 'Subject Management',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/SubjectPage.vue') }],
  },
  {
    path: '/curriculums',
    name: 'Curriculums Management',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CurriculumPage.vue') },
    ],
  },
  {
    path: '/courses',
    name: 'Course Management',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/CoursePage.vue') }],
  },
  {
    path: '/users',
    name: 'User Management',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/UserPage.vue') }],
  },
  {
    path: '/students',
    name: 'Student Management',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/StudentPage.vue') }],
  },
  {
    path: '/teachers',
    name: 'Teacher Management',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/TeacherPage.vue') }],
  },
  {
    path: '/curriculums',
    name: 'Curriculums Management',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CurriculumPage.vue') },
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
