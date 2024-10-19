import { defineStore } from 'pinia';
import SkillService from 'src/services/skill';
import { SubjectService } from 'src/services/subject';
import { Skill } from 'src/types/skill';
import { Subject } from 'src/types/subject';

export const useSubjectStore = defineStore('subject', {
  state: () => ({
    dialogState: false,
    subjects: <Subject[]>[],
    form: <Partial<Subject>>{},
    skillOptions: <Skill[]>[],
  }),

  getters: {},

  actions: {
    async setup() {
      this.subjects = await SubjectService.getAll();
    },
    async handleSave() {
      await SubjectService.createOne(this.form);
      this.dialogState = false;
    },
    async fetchAllSkills() {
      this.skillOptions = await SkillService.getAll();
    },
  },
});
