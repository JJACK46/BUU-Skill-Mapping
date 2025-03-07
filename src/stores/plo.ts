import { defineStore } from 'pinia';
import { Dialog, Notify } from 'quasar';
import { PlosService } from 'src/services/plo';
import type { PLO } from 'src/types/plo';
import { useCurriculumStore } from './curriculum';
import { convertToPageParams } from 'src/utils/pagination';
import type { FilterModel } from 'src/types/filter';

type TitleForm = 'New PLO' | 'Edit PLO';

export const usePloStore = defineStore('plo', {
  state: () => ({
    dialogState: false,
    form: <Partial<PLO>>{},
    tabsModel: 'req',
    editMode: true,
    titleForm: '' as TitleForm,
    search: '',
    qNotify: Notify,
    qDialog: Dialog,
    plos: [] as PLO[],
    // total: 0,
    curr: useCurriculumStore(),
    filterModel: {} as Partial<FilterModel>,
  }),
  getters: {
    getDialogTitle: (s) => s.titleForm,
    getListPLO: (c) => c.plos || [],
  },
  actions: {
    async fetchAll() {
      const data = await PlosService.getAll(
        convertToPageParams(this.pagination, this.search, this.filterModel),
      );
      if (data) {
        this.plos = data;
      }
      // this.total = total;
    },

    async createOne() {
      const ok = await PlosService.createOne(this.form);
      if (ok) {
        Notify.create({
          type: 'ok',
          message: 'Created successfully',
        });
      }
    },
    async updateOne() {
      const ok = await PlosService.updateOne(this.form);
      if (ok) {
        Notify.create({
          type: 'ok',
          message: 'Updated successfully',
        });
      }
    },

    async deleteOne(id: number) {
      if (confirm) {
        const ok = await PlosService.removeOne(id);
        if (ok) {
          Notify.create({
            type: 'ok',
            message: 'Deleted successfully',
          });
          await this.fetchAll();
        }
      }
    },

    handleDelete(id: number) {
      Dialog.create({
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this Plo?',
        cancel: true,
        persistent: true,
      }).onOk(async () => await this.deleteOne(id));
    },

    async handleSave() {
      this.form.curriculumId = this.curr.getInsertId;
      if (this.titleForm === 'Edit PLO') {
        await this.updateOne();
      } else {
        await this.createOne();
      }
      setTimeout(() => {
        this.resetForm();
      }, 1000);
      await this.fetchAll();
      this.dialogState = false;
    },

    handleEdit(form: Partial<PLO>) {
      this.form = { ...form };
      this.titleForm = 'Edit PLO';
      this.toggleDialog();
    },

    handleCreate() {
      this.form = {} as Partial<PLO>;
      this.titleForm = 'New PLO';
      this.toggleDialog();
    },

    toggleDialog() {
      this.dialogState = !this.dialogState;
    },

    resetForm() {
      this.form = {} as Partial<PLO>;
    },
  },
});
