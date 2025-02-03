import { defineStore } from 'pinia';
import { Dialog, Notify } from 'quasar';
import type { Clo } from 'src/types/clo';

type TitleForm = 'New PLO' | 'Edit PLO';

export const useClostore = defineStore('clo', {
  state: () => ({
    dialogState: false,
    form: <Partial<Clo>>{},
    tabsModel: 'req',
    editMode: true,
    titleForm: '' as TitleForm,
    search: '',
    qNotify: Notify,
    qDialog: Dialog,
  }),
  getters: {
    getDialogTitle: (s) => s.titleForm,
  },
  actions: {
    handleOpenDialog(form?: Partial<Clo>) {
      if (form) {
        this.titleForm = 'Edit PLO';
        this.form = { ...form };
      } else {
        this.titleForm = 'New PLO';
        this.form = {};
      }
      this.dialogState = true;
    },
  },
});
