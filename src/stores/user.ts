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
        pagination: <QTableProps['pagination']>{
            sortBy: 'id',
            descending: false,
            page: 1,
            rowsPerPage: 10,
            rowsNumber: undefined
        },
        editMode: false
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
            const { data, total } = await UserService.getAll(ownPaging)
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
