import { defineStore } from 'pinia';
import { Dialog, Notify } from 'quasar';
import { ClosService } from 'src/services/clos';
import { useSkillStore } from './skill';
import type { Clo } from 'src/types/clo';
// import { convertToPageParams } from 'src/utils/pagination';
import { useCourseSpecStore } from './subject';
import { useCurriculumStore } from './curriculum';
import { usePloStore } from './plo';

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
    plosStore: usePloStore(),
    courseStore: useCourseSpecStore(),
    currStore: useCurriculumStore(),
  }),
  getters: {
    // getData: (s) =>
    //   s.courseStore.currStore.form.courseSpecs?.flatMap((spec) => spec.clos) ||
    //   [],
    getData: (c) => c.clos,
    getDialogTitle: (s) => s.titleForm,
  },
  actions: {
    // async fetchData() {
    //   const { data, total } = await ClosService.getAll(
    //     convertToPageParams(this.pagination, this.search),
    //   );
    //   this.clos = data;
    //   this.totalClos = total;
    // },

    async fetchDataByCoursSpec(id: number) {
      const data = await ClosService.getAllByCourseSpec(id.toString());
      this.clos = data;
    },
    async fetchOneData(id: number) {
      const data = await ClosService.getOne(id.toString());
      this.form = data;
    },

    async handleOpenDialog(form?: Partial<Clo>) {
      await this.skillStore.fetchData();
      await this.plosStore.fetchDataplos();
      console.log(this.titleForm);
      if (form) {
        this.titleForm = 'Edit CLO';
        await this.fetchOneData(form.id);
      } else {
        this.titleForm = 'New CLO';
        this.form = {};
      }
      this.dialogState = true;
    },
    async createOne() {
      const ok = await ClosService.createOne(this.form as Clo);
      if (ok) {
        this.clos = await ClosService.getAll(); // โหลดข้อมูลใหม่โดยไม่ต้องรีเฟรช
        this.dialogState = false;
        this.resetForm();
      }
    },
    async handleSave(courseSpecId: number) {
      console.log(this.titleForm);
      if (this.titleForm === 'Edit CLO') {
        const payload = {
          id: this.form.id,
          courseSpecId: courseSpecId,
          name: this.form.name,
          thaiDescription: this.form.thaiDescription,
          engDescription: this.form.engDescription,
          // expectedLevel: this.form.expectedLevel,
          ploId: this.form.plo.id,
          skillId: this.form.skill.id,
        };

        const ok = await ClosService.updateOne(payload);
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'Clos updated successfully',
          });
      } else {
        const payload = {
          courseSpecId: courseSpecId,
          name: this.form.name,
          thaiDescription: this.form.thaiDescription,
          engDescription: this.form.engDescription,
          // expectedLevel: this.form.expectedLevel,
          ploId: this.form.plo.id,
          skillId: this.form.skill.id,
        };
        const ok = await ClosService.createOne(payload);
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'Clos created successfully',
          });
      }
      this.fetchDataByCoursSpec(courseSpecId);
      this.dialogState = false;
      this.resetForm();
    },
    async removeOne(id: number) {
      await ClosService.removeOne(id.toString());
      window.location.reload();
    },
    resetForm() {
      this.form = {};
    },
  },
});
