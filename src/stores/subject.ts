import { defineStore } from 'pinia';
import { Dialog, Notify } from 'quasar';
import SkillService from 'src/services/skill';
import { SubjectService } from 'src/services/subject';
import type { FilterModel } from 'src/types/filter';
import type { Skill } from 'src/types/skill';
import type { Subject } from 'src/types/subject';
import { useRouter } from 'vue-router';
import { convertToPageParams, defaultPagination } from 'src/utils/pagination';

type TitleForm = 'New Subject' | 'Edit Subject';

export const useSubjectStore = defineStore('subject', {
  state: () => ({
    dialogState: false,
    subjects: <Subject[]>[],
    currsubjects: <Subject[]>[],
    form: <Partial<Subject>>{},
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
    getSubjectsByCu: (s) => s.currsubjects
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
        // this.form.skillExpectedLevels = [];
        // const ok = await CurriculumService.addSubject(this.curriculumId, this.form);
        const ok = await SubjectService.createOne(this.form);
        console.log(this.form)
        console.log(ok)
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'Subject created successfully',
          });
      }
      console.log(this.curriculumId)
      // this.subjects = (await SubjectService.getSubjectByCurriculums(this.curriculumId)).data;
      this.subjects = (await SubjectService.getAll()).data;
      this.dialogState = false;
      this.resetForm();
    },
    async fetchAllSkills() {
      this.skillOptions = (await SkillService.getAll()).data; // need to update for fetch only options
    },
    async fetchSubjectsByCurriculum(id: number) {
      this.currsubjects = (await SubjectService.getSubjectByCurriculums(id)).data;
      if (this.subjects) {
        console.log('fetch subjects')
      } else {
        console.log('Not found')
      }
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
    toggleDialog() {
      this.dialogState = !this.dialogState;
    },
    // handleClo(id: string) {
    //   // form.id.map(async (subject) => {
    //   //   const id = subject.id ?? 0;
    //   //   return await CloService.getOne(id);
    //   // })
    //   // this.router.push(`/${id}/clos`);
    // },
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
        subject: { code: this.form.code }, //at least subject id is required
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
  // async fetchCurriculumId() {
  //   try {
  //     if (this.form.subjects?.length) {
  //       const subjectsData = await Promise.all(
  //         this.form.subjects.map(async (subject) => {
  //           const id = subject.id ?? 0;
  //           return await SubjectService.getOne(id);
  //         }),
  //       );
  //       this.form.subjects = subjectsData;
  //       console.log('Updated Subjects:', this.form.subjects);
  //     } else {
  //       console.log('No subjects found.');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching subjects data:', error);
  //   }
  // },
  // async handleSave() {
  //   if (this.titleForm === 'Edit Subject') {
  //     const ok = await SubjectService.updateOne(this.form);
  //     if (ok)
  //       this.qNotify.create({
  //         type: 'ok',
  //         message: 'Subject updated successfully',
  //       });
  //   } else {
  //     const ok = await SubjectService.createOne(this.form);
  //     if (ok)
  //       this.qNotify.create({
  //         type: 'ok',
  //         message: 'Subject created successfully',
  //       });
  //   }
  //   console.log(this.curriculumId)
  //   this.subjects = (await SubjectService.getAll).data;
  //   this.dialogState = false;
  //   this.resetForm();
  // }
});
