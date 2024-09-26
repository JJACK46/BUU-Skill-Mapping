import { Course } from 'src/types/course';
import { CourseCredit, SubjectType } from 'src/types/subject';

export const mockCourse: Course[] = [
  {
    id: 1,
    name: 'เส้นทางสู่นักพัฒนา',
    engName: 'The road to Developer',
    description: 'some thing about this course',
    curriculumId: 1,
    teacherId: 1,
    subjects: [
      {
        name: 'การพัฒนาหน้าบ้าน',
        engName: 'Frontend Developer',
        description: '',
        engDescription: '',
        credit: CourseCredit.Three,
        type: SubjectType.Compulsory,
      },
      {
        name: 'การพัฒนาหลังบ้าน',
        engName: 'Backend Developer',
        description: '',
        engDescription: '',
        credit: CourseCredit.Three,
        type: SubjectType.Compulsory,
      },
    ],
  },
];
