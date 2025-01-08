import { defineStore } from 'pinia';
import type { QTableProps } from 'quasar';
import { InstructorService } from 'src/services/instructor';
import type { PageParams } from 'src/types/pagination';
import type { Instructor } from 'src/types/instructor';

export const useTeacherStore = defineStore('teacher', {
  state: () => ({
    dialogState: false,
    search: '',
    pagination: {
      rowsPerPage: 10,
    } as QTableProps['pagination'],
    form: {} as Partial<Instructor>,
    teachers: [] as Instructor[],
  }),

  getters: {},

  actions: {
    async setup() {
      this.teachers = (await InstructorService.getAll({ page: 1 })).data;
    },
    resetForm() {
      this.form = {} as Partial<Instructor>;
    },
    async fetchData(pag?: QTableProps['pagination']) {
      const req = {
        page: pag?.page || 1,
        limit: pag?.rowsPerPage || 10,
        sort: pag?.sortBy || '',
        order: pag?.descending ? 'DESC' : 'ASC',
        search: this.search || '',
      } as PageParams;
      this.teachers = (await InstructorService.getAll(req)).data;
    },

    async handleSave() {
      await InstructorService.createOne(this.form);
      this.resetForm();
      // Refresh data after saving
      await this.fetchData();
      this.dialogState = false;
    },

    toggleDialog() {
      this.dialogState = !this.dialogState;
    },
  },
});
