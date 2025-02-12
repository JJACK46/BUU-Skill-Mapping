import { defineStore } from 'pinia';
import { Dialog, Notify } from 'quasar';
import { ClosService } from 'src/services/clos';
import { useSkillStore } from './skill';
import type { Clo } from 'src/types/clo';
import { convertToPageParams } from 'src/utils/pagination';
import { useCourseSpecStore } from './couse-spec';
import { useCurriculumStore } from './curriculum';

type TitleForm = 'New PLO' | 'Edit PLO';

export const useClostore = defineStore('clo', {
  state: () => ({
    dialogState: false,
    clos: [] as Clo[],
    form: <Partial<Clo>>{},
    tabsModel: 'req',
    editMode: true,
    titleForm: '' as TitleForm,
    search: '',
    qNotify: Notify,
    qDialog: Dialog,
    onlyHaveSubs: true,
    skillStore: useSkillStore(),
    courseStore: useCourseSpecStore(),
    currStore: useCurriculumStore(),
  }),
  getters: {
    // getData: (s) => s.courseStore.currStore.form.courseSpecs?.map((c) => c.clos) || [],
    getData: (s) =>
      s.courseStore.currStore.form.courseSpecs?.flatMap((spec) => spec.clos) ||
      [],

    // getSkills: (c) => c.form.skills || [],
    getDialogTitle: (s) => s.titleForm,
  },
  actions: {
    async fetchData() {
      const { data, total } = await ClosService.getAll(
        convertToPageParams(this.pagination, this.search),
      );
      this.clos = data;
      this.totalClos = total;
    },
    async handleOpenDialog(form?: Partial<Clo>) {
      console.log(this.currStore.form.courseSpecs);
      await this.skillStore.fetchData();
      if (form) {
        this.titleForm = 'Edit CLO';
        this.form = { ...form };
      } else {
        this.titleForm = 'New CLO';
        this.form = {};
      }
      this.dialogState = true;
    },
    // async fetchData() {
    //   this.courses = (await ClosService.getAll()).data;
    // },
    async createOne() {
      await ClosService.createOne(this.form as Clo);
      this.dialogState = false;
      window.location.reload();
    },
    async handleSave() {
      if (this.titleForm === 'Edit Clos') {
        const ok = await ClosService.updateOne(this.form);
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'Clos updated successfully',
          });
      } else {
        const ok = await ClosService.createOne(this.form);
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'Clos created successfully',
          });
      }
      this.subjects = (await ClosService.getAll()).data;
      this.dialogState = false;
      this.resetForm();
    },
    async removeOne(id: string) {
      await ClosService.removeOne(id);
      window.location.reload();
    },
  },
});
