import { Course } from 'src/types/course';
import { SkillLevel } from 'src/types/skill-collection';
import { CourseCredit, SubjectType } from 'src/types/subject';
import { ref } from 'vue';

export const mockCourse = ref<Course[]>([
  {
    id: 1,
    name: 'การพัฒนาหน้าบ้าน',
    subject: {
      id: 1,
      name: 'การพัฒนาหน้าบ้าน',
      engName: 'Frontend Development',
      description: 'วิธีการพัฒนาหน้าบ้าน',
      credit: CourseCredit.Two,
      type: SubjectType.Compulsory,
    },
    teachers: [{ id: 1 }],
    courseEnrollments: [
      {
        student: {
          id: 65160666,
          name: 'สมชาย ใจดี',
          engName: 'Somchai Jaidee',
          dateEnrollment: new Date(),
        },
        id: 0,
        skillCollection: [
          {
            score: 100,
            level: SkillLevel.Ability5,
            passed: true,
            subject: { id: 1 },
            skill: { id: 1 },
          },
        ],
      },
    ],
    description: '',
    active: true,
  },
]);
