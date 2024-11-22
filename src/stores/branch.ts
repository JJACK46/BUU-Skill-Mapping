import { defineStore } from 'pinia';
import { QTableProps } from 'quasar';
import { BranchService } from 'src/services/branches';
import { Branch } from 'src/types/branch';

export const useBranchStore = defineStore('branch', {
    state: () => ({
        form: {} as Branch,
        branches: <Branch[]>[],
        dialogState: false,
        pagination: {
            rowsPerPage: 10
        } as QTableProps['pagination']
    }),

    getters: {},
    actions: {
        async setup() {
            this.branches = (await BranchService.getAll()).data;
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
