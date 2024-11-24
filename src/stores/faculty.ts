import { defineStore } from 'pinia';
import { Dialog } from 'quasar';
import { BranchService } from 'src/services/branches';
import { FacultyService } from 'src/services/faculty';
import { Branch } from 'src/types/branch';
import { Faculty } from 'src/types/faculty';
import { convertToPageParams, defaultPagination } from 'src/utils/pagination';

type TitleForm = 'New Faculty' | 'Edit Faculty' | 'New Branch' | 'Edit Branch';

export const useFacultyStore = defineStore('faculty', {
    state: () => ({
        formFaculty: {} as Partial<Faculty>,
        formBranch: {} as Partial<Branch>,
        faculties: [] as Faculty[],
        branches: [] as Branch[],
        dialogState: false,
        pagination: defaultPagination,
        search: '',
        titleForm: '' as TitleForm,
        qDialog: Dialog
    }),

    getters: {
        isFacultyForm: (state) => (state.titleForm === 'New Faculty' || state.titleForm === 'Edit Faculty'),
    },
    actions: {
        async fetchData() {
            this.faculties = (await FacultyService.getAll(convertToPageParams(this.pagination, this.search))).data;
        },
        async fetchDataBranch() {
            this.branches = (await BranchService.getAll(convertToPageParams(this.pagination, this.search))).data;
        },
        async removeOne(id: number) {
            FacultyService.removeOne(id);
            this.faculties = (await FacultyService.getAll()).data;
        },
        toggleDialog({ form, title }: { form?: Partial<Faculty> | Partial<Branch>, title?: TitleForm }) {
            if (form) {
                if ('branches' in form) {
                    this.titleForm = 'Edit Faculty';
                    this.formFaculty = { ...form } as Partial<Faculty>;
                } else {
                    this.titleForm = 'Edit Branch';
                    this.formBranch = { ...form } as Partial<Branch>;
                }
            } else {
                this.titleForm = title || 'New Faculty';
                this.resetForm();
            }
            this.dialogState = !this.dialogState;
        },
        async handleSave() {
            switch (this.titleForm) {
                case 'New Faculty':
                    await FacultyService.createOne(this.formFaculty);
                    break;
                case 'Edit Faculty':
                    await FacultyService.updateOne(this.formFaculty);
                    break
                case 'New Branch':
                    await BranchService.createOne({
                        faculty: this.formFaculty,
                        ...this.formBranch,
                    });
                    break;
                case 'Edit Branch':
                    await BranchService.updateOne(this.formBranch);
                    break;
                default:
                    break;
            }
            this.dialogState = false;
            this.fetchData()
        },
        handleRemove(id: string | number) {
            this.qDialog.create({
                title: 'Confirm',
                message: 'Are you sure you want to delete this item?',
                cancel: true,
                persistent: true
            }).onCancel(() => {
                return
            }).onOk(async () => {
                await FacultyService.removeOne(Number(id));
                this.fetchData()
            })
        },
        resetForm() {
            this.formFaculty = {} as Partial<Faculty>;
            this.formBranch = {} as Partial<Branch>;
        },
    },
});
