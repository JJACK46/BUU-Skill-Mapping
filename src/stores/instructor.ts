import { defineStore } from 'pinia';
import type { QTableProps } from 'quasar';
import { InstructorService } from 'src/services/instructor';
import type { PageParams } from 'src/types/pagination';
import type { Instructor } from 'src/types/instructor';
import { convertToPageParams, defaultPagination } from 'src/utils/pagination';
import type { FilterModel } from 'src/types/filter';

type TitleForm = 'New Instructor' | 'Edit Instructor';

export const useInstructorStore = defineStore('instructor', {
  state: () => ({
    dialogState: false,
    search: '',
    form: {} as Partial<Instructor>,
    teachers: [] as Instructor[],
    titleForm: '' as TitleForm,
    foundCode: false,
    pagination: defaultPagination,
    filterModel: {} as Partial<FilterModel>,
    codeLabel: '',
    isFoundCode: false,
  }),

  getters: {},

  actions: {
    async fetchAll() {
      const { data, total } = await InstructorService.getAll(
        convertToPageParams(this.pagination, this.search, this.filterModel),
      );
      this.curriculums = data;
      this.pagination!.rowsNumber = total || 0;
    },
    resetForm() {
      this.form = {} as Partial<Instructor>;
    },
    async findExistCode(code: string) {
      if (code.length === 8) {
        const res = await InstructorService.findExistCode(code);
        if (res) {
          this.codeLabel = 'Found the exist code';
          this.isFoundCode = true;
          this.form = res;
        } else {
          this.codeLabel = 'Not found the code';
          this.isFoundCode = false;
        }
      }
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
