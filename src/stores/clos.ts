import { defineStore } from 'pinia';
import { Dialog, Notify } from 'quasar';
import { ClosService } from 'src/services/clos';
import { useSkillStore } from './skill';
import type { Clo } from 'src/types/clo';
// import { convertToPageParams } from 'src/utils/pagination';
import { useSubjectStore } from './subject';
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
    courseStore: useSubjectStore(),
    currStore: useCurriculumStore(),
  }),
  getters: {
    getData: (c) => c.clos,
    getDialogTitle: (s) => s.titleForm,
  },
  actions: {
    async fetchData(id: number) {
      const { data, total } = await ClosService.getAllBySubject(id);
      if (total > 0) {
        this.clos = JSON.parse(JSON.stringify(data));
      }
    },
    async fetchOneData(id: number) {
      const data = await ClosService.getOne(id);
      this.form = data;
    },

    async handleOpenDialog(form?: Partial<Clo>) {
      await this.skillStore.fetchData();
      await this.plosStore.fetchAll();
      console.log(this.titleForm);
      if (form) {
        this.titleForm = 'Edit PLO';
        await this.fetchOneData(form.id || -1);
      } else {
        this.titleForm = 'New PLO';
        this.form = {};
      }
      this.dialogState = true;
    },
    async createOne() {
      const ok = await ClosService.createOne(this.form as Clo);
      if (ok) {
        const data = await ClosService.getAll(); // โหลดข้อมูลใหม่โดยไม่ต้องรีเฟรช
        if (data) {
          this.clos = JSON.parse(JSON.stringify(data));
        }
        this.dialogState = false;
        this.resetForm();
      }
    },
    async handleSave(subjectId: number) {
      console.log(this.titleForm);
      if (!this.form.plo || !this.form.skill) {
        return;
      }
      if (this.titleForm === 'Edit PLO') {
        const payload = {
          id: this.form.id,
          subjectId: subjectId,
          name: this.form.name,
          thaiDescription: this.form.thaiDescription,
          engDescription: this.form.engDescription,
          // expectedLevel: this.form.expectedLevel,
          ploId: this.form.plo.id,
          skillId: this.form.skill.id,
        } as Partial<Clo>;

        ClosService.updateOne(payload)
          .then((ok) => {
            if (ok)
              this.qNotify.create({
                type: 'ok',
                message: 'Clos updated successfully',
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const payload = {
          subjectId: subjectId,
          name: this.form.name,
          thaiDescription: this.form.thaiDescription,
          engDescription: this.form.engDescription,
          // expectedLevel: this.form.expectedLevel,
          ploId: this.form.plo.id,
          skillId: this.form.skill.id,
        } as Partial<Clo>;
        await ClosService.createOne(payload).then((ok) => {
          if (ok)
            this.qNotify.create({
              type: 'ok',
              message: 'Clos created successfully',
            });
        });
      }
      await this.fetchData(subjectId);
      this.dialogState = false;
      this.resetForm();
    },
    async removeOne(id: number) {
      await ClosService.removeOne(id);
      window.location.reload();
    },
    resetForm() {
      this.form = {};
    },
  },
});
