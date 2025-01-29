import { EnumUserRole } from 'src/enums/roles';
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
        path: 'curriculum/:id',
        name: 'Curriculum',
        component: () => import('src/pages/Curriculum/CurriculumPage.vue'),
        children: [
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
            path: 'summary',
            name: 'Summary of Curriculum',
            component: () => import('src/pages/Curriculum/SubjectTab.vue'),
          },
        ],
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
            component: () => import('pages/Course/Course-id.vue'),
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
            component: () => import('src/pages/Student/Student_ID.vue'),
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
