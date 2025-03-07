import { defineStore } from 'pinia';
import { CourseService } from 'src/services/course';
import type { Course } from 'src/types/course';

// Mockup data
const mockCourses: Course[] = [
  {
    id: 1,
    active: true,
    semester: 'second',
    year: 2025,
    subject: {
      id: 1,
      thaiName: 'Subject 1',
      engName: 'Subject 1',
    },
  },
  {
    id: 2,
    active: true,
    semester: 'second',
    year: 2025,
    subject: {
      id: 2,
      thaiName: 'Subject 2',
      engName: 'Subject 2',
    },
  },
];

// Define the state interface for better type inference
interface CourseState {
  form: Partial<Course>;
  courses: Course[];
  dialogState: boolean;
  search: string;
}

export const useCourseStore = defineStore('course', {
  state: (): CourseState => ({
    form: {},
    courses: [],
    dialogState: false,
    search: '',
  }),

  getters: {
    getCourseId(state): number {
      const id = this.router.currentRoute.value.params.id as unknown as number;
      return id || state.form?.id || -1;
    },
    getCourse(): Partial<Course> {
      return this.form || {};
    },
  },

  actions: {
    fetchData() {
      // Simulate API call
      // const response = await CourseService.getAll();
      // this.courses = response.data;
      this.courses = mockCourses;

      this.form = mockCourses[0];
    },

    async removeOne(id: string) {
      await CourseService.removeOne(id);
    },

    setCourseId(id: number) {
      // Fixed: Use `form` instead of `course`
      this.form.id = id;
    },
    resetForm() {
      this.form = {};
    },
  },
});
