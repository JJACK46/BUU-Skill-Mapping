import { defineStore } from 'pinia';
import { Notify, Dialog, type QTableProps } from 'quasar';
import { InstructorService } from 'src/services/instructor';
import type { Instructor } from 'src/types/instructor';
import { convertToPageParams, defaultPagination } from 'src/utils/pagination';
import type { FilterModel } from 'src/types/filter';
import { useCurriculumStore } from './curriculum';
import { nextTick } from 'vue';

type TitleForm = 'New Instructor' | 'Edit Instructor';

const initForm: Instructor = {
  id: 0,
  code: '',
  thaiName: '',
  engName: '',
  branchId: 0,
  branch: {},
  email: '',
  curriculums: [],
};

export const useInstructorStore = defineStore('instructor', {
  state: () => ({
    dialogState: false,
    search: '',
    form: initForm,
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
        this.listItem = JSON.parse(JSON.stringify(data));
      }
      this.pagination!.rowsNumber = total || 0;
    },
    async fetchRowsInCurr(pag?: QTableProps['pagination']) {
      this.pagination = pag || defaultPagination;
      await nextTick(); // Wait for the curr store to update
      const filter: Partial<FilterModel> = {
        curriculumCode: this.curr.getCode,
      };
      const { data, total } = await InstructorService.getAll(
        convertToPageParams(this.pagination, this.search, filter),
      );
      if (data) {
        this.listItem = JSON.parse(JSON.stringify(data));
      }
      this.pagination!.rowsNumber = total || 0;
    },
    async fetchAvailableInstructors(pag: QTableProps['pagination']) {
      this.pagination = pag;
      await nextTick();
      const filter: Partial<FilterModel> = {
        branchThaiName: this.curr.getBranchThaiName,
      };
      const { data } = await InstructorService.getAll(
        convertToPageParams(this.pagination, this.search, filter),
      );
      if (data) {
        this.availableItem = JSON.parse(JSON.stringify(data));
      }
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
        await nextTick();
        await this.fetchRowsInCurr();
        this.toggleDialog();
      }
    },

    removeAssignedInstructor(params: {
      curriculumId: number;
      instructorId: number;
    }) {
      Dialog.create({
        title: 'Confirm Deletion',
        message: 'Are you sure you want to revoke this instructor?',
        cancel: true,
        persistent: true,
      }).onOk(() => {
        InstructorService.removeAssignedInstructor(params)
          .then(async (ok) => {
            if (ok) {
              Notify.create({
                type: 'ok',
                message: `Deleted successfully`,
              });
              await nextTick();
              await this.fetchRowsInCurr();
            }
          })
          .catch((err) => console.log(err));
      });
    },
    resetForm() {
      this.form = initForm;
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
      const ok = await InstructorService.updateOne(this.form as Instructor);
      if (ok) {
        Notify.create({
          type: 'ok',
          message: 'Updated successfully',
        });
      }
      await this.fetchAll();
    },

    async deleteOne(id: number) {
      if (confirm()) {
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
      }).onOk(() => {
        void nextTick(async () => {
          await this.deleteOne(id);
        });
      });
    },

    async handleSave() {
      if (this.titleForm === 'Edit Instructor') {
        await this.updateOne();
      } else {
        await this.createOne();
      }
      this.dialogState = false;
      this.resetForm();
      await this.fetchAll();
    },

    handleEdit(form: Instructor) {
      this.form = { ...form };
      this.titleForm = 'Edit Instructor';
      this.toggleDialog();
    },

    handleCreate() {
      this.form = initForm;
      this.titleForm = 'New Instructor';
      this.toggleDialog();
    },

    toggleDialog() {
      this.dialogState = !this.dialogState;
    },
  },
});
