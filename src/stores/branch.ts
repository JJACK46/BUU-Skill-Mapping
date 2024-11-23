import { defineStore } from 'pinia';
import { BranchService } from 'src/services/branches';
import { Branch } from 'src/types/branch';
import { convertToPageParams, defaultPagination } from 'src/utils/pagination';

export const useBranchStore = defineStore('branch', {
    state: () => ({
        form: {} as Branch,
        branches: <Branch[]>[],
        dialogState: false,
        pagination: defaultPagination,
        search: ''
    }),

    getters: {},
    actions: {
        async fetchData() {
            this.branches = (await BranchService.getAll(convertToPageParams(this.pagination))).data;
        },
        async createOne() {
            BranchService.createOne(this.form as Branch);
            this.dialogState = false;
            this.branches = (await BranchService.getAll()).data;
        },
        async removeOne(id: number) {
            BranchService.removeOne(id);
            this.branches = (await BranchService.getAll()).data;
        },
        toggleDialog() {
            this.dialogState = !this.dialogState;
        },
        async handleSave() {
            await BranchService.createOne(this.form as Branch);
        }
    },
});
