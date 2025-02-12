import type { RouteRecordRaw } from 'vue-router';

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
        component: () => import('pages/SkillPage.vue'),
      },
    ],
  },
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
    path: '/curriculums',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Curriculums Management',
        component: () => import('src/pages/Curriculum/CurriculumPage.vue'),
      },
      {
        path: 'new',
        name: 'New Curriculum',
        component: () => import('src/pages/Curriculum/Curriculum-new.vue'),
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
        component: () => import('pages/Course/CoursePage.vue'),
      },
      {
        path: ':id',
        name: 'Course Detail',
        component: () => import('pages/Course/Course-id.vue'),
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
        component: () => import('src/pages/Student/StudentPage.vue'),
      },
      {
        path: ':id',
        name: 'Student Detail',
        component: () => import('src/pages/Student/Student-id.vue'),
      },
    ],
  },
  {
    path: '/instructors',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Instructor Management',
        component: () => import('pages/InstructorPage.vue'),
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
    path: '/faculties',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Faculty & Branch Management',
        component: () => import('pages/FacultyPage.vue'),
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
