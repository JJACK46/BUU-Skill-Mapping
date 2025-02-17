import { defineStore } from 'pinia';
import { Notify, Dialog, type QTableProps } from 'quasar';
import { InstructorService } from 'src/services/instructor';
import type { Instructor } from 'src/types/instructor';
import { convertToPageParams, defaultPagination } from 'src/utils/pagination';
import type { FilterModel } from 'src/types/filter';

type TitleForm = 'New Instructor' | 'Edit Instructor';

export const useInstructorStore = defineStore('instructor', {
  state: () => ({
    dialogState: false,
    search: '',
    form: {} as Partial<Instructor>,
    listItem: [] as Instructor[],
    titleForm: '' as TitleForm,
    foundCode: false,
    pagination: defaultPagination,
    filterModel: {} as Partial<FilterModel>,
    codeLabel: '',
    isFoundCode: false,
  }),

  getters: {
    getInstructors: (s) => s.listItem,
    getTitleForm: (s) => s.titleForm,
  },

  actions: {
    async fetchAll(pag?: QTableProps['pagination']) {
      this.pagination = pag || defaultPagination;
      const { data, total } = await InstructorService.getAll(
        convertToPageParams(this.pagination, this.search, this.filterModel),
      );
      if (data) {
        this.listItem = data;
      }
      this.pagination.rowsNumber = total || 0;
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
          this.form = {} as Partial<Instructor>;
        }
      }
    },

    async createOne() {
      const ok = await InstructorService.createOne(this.form);
      if (ok) {
        Notify.create({
          type: 'ok',
          message: 'Created successfully',
        });
      }
      await this.fetchAll();
    },
    async updateOne() {
      const ok = await InstructorService.updateOne(this.form);
      if (ok) {
        Notify.create({
          type: 'ok',
          message: 'Updated successfully',
        });
      }
      await this.fetchAll();
    },

    async deleteOne(id: number) {
      if (confirm) {
        const ok = await InstructorService.removeOne(id);
        if (ok) {
          Notify.create({
            type: 'ok',
            message: `Deleted successfully`,
          });
        }
        await this.fetchAll();
      }
    },

    handleDelete(id: number) {
      Dialog.create({
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this curriculum?',
        cancel: true,
        persistent: true,
      }).onOk(async () => this.deleteOne(id));
    },

    async handleSave() {
      if (this.titleForm === 'Edit Instructor') {
        this.updateOne();
      } else {
        this.createOne();
      }
      this.resetForm();
      await this.fetchAll();
      this.dialogState = false;
    },

    handleEdit(form: Partial<Instructor>) {
      this.form = { ...form };
      this.titleForm = 'Edit Instructor';
      this.toggleDialog();
    },

    handleCreate() {
      this.form = {} as Partial<Instructor>;
      this.titleForm = 'New Instructor';
      this.toggleDialog();
    },

    toggleDialog() {
      this.dialogState = !this.dialogState;
    },
  },
});
