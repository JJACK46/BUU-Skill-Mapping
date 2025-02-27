import { EnumUserRole } from 'src/data/roles';
import type { RouteRecordRaw } from 'vue-router';

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: `/${EnumUserRole.ADMIN}`,
    name: EnumUserRole.ADMIN,
    component: () => import('src/layouts/AdminLayout.vue'),
    meta: {
      role: EnumUserRole.ADMIN,
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('pages/DashboardPage.vue'),
      },
      {
        path: 'skills',
        name: 'Skill Management',
        component: () => import('pages/SkillPage.vue'),
      },
      {
        path: 'subjects',
        name: 'Subject Management',
        component: () => import('pages/SubjectPage.vue'),
      },
      {
        path: 'curriculums',
        name: 'Curriculums Management',
        component: () => import('src/pages/Curriculum/CurriculumsPage.vue'),
      },
      {
        path: 'courses',
        component: () => import('pages/Course/CoursePage.vue'),
        children: [
          {
            path: '',
            name: 'Course Management',
            component: () => import('pages/Course/CoursePage.vue'),
          },
          {
            path: ':id',
            name: 'Course Detail',
            component: () => import('src/pages/Course/CourseDetails.vue'),
          },
        ],
      },
      {
        path: 'users',
        name: 'User Management',
        component: () => import('pages/UserPage.vue'),
      },
      {
        path: 'students',
        name: 'Student Management',
        component: () => import('src/pages/Student/StudentPage.vue'),
        children: [
          {
            path: ':id',
            name: 'Student Detail',
            component: () => import('src/pages/Student/StudentDetails.vue'),
          },
        ],
      },
      {
        path: 'instructors',
        name: 'Instructor Management',
        component: () => import('pages/InstructorPage.vue'),
      },
      {
        path: 'faculties',
        name: 'Faculty & Branch Management',
        component: () => import('pages/FacultyPage.vue'),
      },
    ],
  },
];
