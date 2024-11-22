import { defineStore } from 'pinia';
import { StudentService } from 'src/services/student';
import { PageParams } from 'src/types/pagination';
import { Student } from 'src/types/student';

type TitleForm = 'New Student' | 'Edit Student';

export const useStudentStore = defineStore('student', {
  state: () => ({
    dialogState: false,
    dialogImport: false,
    search: '',
    pageParams: {} as PageParams,
    formStudent: {} as Partial<Student>,
    students: [] as Student[],
    titleForm: '' as TitleForm,
  }),
  getters: {
    getTitleForm: (state) => state.titleForm,
  },
  actions: {
    async fetchData(
      search?: string,
      columnId?: string | null,
      columnName?: string | null
    ) {
      if (search) {
        this.pageParams.search = search;
      }

      if (columnId && columnName) {
        this.pageParams.columnId = columnId;
        this.pageParams.columnName = columnName;
      } else {
        this.pageParams.columnId = this.pageParams.columnId || '';
        this.pageParams.columnName = this.pageParams.columnName || '';
      }
      if (columnId && columnName === 'null') {
        this.pageParams.columnId = '';
        this.pageParams.columnName = '';
      }

      const res = await StudentService.fetchData(this.pageParams);
      this.students = res.data;

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
    toggleDialog(form?: Partial<Student>) {
      if (form) {
        this.formStudent = form;
        this.titleForm = 'Edit Student';
      } else {
        this.formStudent = {} as Student;
        this.titleForm = 'New Student';
      }
      this.dialogState = !this.dialogState
    },
    toggleDialogImport() {
      this.dialogImport = !this.dialogImport
    }
  }
});