import { defineStore } from 'pinia';
import { Dialog, Notify } from 'quasar';
import { ClosService } from 'src/services/clos';
import type { Clo } from 'src/types/clo';

type TitleForm = 'New PLO' | 'Edit PLO';

export const useClostore = defineStore('clo', {
  state: () => ({
    dialogState: false,
    clos: [] as Clo[],
    form: <Partial<Clo>>{},
    tabsModel: 'req',
    editMode: true,
    titleForm: '' as TitleForm,
    search: '',
    qNotify: Notify,
    qDialog: Dialog,
  }),
  getters: {
    getClos: (c) => c.clos,
    getDialogTitle: (s) => s.titleForm,
  },
  actions: {
    handleOpenDialog(form?: Partial<Clo>) {
      if (form) {
        this.titleForm = 'Edit CLO';
        this.form = { ...form };
      } else {
        this.titleForm = 'New CLO';
        this.form = {};
      }
      this.dialogState = true;
    },
    async fetchData() {
      this.courses = (await ClosService.getAll()).data;
    },
    async createOne() {
      await ClosService.createOne(this.form as Clo);
      this.dialogState = false;
      window.location.reload();
    },
    async handleSave() {
      if (this.titleForm === 'Edit Clos') {
        const ok = await ClosService.updateOne(this.form);
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'Clos updated successfully',
          });
      } else {
        const ok = await ClosService.createOne(this.form);
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'Clos created successfully',
          });
      }
      this.subjects = (await ClosService.getAll()).data;
      this.dialogState = false;
      this.resetForm();
    },
    async removeOne(id: string) {
      await ClosService.removeOne(id);
      window.location.reload();
    },
  },
});
