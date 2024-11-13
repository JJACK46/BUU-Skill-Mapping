import { defineStore } from 'pinia';
import { UserService } from 'src/services/user';
import { User } from 'src/types/user';

export const useUserStore = defineStore('user', {
    state: () => ({
        form: {} as User,
        dialogState: false
    }),

    getters: {
    },
    actions: {
        toggleDialog() {
            this.dialogState = !this.dialogState
        },
        async handleSave() {
            await UserService.createOne(this.form)
        }
    },
});
