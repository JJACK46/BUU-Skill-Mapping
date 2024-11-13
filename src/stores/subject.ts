import { defineStore } from 'pinia';
import { QTableProps } from 'quasar';
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
    tabsModel: 'req',
    editMode: false,
    dialogTitle: 'New Subject',
    pagination: { 'rowsPerPage': 10 } as QTableProps['pagination']
  }),

  getters: {
    getSkillOptions: (s) => s.skillOptions,
    getDialogTitle: (s) => s.dialogTitle,
    getSubjects: (s) => s.subjects,
  },

  actions: {
    async setup() {
      this.subjects = await SubjectService.getAll();
    },
    async handleSave() {
      if (this.editMode) {
        await SubjectService.updateOne(this.form);
      } else {
        await SubjectService.createOne(this.form);
      }
      this.dialogState = false;
    },
    async fetchAllSkills() {
      this.skillOptions = await SkillService.getAll();
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
    removeSubject(id: string) {
      SubjectService.removeOne(id);
      // window.location.reload()
    }
  },
});
