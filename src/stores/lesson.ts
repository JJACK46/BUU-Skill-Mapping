import { defineStore } from 'pinia';
import { Dialog, Notify } from 'quasar';
import { LessonService } from 'src/services/lesson';
import type { FilterModel } from 'src/types/filter';
import type { Skill } from 'src/types/skill';
import type { Lesson } from 'src/types/lesson';
import { useRouter } from 'vue-router';
import { convertToPageParams, defaultPagination } from 'src/utils/pagination';

type TitleForm = 'New Subject' | 'Edit Subject';

export const useLessonStore = defineStore('lesson', {
  state: () => ({
    dialogState: false,
    subjects: <Lesson[]>[],
    currsubjects: <Lesson[]>[],
    form: <Partial<Lesson>>{},
    skillOptions: <Skill[]>[],
    tabsModel: 'req',
    editMode: true,
    titleForm: '' as TitleForm,
    pagination: defaultPagination,
    search: '',
    qNotify: Notify,
    qDialog: Dialog,
    filterModel: {} as Partial<FilterModel>,
    curriculumId: 0,
    router: useRouter(),
  }),
  getters: {
    getSkillOptions: (s) => s.skillOptions,
    getDialogTitle: (s) => s.titleForm,
    getSubjects: (s) => s.subjects,
    getSubjectsByCu: (s) => s.currsubjects,
  },
  actions: {
    async fetchData() {
      const data = await LessonService.getAll(
        convertToPageParams(this.pagination, this.search),
      );
      this.subjects = JSON.parse(JSON.stringify(data));
    },
    async handleSave() {
      if (this.titleForm === 'Edit Subject') {
        const ok = await LessonService.updateOne(this.form);
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'Subject updated successfully',
          });
      } else {
        // this.form.skillExpectedLevels = [];
        // const ok = await CurriculumService.addSubject(this.curriculumId, this.form);
        const ok = await LessonService.createOne(this.form);
        console.log(this.form);
        console.log(ok);
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'Subject created successfully',
          });
      }
      console.log(this.curriculumId);
      // this.subjects = (await SubjectService.getSubjectByCurriculums(this.curriculumId)).data;
      await this.fetchData();
      this.dialogState = false;
      this.resetForm();
    },
    async fetchSubjectsByCurriculum(id: number) {
      this.currsubjects = (
        await LessonService.getSubjectByCurriculums(id)
      ).data;
      if (this.subjects) {
        console.log('fetch subjects');
      } else {
        console.log('Not found');
      }
    },
    handleOpenDialog(form?: Partial<Lesson>) {
      if (form) {
        this.titleForm = 'Edit Subject';
        this.form = { ...form };
      } else {
        this.titleForm = 'New Subject';
        this.form = {};
      }
      this.dialogState = true;
    },
    toggleDialog() {
      this.dialogState = !this.dialogState;
    },

    removeSubject(id: string) {
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
        .onOk(() => {
          LessonService.removeOne(id)
            .then(async (ok) => {
              if (ok) {
                this.qNotify.create({
                  type: 'ok',
                  message: 'Subject removed successfully',
                });
                await this.fetchData();
              }
            })
            .catch((err) => {
              console.error(err);
            });
        });
    },
    resetForm() {
      this.form = {};
    },
  },
});
