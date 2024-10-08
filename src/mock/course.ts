import { Course } from 'src/types/course';
import { SkillLevel } from 'src/types/skill-collection';
import { CourseCredit, SubjectType } from 'src/types/subject';
import { ref } from 'vue';

export const mockCourse = ref<Course[]>([
  {
    id: 1,
    subject: {
      id: 1,
      name: 'การพัฒนาหน้าบ้าน',
      engName: 'Frontend Development',
      description: 'วิธีการพัฒนาหน้าบ้าน',
      engDescription: 'Some detail ...Frontend Development',
      credit: CourseCredit.Two,
      type: SubjectType.Compulsory,
    },
    curriculum: { id: 'f1' },
    teacher: { id: 1 },
    courseEnrollments: [
      {
        student: {
          id: 65160666,
          name: 'สมชาย ใจดี',
          engName: 'Somchai Jaidee',
          gpa: 3.99,
          phone: '0940000000',
          startDate: new Date(),
        },
        id: 0,
        gainScore: {
          project: 60,
          examMid: 0,
          examFinal: 0,
          assignment: 30,
        },
        skillCollection: [
          {
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
    score: {
      project: 70,
      examMid: 0,
      examFinal: 0,
      assignment: 30,
    },
  },
]);
