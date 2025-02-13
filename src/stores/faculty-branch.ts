import { defineStore } from 'pinia';
import { Dialog, Notify } from 'quasar';
import { BranchService } from 'src/services/branches';
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
    getNodes: (state) => {
      return state.faculties.map((faculty) => {
        const { branches, ...rest } = faculty;
        return {
          ...rest,
          isFaculty: true,
          children: branches.map((branch) => ({ ...branch, children: [] })),
        };
      });
    },
  },
  actions: {
    async fetchData() {
      this.faculties = (
        await FacultyService.getAll(
          convertToPageParams(this.pagination, this.search),
        )
      ).data;
    },
    // async fetchDataBranch() {
    //     this.branches = (await BranchService.getAll(convertToPageParams(this.pagination, this.search))).data;
    // },
    async removeOne(id: string) {
      FacultyService.removeOne(id);
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
        if ('branches' in form) {
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
          const braForm = { faculty: { ...form } } as Partial<Branch>;
          this.formBranch = braForm;
        }
      } else {
        this.titleForm = title || 'New Faculty';
        this.resetForm();
      }
      this.dialogState = !this.dialogState;
    },
    async handleSave() {
      let ok = false;
      let text = '';
      switch (this.titleForm) {
        case 'New Faculty':
          ok = await FacultyService.createOne(this.formFaculty);
          text = 'Faculty created successfully';
          break;
        case 'Edit Faculty':
          ok = await FacultyService.updateOne(this.formFaculty);
          text = 'Faculty updated successfully';
          break;
        case 'New Branch':
          ok = await BranchService.createOne(this.formBranch);
          text = 'Branch created successfully';
          break;
        case 'Edit Branch':
          ok = await BranchService.updateOne(this.formBranch);
          text = 'Branch updated successfully';
          break;
        default:
          break;
      }
      if (ok) {
        this.qNotify.create({
          type: 'ok',
          message: text,
        });
        this.dialogState = false;
        this.fetchData();
        // this.fetchDataBranch()
      }
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
        .onOk(async () => {
          if ('branches' in node) {
            await FacultyService.removeOne(id);
          } else {
            await BranchService.removeOne(id);
          }
          this.fetchData();
        });
    },
    resetForm() {
      this.formFaculty = {} as Partial<Faculty>;
      this.formBranch = {} as Partial<Branch>;
    },
  },
});
