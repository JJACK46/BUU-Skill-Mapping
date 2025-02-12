import { defineStore } from 'pinia';
import { Dialog, Notify } from 'quasar';
import { CurriculumService } from 'src/services/curriculums';
import type { Curriculum } from 'src/types/curriculum';
import type { FilterModel } from 'src/types/filter';
import { convertToPageParams, defaultPagination } from 'src/utils/pagination';
import { useRouter } from 'vue-router';
type TitleForm = 'New Curriculum' | 'Edit Curriculum';
export const useCurriculumStore = defineStore('curriculum', {
  state: () => ({
    form: {} as Partial<Curriculum>,
    curriculums: [] as Curriculum[],
    curriculumsOptions: <Curriculum[]>[],
    pagination: defaultPagination,
    dialogState: false,
    tabsModel: 'main',
    titleForm: '' as TitleForm,
    router: useRouter(),
    search: '',
    filterModel: {} as Partial<FilterModel>,
  }),
  getters: {
    getCurriculums: (c) => c.curriculums,
    getDialogTitle: (c) => c.titleForm,
    getInsertId: (c) => c.form.id,
    getSkills: (c) => {
      return c.form.skills?.map((skill, index) => ({ ...skill, index })) || [];
    },
    getCurriculum: (c) => c.form,
    getListSubject: (c) => c.form.courseSpecs?.flatMap((c) => c.subject) || [],
    getListCourseSpec: (c) => c.form.courseSpecs,
  },
  actions: {
    async fetchOne(id: string) {
      const res = await CurriculumService.getOneByCode(id);
      this.form = res;
    },
    async fetchAll() {
      const { data, total } = await CurriculumService.getAll(
        convertToPageParams(this.pagination, this.search, this.filterModel),
      );
      this.curriculums = data;
      this.pagination!.rowsNumber = total || 0;
    },

    async fetchAllCurriculums() {
      this.curriculumsOptions = (await CurriculumService.getAll()).data;
    },
    toggleDialogForm(form?: Partial<Curriculum>) {
      if (form) {
        this.titleForm = 'Edit Curriculum';
        this.form = { ...form };
      } else {
        this.titleForm = 'New Curriculum';
        this.form = {};
      }
      this.dialogState = !this.dialogState;
    },
    async handleCreateOne() {
      const ok = await CurriculumService.createOne(this.form);
      if (ok) {
        Notify.create({
          type: 'ok',
          message: 'Curriculum created successfully',
        });
        this.dialogState = false;
        this.resetForm();
      }
    },

    async handleSave() {
      const ok = await CurriculumService.updateOne(this.form);
      if (ok) {
        Notify.create({
          type: 'ok',
          message: 'Curriculum saved successfully',
        });
        this.router.push('/administer/curriculums');
        this.dialogState = false;
        setTimeout(() => {
          this.resetForm();
        }, 1000);
      }
    },
    handleDelete(id: number) {
      Dialog.create({
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this curriculum?',
        cancel: true,
        persistent: true,
      }).onOk(() => this.removeCurriculum(id));
    },
    async removeCurriculum(id: number) {
      const ok = await CurriculumService.removeOne(id);
      if (ok) {
        Notify.create({
          type: 'ok',
          message: 'Curriculum removed successfully',
        });
        this.fetchData();
      }
    },
    resetForm() {
      this.form = {};
    },
  },
});
