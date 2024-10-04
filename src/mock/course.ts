import { Course } from 'src/types/course';
import { ExpectedMean } from 'src/types/skill_mapping';
import { CourseCredit, SubjectType } from 'src/types/subject';

export const mockCourse: Course[] = [
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
    curriculumId: 0,
    teacherId: 0,
    students: [
      {
        id: 65160666,
        name: 'สมชาย ใจดี',
        engName: 'Somchai Jaidee',
        gpa: 4.0,
        phone: '0940000000',
        startDate: new Date(),
        skillCollection: [
          {
            skillMapping: {
              subjectId: 0,
              skillId: 0,
              expectedLevel: 1,
              expectedMean: ExpectedMean.The1Basic,
            },
            acquiredLevel: 0,
            passed: false,
          },
        ],
      },
    ],
  },
];
