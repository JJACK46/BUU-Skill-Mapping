import { defineStore } from 'pinia';
import { Dialog, Notify, type QTableColumn } from 'quasar';
import type { FilterModel } from 'src/types/filter';
import { useRouter } from 'vue-router';
// import { convertToPageParams, defaultPagination } from 'src/utils/pagination';
import type { CourseSpec } from 'src/types/course-spec';
import { CourseSpecService } from 'src/services/couse-spec';
import { useCurriculumStore } from 'src/stores/curriculum';

import type { Subject } from 'src/types/subject';

type TitleForm = 'New Subject' | 'Edit Subject';

const initForm = <Partial<CourseSpec>>{
  thaiDescription: '',
  engDescription: '',
  thaiName: '',
  engName: '',
  curriculumId: -1,
  subject: {
    code: '',
    thaiName: '',
    engName: '',
  } as Subject,
  clos: [],
};

export const useCourseSpecStore = defineStore('course-spec', {
  state: () => ({
    dialogState: false,
    form: initForm,
    listCourseSpec: [] as CourseSpec[],
    tabsModel: 'req',
    editMode: true,
    titleForm: '' as TitleForm,
    search: '',
    rowIndex: -1,
    qNotify: Notify,
    qDialog: Dialog,
    filterModel: {} as Partial<FilterModel>,
    curriculumId: -1,
    router: useRouter(),
    currStore: useCurriculumStore(),
    subjectColumns: <QTableColumn[]>[
      {
        name: 'number',
        label: 'No.',
        field: () => {},
        align: 'left',
        sortable: true,
      },
      {
        name: 'code',
        label: 'Code',
        field: (row) => row.subject.code,
        align: 'left',
        sortable: true,
      },
      {
        name: 'thaiName',
        label: 'Name',
        field: (row) => row.thaiName,
        align: 'left',
      },
      {
        name: 'engName',
        label: 'English Name',
        field: (row) => row.engName,
        align: 'left',
      },
      {
        name: 'credit',
        label: 'Credit',
        field: (row) => row.credit,
        align: 'left',
      },
      {
        name: 'type',
        label: 'Type',
        field: (row) => row.type,
        align: 'left',
      },
      {
        name: 'actions',
        label: 'Actions',
        field: '',
        align: 'left',
      },
    ],
  }),
  getters: {
    getDialogTitle: (s) => s.titleForm,
    getListSubjects: (s) => {
      if (s.listCourseSpec.length === 0) {
        return s.currStore.getListCourseSpec || [];
      } else {
        return s.listCourseSpec;
      }
    },
  },
  actions: {
    async fetchData() {
      try {
        // this.listCourseSpec =
        //   await CourseSpecService.fetchSubjectByCurriculumId(this.curriculumId);
        // this.listCourseSpec = this.currStore.getListCourseSpec || [];
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async handleSave({ form }: { form: Partial<CourseSpec> }) {
      this.curriculumId = this.currStore.getInsertId;
      if (this.titleForm === 'Edit Subject') {
        const ok = await CourseSpecService.updateOneInCurr({
          form,
          currId: this.curriculumId,
        });
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'Subject updated successfully',
          });
      } else {
        this.form.curriculumId = this.curriculumId;
        const ok = await CourseSpecService.createOneInCurr({
          form,
          currId: this.curriculumId,
        });
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'Subject created successfully',
          });
      }
      await this.fetchData();
      this.dialogState = false;
      this.resetForm();
    },
    handleOpenDialog({
      form,
      rowIndex,
    }: { form?: Partial<CourseSpec>; rowIndex?: number } = {}) {
      this.rowIndex = rowIndex || -1;
      if (form) {
        this.titleForm = 'Edit Subject';
        this.form = JSON.parse(JSON.stringify(form));
      } else {
        this.titleForm = 'New Subject';
      }
      this.dialogState = true;
    },
    toggleDialog() {
      this.dialogState = !this.dialogState;
    },
    async handleAdd({
      subject,
      rowIndex,
    }: {
      subject: Subject;
      rowIndex: number;
    }) {
      // pre-object
      const cs = {
        subject,
        curriculumId: this.curriculumId,
        clos: [],
      } as CourseSpec;
      // if exist, update
      if (rowIndex !== -1) {
        this.listCourseSpec.courseSpecs[rowIndex] = cs;
      } else {
        // if not exist, push
        this.listCourseSpec.courseSpecs.push(cs);
      }
      // close dialog
      this.dialogState.value = false;
    },
    async handleRemove(id: number) {
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
      this.formSubject = initForm;
    },
  },
});
