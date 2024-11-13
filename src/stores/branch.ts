import { defineStore } from 'pinia';
import { BranchService } from 'src/services/branches';
import { Branch } from 'src/types/branch';

export const useBranchStore = defineStore('branch', {
    state: () => ({
        form: {} as Branch,
        branches: <Branch[]>[],
        dialogState: false,
        loading: false,
    }),

    getters: {},
    actions: {
        async setup() {
            this.loading = true;
            this.branches = await BranchService.getAll();
            this.loading = false;
        },
        async createOne() {
            BranchService.createOne(this.form as Branch);
            this.dialogState = false;
            window.location.reload();
        },
        async removeOne(id: number) {
            BranchService.removeOne(id);
            window.location.reload();
        },
        toggleDialog() {
            this.dialogState = !this.dialogState;
        },
        async handleSave() {
            await BranchService.createOne(this.form as Branch);
        }
    },
});
