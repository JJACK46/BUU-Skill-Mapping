import { defineStore } from 'pinia';
import { StudentService } from 'src/services/student';
import type { Student } from 'src/types/student';
import { convertToPageParams, defaultPagination } from 'src/utils/pagination';

type TitleForm = 'New Student' | 'Edit Student';

export const useStudentStore = defineStore('student', {
  state: () => ({
    dialogState: false,
    dialogImport: false,
    search: '',
    pagination: defaultPagination,
    formStudent: {} as Partial<Student>,
    students: [] as Student[],
    titleForm: '' as TitleForm,
  }),
  getters: {
    getTitleForm: (state) => state.titleForm,
    getStudents: (s) => s.students,
  },
  actions: {
    async fetchData() {
      const { data } = await StudentService.fetchData(
        convertToPageParams(this.pagination),
      );
      if (!data) return;
      this.students = data;
    },
    async handleSave(form?: Partial<Student>) {
      if (form) {
        StudentService.updateOne(form);
      } else {
        StudentService.createOne(this.formStudent);
      }
      this.dialogState = false;
      await this.fetchData();
    },
    async getSkillTree(id: number) {
      const res = await StudentService.getSkillTree(id);
      return res;
    },
    toggleDialog(form?: Partial<Student>) {
      if (form) {
        this.formStudent = form;
        this.titleForm = 'Edit Student';
      } else {
        this.formStudent = {} as Student;
        this.titleForm = 'New Student';
      }
      this.dialogState = !this.dialogState;
    },
    toggleDialogImport() {
      this.dialogImport = !this.dialogImport;
    },
  },
});
