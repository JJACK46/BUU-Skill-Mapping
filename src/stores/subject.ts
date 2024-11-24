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
    pagination: defaultPagination,
    search: '',
  }),
  getters: {
    getSkillOptions: (s) => s.skillOptions,
    getDialogTitle: (s) => s.dialogTitle,
    getSubjects: (s) => s.subjects,
  },
  actions: {
    async fetchData() {
      this.subjects = (await SubjectService.getAll(convertToPageParams(this.pagination, this.search))).data;
    },
    async handleSave() {
      if (this.form) {
        await SubjectService.updateOne(this.form);
      } else {
        await SubjectService.createOne(this.form);
      }
      this.subjects = (await SubjectService.getAll()).data;
      this.dialogState = false;
      this.resetForm()
    },
    async fetchAllSkills() {
      this.skillOptions = (await SkillService.getAll()).data; // need to update for fetch only options
    },
    handleOpenDialog(form?: Partial<Subject>) {
      if (form) {
        this.dialogTitle = 'Edit Subject';
        this.form = { ...form };
      } else {
        this.dialogTitle = 'New Subject';
        this.form = {};
      }
      this.dialogState = true;
    },
    async removeSubject(id: string) {
      await SubjectService.removeOne(id);
      this.fetchData()
    },
    resetForm() {
      this.form = {};
    },
  },
});
