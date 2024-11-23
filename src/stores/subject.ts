import { defineStore } from 'pinia';
import SkillService from 'src/services/skill';
import { SubjectService } from 'src/services/subject';
import { Skill } from 'src/types/skill';
import { Subject } from 'src/types/subject';
import { convertToPageParams, defaultPagination } from 'src/utils/pagination';

type TitleForm = 'New Subject' | 'Edit Subject'

export const useSubjectStore = defineStore('subject', {
  state: () => ({
    dialogState: false,
    subjects: <Subject[]>[],
    form: <Partial<Subject>>{},
    skillOptions: <Skill[]>[],
    tabsModel: 'req',
    editMode: true,
    dialogTitle: '' as TitleForm,
    pagination: defaultPagination
  }),
  getters: {
    getSkillOptions: (s) => s.skillOptions,
    getDialogTitle: (s) => s.dialogTitle,
    getSubjects: (s) => s.subjects,
  },
  actions: {
    async fetchData() {
      this.subjects = (await SubjectService.getAll(convertToPageParams(this.pagination))).data;
    },
    async handleSave() {
      if (this.editMode) {
        await SubjectService.updateOne(this.form);
      } else {
        await SubjectService.createOne(this.form);
      }
      this.subjects = (await SubjectService.getAll()).data;
      this.dialogState = false;
    },
    async fetchAllSkills() {
      this.skillOptions = (await SkillService.getAll()).data;
    },
    handleOpenDialog(form?: Partial<Subject>) {
      if (this.editMode && form) {
        this.dialogTitle = 'Edit Subject';
        this.form = form;
      } else {
        this.dialogTitle = 'New Subject';
        this.form = {};
      }
      this.dialogState = true;
    },
    async removeSubject(id: string) {
      await SubjectService.removeOne(id);
      this.subjects = (await SubjectService.getAll()).data;
    }
  },
});
