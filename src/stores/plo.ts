import { defineStore } from 'pinia';
import { Dialog, Notify } from 'quasar';
import { PlosService } from 'src/services/plo';
import type { PLO } from 'src/types/plo';
import { useCurriculumStore } from './curriculum';

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
    listPlo: [] as PLO[],
    curr: useCurriculumStore(),
  }),
  getters: {
    getDialogTitle: (s) => s.titleForm,
    getListPlo: (s) => s.listPlo,
  },
  actions: {
    async fetchAll() {
      const currId = this.curr.getInsertId;
      if (currId) {
        this.listPlo = await PlosService.getAllInCurr(currId);
      }
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
            message: `Deleted successfully`,
          });
        }
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
      this.form.curriculumId = this.curr.getInsertId;
      if (this.titleForm === 'Edit PLO') {
        this.updateOne();
      } else {
        this.createOne();
      }
      this.resetForm();
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
