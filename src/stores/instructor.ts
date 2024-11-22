import { defineStore } from 'pinia';
import { QTableProps } from 'quasar';
import { InstructorService } from 'src/services/teacher';
import { PageParams } from 'src/types/pagination';
import { Teacher } from 'src/types/teacher';

export const useTeacherStore = defineStore('teacher', {
  state: () => ({
    dialogState: false,
    search: '',
    pagination: {
      rowsPerPage: 10
    } as QTableProps['pagination'],
    form: {} as Partial<Teacher>,
    teachers: [] as Teacher[],
  }),

  getters: {
  },

  actions: {
    async setup() {
      this.teachers = (await InstructorService.getAll()).data;
    },
    resetForm() {
      this.form = {} as Partial<Teacher>;
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
    },

    toggleDialog() {
      this.dialogState = !this.dialogState;
    },

  },
});