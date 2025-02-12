import { defineStore } from 'pinia';
import { Dialog, Notify } from 'quasar';
import { ClosService } from 'src/services/clos';
import { useSkillStore } from './skill';
import type { Clo } from 'src/types/clo';
import { convertToPageParams } from 'src/utils/pagination';
import { useCourseSpecStore } from './course-spec';
import { useCurriculumStore } from './curriculum';
import { usePlostore } from './plosmouckup';

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
    plosStore: usePlostore(),
    courseStore: useCourseSpecStore(),
    currStore: useCurriculumStore(),
  }),
  getters: {
    getData: (s) =>
      s.courseStore.currStore.form.courseSpecs?.flatMap((spec) => spec.clos) ||
      [],

    // getData: (s) =>
    //   s.courseStore.currStore.form.courseSpecs
    //     ?.filter(
    //       (spec) =>
    //         spec.subject.id ===
    //         s.courseStore.currStore.form.courseSpecs.find(
    //           (spec) => spec.subject.id === s.currStore.form.id,
    //         )?.subject.id,
    //     ) // อ้างถึง subject.id
    //     .flatMap((spec) => spec.clos) || [],

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
      await this.skillStore.fetchData();
      await this.plosStore.fetchData();
      console.log(this.plosStore.plos);

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
    async handleSave(payload: object) {
      if (this.titleForm === 'Edit Clos') {
        const ok = await ClosService.updateOne(payload);
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'Clos updated successfully',
          });
      } else {
        const ok = await ClosService.createOne(payload);
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
    async removeOne(id: number) {
      await ClosService.removeOne(id.toString());
      window.location.reload();
    },
    resetForm() {
      this.form = {};
      this.fetchData();
    },
  },
});
