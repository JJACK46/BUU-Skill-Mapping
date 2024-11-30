import { defineStore } from 'pinia';
import { Dialog } from 'quasar';
import { UserService } from 'src/services/user';
import { User } from 'src/types/user';
import { convertToPageParams, defaultPagination } from 'src/utils/pagination';
type TitleForm = 'New User' | 'Edit User' | 'Delete User';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    form: {} as Partial<User>,
    dialogState: false,
    search: '',
    titleForm: 'New User' as TitleForm,
    pagination: defaultPagination,
    qDialog: Dialog,
    editMode: false,
  }),

  getters: {},
  actions: {
    async fetchData() {
      const { data, total } = await UserService.getAll(
        convertToPageParams(this.pagination, this.search)
      );
      this.users = data;
      this.pagination = { ...this.pagination, rowsNumber: total };
    },
    async toggleDialog({
      form,
      title,
    }: {
      form?: Partial<User>;
      title?: TitleForm;
    }) {
      this.titleForm = title || 'New User';
      if (form) {
        this.form = form;
      } else {
        this.resetForm();
      }
      this.dialogState = !this.dialogState;
    },
    async handleSave() {
      if (this.titleForm === 'Edit User') {
        await UserService.updateOne(this.form);
      } else {
        await UserService.createOne(this.form as User);
      }
      await UserService.getAll();
      this.fetchData();
      this.resetForm();
      this.dialogState = false;
    },

    async handleRemove(id: string) {
      this.qDialog
        .create({
          title: 'Confirm',
          message: 'Are you sure you want to delete this item?',
          cancel: true,
          persistent: true,
        })
        .onCancel(() => {
          return;
        })
        .onOk(async () => {
          await UserService.removeOne(id);
          this.fetchData();
        });
    },
    resetForm() {
      this.form = {} as Partial<User>;
    },
  },
});
