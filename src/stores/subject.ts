import { defineStore } from 'pinia';
import { Dialog, Notify } from 'quasar';
import SkillService from 'src/services/skill';
import { SubjectService } from 'src/services/subject';
import type { Skill } from 'src/types/skill';
import type { Subject } from 'src/types/subject';
import { convertToPageParams, defaultPagination } from 'src/utils/pagination';

type TitleForm = 'New Subject' | 'Edit Subject';

export const useSubjectStore = defineStore('subject', {
  state: () => ({
    dialogState: false,
    subjects: <Subject[]>[],
    form: <Partial<Subject>>{},
    skillOptions: <Skill[]>[],
    tabsModel: 'req',
    editMode: true,
    titleForm: '' as TitleForm,
    pagination: defaultPagination,
    search: '',
    qNotify: Notify,
    qDialog: Dialog,
  }),
  getters: {
    getSkillOptions: (s) => s.skillOptions,
    getDialogTitle: (s) => s.titleForm,
    getSubjects: (s) => s.subjects,
  },
  actions: {
    async fetchData() {
      this.subjects = (
        await SubjectService.getAll(
          convertToPageParams(this.pagination, this.search),
        )
      ).data;
    },
    async handleSave() {
      if (this.titleForm === 'Edit Subject') {
        const ok = await SubjectService.updateOne(this.form);
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'Subject updated successfully',
          });
      } else {
        const ok = await SubjectService.createOne(this.form);
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'Subject created successfully',
          });
      }
      this.subjects = (await SubjectService.getAll()).data;
      this.dialogState = false;
      this.resetForm();
    },
    async fetchAllSkills() {
      this.skillOptions = (await SkillService.getAll()).data; // need to update for fetch only options
    },
    handleOpenDialog(form?: Partial<Subject>) {
      if (form) {
        this.titleForm = 'Edit Subject';
        this.form = { ...form };
      } else {
        this.titleForm = 'New Subject';
        this.form = {};
      }
      this.dialogState = true;
    },
    async removeSubject(id: string) {
      this.qDialog
        .create({
          title: 'Confirm',
          message: 'Are you sure you want to remove this subject?',
          cancel: true,
          persistent: true,
        })
        .onCancel(() => {
          return;
        })
        .onOk(async () => {
          const ok = await SubjectService.removeOne(id);
          if (ok) {
            this.qNotify.create({
              type: 'ok',
              message: 'Subject removed successfully',
            });
            this.fetchData();
          }
        });
    },
    resetForm() {
      this.form = {};
    },
    handleAddSkill() {
      this.form.skillExpectedLevels = this.form.skillExpectedLevels || [];
      this.form.skillExpectedLevels.push({
        subject: { id: this.form.id }, //at least subject id is required
        expectedLevel: 1,
      });
    },
    handleRemoveSkill(index: number) {
      this.form.skillExpectedLevels?.splice(index, 1);
    },
    handleDuplicate() {
      if (!this.form.skillExpectedLevels?.length) return;

      const ids = new Set();
      const newSkills = this.form.skillExpectedLevels.filter((s) => {
        const isDupe = ids.has(s.skill?.id);
        ids.add(s.skill?.id);
        return !isDupe;
      });

      this.form.skillExpectedLevels = newSkills;
    },
  },
});
