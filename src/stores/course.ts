import { defineStore } from 'pinia';
import { CourseService } from 'src/services/course';
import { Course } from 'src/types/course';

export const useCourseStore = defineStore('course', {
  state: () => ({
    form: <Partial<Course>>{},
    courses: <Course[]>[],
    course: <Course>{},
    dialogState: false,
  }),

  getters: {
    getCourseId(state) {
      return state.course.id || '';
    }
  },
  actions: {
    async fetchData() {
      this.courses = (await CourseService.getAll()).data;
    },
    async createOne() {
      await CourseService.createOne(this.form as Course);
      this.dialogState = false;
      window.location.reload();
    },
    async removeOne(id: string) {
      await CourseService.removeOne(id);
      window.location.reload();
    },
    setCourseId(id: string) {
      this.course.id = id;
    }
  },
});
