import { defineStore } from 'pinia';
import { Dialog, Notify } from 'quasar';
import type { FilterModel } from 'src/types/filter';
import { useRouter } from 'vue-router';
// import { convertToPageParams, defaultPagination } from 'src/utils/pagination';
import type { CourseSpec } from 'src/types/course-spec';
// import { CurriculumService } from 'src/services/curriculums';
import { CourseSpecService } from 'src/services/couse-spec';
import { useCurriculumStore } from 'src/stores/curriculum';

import type { Subject } from 'src/types/subject';

type TitleForm = 'New Subject' | 'Edit Subject';

export const useCourseSpecStore = defineStore('course-spec', {
  state: () => ({
    dialogState: false,
    courseSpec: <CourseSpec[]>[],
    formCourseSpec: <Partial<CourseSpec>>{},
    formSubject: <Partial<Subject>>{},
    tabsModel: 'req',
    editMode: true,
    titleForm: '' as TitleForm,
    // pagination: defaultPagination,
    search: '',
    qNotify: Notify,
    qDialog: Dialog,
    filterModel: {} as Partial<FilterModel>,
    curriculumId: 0,
    router: useRouter(),
    currStore: useCurriculumStore(),
  }),
  getters: {
    getDialogTitle: (s) => s.titleForm,
    getData: (s) => s.currStore.form.courseSpecs,
  },
  actions: {
    async fetchData() {
      this.curriculumId = this.currStore.form.id
      if (!this.curriculumId) {
        console.error('curriculumId is undefined or invalid!');
        return;
      }
      try {
        this.currStore.form.courseSpecs = await CourseSpecService.fetchSubjectByCurriculums(
          this.curriculumId
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async handleSave() {
      if (this.titleForm === 'Edit Subject') {
        const ok = await CourseSpecService.updateOne(this.form);
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'Subject updated successfully',
          });
      } else {
        this.form.curriculumId = this.curriculumId;
        this.curriculumId = this.currStore.getInsertId;
        console.log(this.curriculumId);
        console.log('Before Create:', this.form);
        const ok = await CourseSpecService.createOne(this.form);
        console.log(ok);
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'Subject created successfully',
          });
      }
      console.log(this.curriculumId);
      // this.subjects = (await SubjectService.getSubjectByCurriculums(this.curriculumId)).data;
      this.courseSpec = (await CourseSpecService.getAll()).data;
      this.dialogState = false;
      this.resetForm();
    },
    // async fetchSubjectsByCurriculum(id: number) {
    //   this.courseSpec = (await SubjectService.getSubjectByCurriculums(id)).data;
    //   if (this.courseSpec) {
    //     console.log('fetch subjects')
    //   } else {
    //     console.log('Not found')
    //   }
    // },
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
          const ok = await CourseSpecService.removeOne(id);
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
      this.formSubject = {};
    },
  },
});
