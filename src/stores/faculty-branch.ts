import { defineStore } from 'pinia';
import type { QTreeNode } from 'quasar';
import { Dialog, Notify } from 'quasar';
import { BranchService } from 'src/services/branch';
import { FacultyService } from 'src/services/faculty';
import type { Branch } from 'src/types/branch';
import type { Faculty } from 'src/types/faculty';
import {
  calMaxPage,
  convertToPageParams,
  defaultPagination,
} from 'src/utils/pagination';

type TitleForm = 'New Faculty' | 'Edit Faculty' | 'New Branch' | 'Edit Branch';

export const useFacultyStore = defineStore('faculty', {
  state: () => ({
    formFaculty: {} as Partial<Faculty>,
    formBranch: {} as Partial<Branch>,
    faculties: [] as Faculty[],
    dialogState: false,
    pagination: defaultPagination,
    search: '',
    titleForm: '' as TitleForm,
    qDialog: Dialog,
    qNotify: Notify,
  }),
  getters: {
    getMaxPage: (s) =>
      calMaxPage(s.pagination?.rowsNumber, s.pagination?.rowsPerPage),
    isFacultyForm: (state) =>
      state.titleForm === 'New Faculty' || state.titleForm === 'Edit Faculty',
    getNodes: (state): QTreeNode[] => {
      if (state.faculties) {
        return state.faculties.map((faculty: Faculty) => {
          const { branch, ...rest } = faculty;
          return {
            ...rest,
            isFaculty: true,
            children:
              branch &&
              branch.map((branch: Branch) => ({
                ...branch,
                children: [],
              })),
          };
        });
      }
      return [];
    },
    getFaculties: (s) => s.faculties,
    getJsonForm: (state) => {
      if (
        state.titleForm === 'New Faculty' ||
        state.titleForm === 'Edit Faculty'
      ) {
        return state.formFaculty;
      } else {
        return state.formBranch;
      }
    },
  },
  actions: {
    async fetchData() {
      const res = await FacultyService.getAll(
        convertToPageParams(this.pagination, this.search),
      );
      if (res.data) {
        this.faculties = res.data;
      }
    },
    async removeOne(id: string) {
      await FacultyService.removeOne(id);
      this.faculties = (await FacultyService.getAll()).data;
    },
    toggleDialog({
      form,
      title,
    }: {
      form?: Partial<Faculty> | Partial<Branch>;
      title?: TitleForm;
    }) {
      if (form) {
        if (this.isFaculty(form)) {
          this.titleForm = 'Edit Faculty';
          this.formFaculty = { ...form } as Partial<Faculty>;
        } else {
          this.titleForm = 'Edit Branch';
          this.formBranch = { ...form } as Partial<Branch>;
        }
        // click on name of faculty
        if (title === 'New Branch') {
          this.titleForm = title;
          //init facultyId
          const braForm = {
            facultyId: form.id,
          } as Partial<Branch>;
          this.formBranch = braForm;
        }
      } else {
        this.titleForm = title || 'New Faculty';
        this.resetForm();
      }
      this.dialogState = !this.dialogState;
    },
    async handleSave() {
      let text = '';
      switch (this.titleForm) {
        case 'New Faculty':
          await FacultyService.createOne(this.formFaculty);
          text = 'Faculty created successfully';
          break;
        case 'Edit Faculty':
          await FacultyService.updateOne(this.formFaculty);
          text = 'Faculty updated successfully';
          break;
        case 'New Branch':
          await BranchService.createOne(this.formBranch);
          text = 'Branch created successfully';
          break;
        case 'Edit Branch':
          await BranchService.updateOne(this.formBranch);
          text = 'Branch updated successfully';
          break;
        default:
          break;
      }
      this.qNotify.create({
        type: 'ok',
        message: text,
      });
      this.dialogState = false;
      await this.fetchData();
      // this.fetchDataBranch()
    },
    handleRemove({
      id,
      node,
    }: {
      id: string;
      node: Partial<Faculty> | Partial<Branch>;
    }) {
      this.qDialog
        .create({
          title: 'Confirm',
          message: `Are you sure you want to delete this <div class="text-red text-bold col-12">${node.engName} ?</div>`,
          html: true,
          cancel: true,
          persistent: true,
        })
        .onCancel(() => {
          return;
        })
        .onOk(() => {
          const remove = async () => {
            if ('branch' in node) {
              await FacultyService.removeOne(id);
            } else {
              await BranchService.removeOne(id);
            }
            await this.fetchData();
          };
          remove()
            .then()
            .catch((err) => {
              this.qNotify.create({
                type: 'negative',
                message: err.message,
              });
            });
        });
    },
    resetForm() {
      this.formFaculty = {} as Partial<Faculty>;
      this.formBranch = {} as Partial<Branch>;
    },

    isFaculty(
      form: Partial<Faculty> | Partial<Branch>,
    ): form is Partial<Faculty> {
      return (form as Partial<Faculty>).branch !== undefined;
    },
  },
});
