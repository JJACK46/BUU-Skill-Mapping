import { defineStore } from 'pinia';
import { Notify, Dialog, type QTableProps } from 'quasar';
import { InstructorService } from 'src/services/instructor';
import type { Instructor } from 'src/types/instructor';
import { convertToPageParams, defaultPagination } from 'src/utils/pagination';
import type { FilterModel } from 'src/types/filter';
import { useCurriculumStore } from './curriculum';
import { nextTick } from 'vue';

type TitleForm = 'New Instructor' | 'Edit Instructor';

export const useInstructorStore = defineStore('instructor', {
  state: () => ({
    dialogState: false,
    search: '',
    form: {} as Partial<Instructor>,
    listItem: [] as Instructor[],
    availableItem: [] as Instructor[],
    titleForm: '' as TitleForm,
    foundCode: false,
    pagination: defaultPagination,
    filterModel: {} as Partial<FilterModel>,
    codeLabel: '',
    isFoundCode: false,
    curr: useCurriculumStore(),
  }),

  getters: {
    getInstructors: (s) => s.listItem,
    getTitleForm: (s) => s.titleForm,
    getCtaText: (s) => {
      if (s.titleForm === 'New Instructor') {
        return 'createInstructor';
      } else {
        return 'save';
      }
    },
    getAvailableInstructors: (s) => s.availableItem,
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
    async fetchRowsInCurr(pag?: QTableProps['pagination']) {
      this.pagination = pag || defaultPagination;
      // wait for 100ms for the curr store to update
      setTimeout(async () => {
        const filter: Partial<FilterModel> = {
          curriculumCode: this.curr.getCode,
        };
        const { data, total } = await InstructorService.getAll(
          convertToPageParams(this.pagination, this.search, filter),
        );
        if (data) {
          this.listItem = data;
        }
        this.pagination.rowsNumber = total || 0;
      }, 100);
    },
    async fetchAvailableInstructors(pag: QTableProps['pagination']) {
      nextTick(async () => {
        this.pagination = pag;
        const filter: Partial<FilterModel> = {
          branchThaiName: this.curr.getBranchThaiName,
        };
        const { data } = await InstructorService.getAll(
          convertToPageParams(this.pagination, this.search, filter),
        );
        if (data) {
          this.availableItem = data;
        }
      });
    },
    async assignInstructor(params: {
      curriculumId: number;
      instructorId: number;
    }) {
      const ok = await InstructorService.assignInstructor(params);
      if (ok) {
        Notify.create({
          type: 'ok',
          message: 'Updated successfully',
        });
        nextTick(async () => await this.fetchRowsInCurr());
        this.toggleDialog();
      }
    },

    async removeAssignedInstructor(params: {
      curriculumId: number;
      instructorId: number;
    }) {
      Dialog.create({
        title: 'Confirm Deletion',
        message: 'Are you sure you want to revoke this instructor?',
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        const ok = await InstructorService.removeAssignedInstructor(params);
        if (ok) {
          Notify.create({
            type: 'ok',
            message: `Deleted successfully`,
          });
          nextTick(async () => await this.fetchRowsInCurr());
        }
      });
    },
    resetForm() {
      this.form = {} as Partial<Instructor>;
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
        message: 'Are you sure you want to delete this instructor?',
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
      this.dialogState = false;
      this.resetForm();
      await this.fetchAll();
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
