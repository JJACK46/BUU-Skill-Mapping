import { defineStore } from 'pinia';
import { QTableProps } from 'quasar';
import { UserService } from 'src/services/user';
import { User } from 'src/types/user';
import { convertToPageParams, defaultPagination } from 'src/utils/pagination';

export const useUserStore = defineStore('user', {
    state: () => ({
        form: {} as User,
        users: <User[]>[],
        dialogState: false,
        search: '',
        pagination: defaultPagination,
        editMode: false
    }),

    getters: {
    },
    actions: {
        async fetchData(params: QTableProps['pagination']) {
            const { data, total } = await UserService.getAll(convertToPageParams(params))
            this.users = data
            this.pagination = { ...this.pagination, rowsNumber: total }
        },

        toggleDialog() {
            this.dialogState = !this.dialogState
        },
        async handleSave(newForm?: Partial<User>) {
            if (this.editMode && newForm) {
                await UserService.updateOne(newForm)
            } else {
                await UserService.createOne(this.form)
            }
            await UserService.getAll()
        }
    },
});
