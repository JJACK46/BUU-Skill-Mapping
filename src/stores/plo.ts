import { defineStore } from 'pinia';
import { Dialog, Notify } from 'quasar';
import { PlosService } from 'src/services/plo';
import type { PLO } from 'src/types/plo';
import { useCurriculumStore } from './curriculum';
<<<<<<< HEAD
import { convertToPageParams } from 'src/utils/pagination';
=======
>>>>>>> 3c10d9e (remove mockup, connect real api)

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
<<<<<<< HEAD
    getData: (c) => c.curr.form.plos || [],
  },
  actions: {
    async fetchAll() {
      const { data, total } = await PlosService.getAll(
        convertToPageParams(this.pagination, this.search),
      );
      this.plos = data;
      this.totalPlos = total;
=======
  },
  actions: {
    async fetchAll() {
      const currId = this.curr.getInsertId;
      if (currId) {
        this.listPlo = await PlosService.getAllInCurr(currId);
      }
>>>>>>> 3c10d9e (remove mockup, connect real api)
    },

    async createOne() {
      const ok = await PlosService.createOne(this.form);
      if (ok) {
        Notify.create({
          type: 'ok',
          message: 'Created successfully',
        });
<<<<<<< HEAD
        window.location.reload(); // โหลดข้อมูลใหม่
=======
>>>>>>> 3c10d9e (remove mockup, connect real api)
      }
    },
    async updateOne() {
      const ok = await PlosService.updateOne(this.form);
      if (ok) {
        Notify.create({
          type: 'ok',
          message: 'Updated successfully',
        });
<<<<<<< HEAD
        window.location.reload(); // โหลดข้อมูลใหม่
=======
>>>>>>> 3c10d9e (remove mockup, connect real api)
      }
    },

    async deleteOne(id: number) {
      if (confirm) {
        const ok = await PlosService.removeOne(id);
        if (ok) {
          Notify.create({
            type: 'ok',
<<<<<<< HEAD
            message: 'Deleted successfully',
          });
          window.location.reload(); // โหลดข้อมูลใหม่
=======
            message: `Deleted successfully`,
          });
>>>>>>> 3c10d9e (remove mockup, connect real api)
        }
      }
    },

    handleDelete(id: number) {
      Dialog.create({
        title: 'Confirm Deletion',
<<<<<<< HEAD
        message: 'Are you sure you want to delete this Plo?',
        cancel: true,
        persistent: true,
      }).onOk(async () => await this.deleteOne(id));
=======
        message: 'Are you sure you want to delete this curriculum?',
        cancel: true,
        persistent: true,
      }).onOk(async () => this.deleteOne(id));
>>>>>>> 3c10d9e (remove mockup, connect real api)
    },

    async handleSave() {
      this.form.curriculumId = this.curr.getInsertId;
      if (this.titleForm === 'Edit PLO') {
<<<<<<< HEAD
        await this.updateOne();
      } else {
        await this.createOne();
      }
      this.resetForm();
=======
        this.updateOne();
      } else {
        this.createOne();
      }
      this.resetForm();
      await this.fetchAll();
>>>>>>> 3c10d9e (remove mockup, connect real api)
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
