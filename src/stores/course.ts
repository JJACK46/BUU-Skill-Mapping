import { defineStore } from 'pinia';
import { CourseService } from 'src/services/course';
import type { Course } from 'src/types/course';

// Mockup data
const courses: Course[] = [
  {
    id: 1,
    active: true,
    subject: {
      id: 1,
      thaiName: 'Subject 1',
      engName: 'Subject 1',
    },
  },
  {
    id: 2,
    active: true,
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
}

export const useCourseStore = defineStore('course', {
  state: (): CourseState => ({
    form: {},
    courses: [],
    dialogState: false,
  }),

  getters: {
    getCourseId(state): number {
      return state.form?.id || -1;
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
      this.courses = courses;

      this.form = courses[0] ?? {};
    },

    async removeOne(id: string) {
      await CourseService.removeOne(id);
      window.location.reload();
    },

    setCourseId(id: number) {
      // Fixed: Use `form` instead of `course`
      this.form.id = id;
    },
  },
});
