import { defineStore } from 'pinia';
import { QTableProps } from 'quasar';
import { UserService } from 'src/services/user';
import { PageParams } from 'src/types/pagination';
import { User } from 'src/types/user';

export const useUserStore = defineStore('user', {
    state: () => ({
        form: {} as User,
        users: <User[]>[],
        dialogState: false,
        search: '',
        pagination: {
            rowsPerPage: 10
        } as QTableProps['pagination']
    }),

    getters: {
    },
    actions: {
        async fetchData(params: QTableProps['pagination']) {
            const ownPaging = {
                page: params?.page || 1,
                limit: params?.rowsPerPage || 10,
                sort: params?.sortBy || '',
                order: params?.descending ? 'DESC' : 'ASC',
                search: this.search || '',
            } as PageParams
            this.users = await UserService.getAllByPage(ownPaging)
        },
        toggleDialog() {
            this.dialogState = !this.dialogState
        },
        async handleSave() {
            await UserService.createOne(this.form)
        }
    },
});
