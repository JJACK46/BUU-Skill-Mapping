import { defineStore } from 'pinia';
import { Dialog, Notify } from 'quasar';
import type { Plo } from 'src/types/plo';
import PloService from 'src/services/plo';
import { convertToPageParams, defaultPagination } from 'src/utils/pagination';

export type TitleFormPlo = 'New Plo' | 'Edit Plo' | 'Delete Plo' | 'View';

export const usePlostore = defineStore('plo', {
  state: () => ({
    dialogState: false,
    form: <Partial<Plo>>{},
    plos: [] as Plo[],
    tabsModel: 'req',
    pagination: defaultPagination,
    editMode: true,
    titleForm: '' as TitleFormPlo,
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
    async fetchData() {
      this.plos = (
        await PloService.getAll(
          convertToPageParams(this.pagination, this.search),
        )
      ).data;
    },
    async handleSave(payload: object) {
      if (this.form.id) {
        const ok = await PloService.updatePlo(payload);
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'PLO updated successfully',
          });
      } else {
        const ok = await PloService.addPlo(payload);
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'PLO created successfully',
          });
      }
      this.fetchData();
      this.dialogForm = false;
      this.resetForm();
    },
    async createOne() {
      await PloService.addPlo(this.form as Plo);
      this.dialogState = false;
      window.location.reload();
    },
    async handleRemove(id: string) {
      this.qDialog
        .create({
          title: 'Confirm',
          message: 'Are you sure you want to delete this PLO?',
          cancel: true,
          persistent: true,
        })
        .onCancel(() => {
          return;
        })
        .onOk(async () => {
          await PloService.removePlo(id);
          this.fetchData();
        });
    },
  },
});
