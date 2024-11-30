import { defineStore } from 'pinia';
import { CurriculumService } from 'src/services/curriculums';
import { Curriculum } from 'src/types/curriculum';
import { PageParams } from 'src/types/pagination';
import { useRouter } from 'vue-router';
type TitleForm = 'Edit Curriculum';
export const useCurriculumStore = defineStore('curriculum', {
  state: () => ({
    form: {} as Partial<Curriculum>,
    curriculums: [] as Curriculum[],
    curriculumsOptions: <Curriculum[]>[],
    pageParams: {
      page: 1,
      limit: 10,
    } as PageParams,
    dialogState: false,
    tabsModel: 'req',
    titleForm: '' as TitleForm,
    router: useRouter(),
  }),
  getters: {
    getCurriculums: (c) => c.curriculums,
    getDialogTitle: (c) => c.titleForm,
  },
  actions: {
    async fetchData() {
      this.curriculums = (await CurriculumService.getAll(this.pageParams)).data;
    },

    async fetchAllCurriculums() {
      this.curriculumsOptions = (await CurriculumService.getAll()).data;
    },
    toggleDialogForm(form?: Partial<Curriculum>) {
      if (form) {
        this.form = { ...form };
      }
      this.dialogState = !this.dialogState;
    },

    async handleSave() {
      await CurriculumService.createOne(this.form);
      this.router.push('/curriculums');
      this.dialogState = false;
      this.resetForm();
    },

    handleOpenDialog(form?: Partial<Curriculum>) {
      this.dialogState = true;
      this.titleForm = 'Edit Curriculum';
      this.form = { ...form };
    },
    async removeCurriculum(id: string) {
      await CurriculumService.removeOne(id);
      this.fetchData();
    },
    resetForm() {
      this.form = {};
    },
  },
});
