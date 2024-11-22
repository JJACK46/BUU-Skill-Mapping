import { defineStore } from 'pinia';
import { CurriculumService } from 'src/services/curriculums';
import { Curriculum } from 'src/types/curriculum';
import { PageParams } from 'src/types/pagination';

export const useCurriculumStore = defineStore('curriculum', {
    state: () => ({
        form: {} as Partial<Curriculum>,
        curriculums: [] as Curriculum[],
        pageParams: {
            page: 1,
            limit: 10,
        } as PageParams,
        dialogForm: false
    }),
    getters: {},
    actions: {
        async getCurriculums() {
            this.curriculums = (await CurriculumService.getAll(this.pageParams)).data;
        },
        toggleDialogForm(form?: Partial<Curriculum>) {
            if (form) {
                this.form = form
            }
            this.dialogForm = !this.dialogForm;
        }
    }
})