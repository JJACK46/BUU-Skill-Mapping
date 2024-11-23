import { defineStore } from 'pinia';
import { CourseService } from 'src/services/course';
import { Course } from 'src/types/course';

export const useCourseStore = defineStore('course', {
  state: () => ({
    form: <Partial<Course>>{},
    courses: <Course[]>[],
    dialogState: false,
  }),

  getters: {},

  actions: {
    async fetchData() {
      this.courses = (await CourseService.getAll()).data;
    },
    async createOne() {
      await CourseService.createOne(this.form as Course);
      this.dialogState = false;
      window.location.reload();
    },
    async removeOne(id: number) {
      await CourseService.removeOne(id);
      window.location.reload();
    },
  },
});
