import { defineStore } from 'pinia';
import { Dialog, Notify } from 'quasar';
import { ClosService } from 'src/services/clos';
import type { Clo } from 'src/types/clo';
// import { convertToPageParams } from 'src/utils/pagination';
import { useSubjectStore } from './subject';
import { useCurriculumStore } from './curriculum';

type TitleForm = 'New CLO' | 'Edit CLO';

const initForm: Clo = {
  name: '',
  thaiDescription: '',
  engDescription: '',
  ploId: 0,
  cloId: 0,
  expectedLevel: 1,
};

export const useCloStore = defineStore('clo', {
  state: () => ({
    dialogState: false,
    clos: [] as Clo[],
    form: initForm,
    editMode: true,
    titleForm: '' as TitleForm,
    search: '',
    qNotify: Notify,
    qDialog: Dialog,
    onlyHaveSubs: true,
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
      if (form) {
        this.titleForm = 'Edit CLO';
        await this.fetchOneData(form.id || -1);
      } else {
        this.titleForm = 'New CLO';
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
      if (this.titleForm === 'Edit CLO') {
        const payload = {
          id: this.form.id,
          subjectId: subjectId,
          name: this.form.name,
          thaiDescription: this.form.thaiDescription,
          engDescription: this.form.engDescription,
          // expectedLevel: this.form.expectedLevel,
          ploId: this.form.ploId,
          skillId: this.form.skillId,
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
      await this.fetchData();
    },
    resetForm() {
      this.form = {};
    },
  },
});
