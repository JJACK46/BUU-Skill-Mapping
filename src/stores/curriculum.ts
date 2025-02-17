import { defineStore } from 'pinia';
import { Dialog, Notify } from 'quasar';
import { CurriculumService } from 'src/services/curriculums';
import type { Curriculum } from 'src/types/curriculum';
import type { FilterModel } from 'src/types/filter';
import { convertToPageParams, defaultPagination } from 'src/utils/pagination';
type TitleForm = 'New Curriculum' | 'Edit Curriculum';
export const useCurriculumStore = defineStore('curriculum', {
  state: () => ({
    form: {} as Partial<Curriculum>,
    curriculums: <Curriculum[]>[],
    curriculumsOptions: <Curriculum[]>[],
    pagination: defaultPagination,
    dialogState: false,
    search: '',
    titleForm: '' as TitleForm,
    filterModel: {} as Partial<FilterModel>,
    foundExistCurriculum: false,
    codeLabeL: '',
  }),
  getters: {
    getCurriculumCodeLabel: (c) => c.codeLabeL,
    getCurriculums: (c) => c.curriculums,
    getDialogTitle: (c) => c.titleForm,
    getInsertId: (c) => c.form.id,
    getCode: (c) => c.form.code,
    getSkills: (c) => {
      return c.form.skills?.map((skill, index) => ({ ...skill, index })) || [];
    },
    getCurriculum: (c) => c.form,
    getListSubject: (c) => c.form.courseSpecs?.flatMap((c) => c.lesson) || [],
    getListCourseSpec: (c) => c.form.courseSpecs,
    getBranchThaiName: (c) => c.form.branch?.thaiName,
  },
  actions: {
    async fetchOne(id: string) {
      const res = await CurriculumService.getOneByCode(id);
      this.form = res;
    },
    async fetchAll() {
      try {
        const { data, total } = await CurriculumService.getAll(
          convertToPageParams(this.pagination, this.search, this.filterModel),
        );
        if (total > 0) {
          this.curriculums = data;
          this.pagination!.rowsNumber = total || 0;
        }
      } catch (error) {
        console.error('❌', error);
      }
    },
    toggleDialogForm(form?: Partial<Curriculum>) {
      if (form) {
        this.titleForm = 'Edit Curriculum';
        this.form = { ...form };
      } else {
        this.titleForm = 'New Curriculum';
        this.form = {} as Partial<Curriculum>;
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
        await this.fetchAll();
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
      }).onOk(async () => {
        const ok = await CurriculumService.removeOne(id);
        if (ok) {
          Notify.create({
            type: 'ok',
            message: 'Curriculum removed successfully',
          });
          await this.fetchOne();
        }
      });
    },

    async checkUpdateCode(val: string) {
      if (val.length === 14) {
        const exist = await CurriculumService.getOneByCode(this.form.code);
        if (exist) {
          this.codeLabeL = 'This code already exists';
          this.foundExistCurriculum = true;
        } else {
          this.codeLabeL = 'Available code';
          this.foundExistCurriculum = false;
        }
      }
    },

    resetForm() {
      this.form = {} as Partial<Curriculum>;
    },
  },
});
