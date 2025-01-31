import { defineStore } from 'pinia';
import { Dialog, Notify } from 'quasar';
import type { Plo } from 'src/types/plo';

type TitleForm = 'New PLO' | 'Edit PLO';

export const usePlostore = defineStore('plo', {
  state: () => ({
    dialogState: false,
    form: <Partial<Plo>>{},
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
    handleOpenDialog(form?: Partial<Plo>) {
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
