import { defineStore } from 'pinia';
import { CurriculumService } from 'src/services/curriculums';
import { Curriculum } from 'src/types/curriculum';

export const useCurriculumStore = defineStore('curriculum', {
    state: () => ({
        form: {} as Partial<Curriculum>,
        curriculums: [] as Curriculum[],
        dialogForm: false
    }),
    getters: {},
    actions: {
        async getCurriculums() {
            const res = await CurriculumService.getAll();
            this.curriculums = res;
        },
        toggleDialogForm(form?: Partial<Curriculum>) {
            if (form) {
                this.form = form
            }
            this.dialogForm = !this.dialogForm;
        }
    }
})