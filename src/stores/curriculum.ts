import { defineStore } from 'pinia';
import { CurriculumService } from 'src/services/curriculums';
import { Curriculum } from 'src/types/curriculum';
import { PageParams } from 'src/types/pagination';
import { useRouter } from 'vue-router';

export const useCurriculumStore = defineStore('curriculum', {
    state: () => ({
        form: {} as Partial<Curriculum>,
        curriculums: [] as Curriculum[],
        pageParams: {
            page: 1,
            limit: 10,
        } as PageParams,
        dialogState: false
        ,
        router: useRouter()
    }),
    getters: {},
    actions: {
        async fetchData() {
            this.curriculums = (await CurriculumService.getAll(this.pageParams)).data;
        },
        toggleDialogForm(form?: Partial<Curriculum>) {
            if (form) {
                this.form = { ...form }
            }
            this.dialogState = !this.dialogState;
        },
        async handleSave() {
            await CurriculumService.createOne(this.form)
            this.router.push('/curriculums')
        }
    }
})