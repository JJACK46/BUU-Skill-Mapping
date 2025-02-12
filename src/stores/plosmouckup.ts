import { defineStore } from 'pinia';
import { Dialog, Notify } from 'quasar';
import { PlosService } from 'src/services/plosmockup';
import { useSkillStore } from './skill';
import type { Plo } from 'src/types/plo';
import { convertToPageParams } from 'src/utils/pagination';
import { useCourseSpecStore } from './couse-spec';
import { useCurriculumStore } from './curriculum';

type TitleForm = 'New PLO' | 'Edit PLO';

export const usePlostore = defineStore('plo', {
  state: () => ({
    dialogState: false,
    plos: [] as Plo[],
    form: <Partial<Plo>>{},
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
    // getData: (s) => s.courseStore.currStore.form.courseSpecs?.map((c) => c.plos) || [],
    getData: (s) => s.courseStore.currStore.form.plos || [],

    // getSkills: (c) => c.form.skills || [],
    getDialogTitle: (s) => s.titleForm,
  },
  actions: {
    async fetchData() {
      const { data, total } = await PlosService.getAll(
        convertToPageParams(this.pagination, this.search),
      );
      this.plos = data;
      this.totalPlos = total;
      console.log(this.plos);
    },

    async createOne() {
      await PlosService.createOne(this.form as Plo);
      this.dialogState = false;
      window.location.reload();
    },
    async handleSave() {
      if (this.titleForm === 'Edit Plos') {
        const ok = await PlosService.updateOne(this.form);
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'Plos updated successfully',
          });
      } else {
        const ok = await PlosService.createOne(this.form);
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'Plos created successfully',
          });
      }
      this.subjects = (await PlosService.getAll()).data;
      this.dialogState = false;
      this.resetForm();
    },
    async removeOne(id: string) {
      await PlosService.removeOne(id);
      window.location.reload();
    },
  },
});
