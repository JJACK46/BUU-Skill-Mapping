import { defineStore } from 'pinia';
import { Dialog, Notify, type QTableProps, type QTableColumn } from 'quasar';
import type { FilterModel } from 'src/types/filter';
import { useRouter } from 'vue-router';
import { convertToPageParams, defaultPagination } from 'src/utils/pagination';
import type { Subject } from 'src/types/subject';
import { SubjectService } from 'src/services/subject';
import { useCurriculumStore } from 'src/stores/curriculum';

type TitleForm = 'New Subject' | 'Edit Subject';

export const useSubjectStore = defineStore('subject', {
  state: () => ({
    dialogState: false,
    form: {} as Subject,
    listItem: [] as Subject[],
    tabsModel: 'req',
    editMode: true,
    titleForm: '' as TitleForm,
    search: '',
    rowIndex: -1,
    qNotify: Notify,
    qDialog: Dialog,
    pagination: defaultPagination,
    filterModel: {} as Partial<FilterModel>,
    router: useRouter(),
    curr: useCurriculumStore(),
    subjectCodeLabel: '',
    total: 0,
    foundExistSubject: false,
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
        field: (row) => row.code,
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
    getListSubjects: (s) => s.listItem,
    getSubjectCodeLabel: (s) => s.subjectCodeLabel,
  },
  actions: {
    async checkSubjectCode(subjectCode: string) {
      if (subjectCode.length === 8) {
        const existSubject = (await SubjectService.findExistSubjectCode(
          subjectCode,
        )) as unknown as Subject;
        if (existSubject) {
          this.subjectCodeLabel = 'Found the exist subject';
          this.foundExistSubject = true;
          this.form = existSubject;
        } else {
          this.subjectCodeLabel = 'Create a new Subject';
          this.foundExistSubject = false;
        }
      } else {
        this.subjectCodeLabel = '';
      }
    },
    async fetchAll(pag?: QTableProps['pagination']) {
      try {
        const { data, total } = await SubjectService.getAll(
          convertToPageParams(pag, this.search),
        );
        if (data) {
          this.listItem = data;
          this.total = total;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchAllInCurr() {
      try {
        setTimeout(async () => {
          const filter: Partial<FilterModel> = {
            curriculumCode: this.curr.getCode,
          };
          const { data, total } = await SubjectService.getAll(filter);
          if (data) {
            this.listItem = data;
            this.total = total;
          }
        }, 100);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    resetForm() {
      this.form = {} as Partial<Subject>;
    },

    async createOne() {
      const ok = await SubjectService.createOne(this.form);
      if (ok) {
        Notify.create({
          type: 'ok',
          message: 'Created successfully',
        });
      }
      await this.fetchAll();
    },
    async updateOne() {
      const ok = await SubjectService.updateOne(this.form.id, this.form);
      if (ok) {
        Notify.create({
          type: 'ok',
          message: 'Updated successfully',
        });
      }
      await this.fetchAll();
    },

    async deleteOne(id: number) {
      if (confirm) {
        const ok = await SubjectService.removeOne(id);
        if (ok) {
          Notify.create({
            type: 'ok',
            message: `Deleted successfully`,
          });
        }
        await this.fetchAll();
      }
    },

    handleDelete(id: number) {
      Dialog.create({
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this Subject?',
        cancel: true,
        persistent: true,
      }).onOk(async () => this.deleteOne(id));
    },

    async handleSave() {
      if (!this.form.curriculumId) {
        this.form.curriculumId = this.curr.getInsertId;
      }
      if (this.titleForm === 'Edit Subject') {
        this.updateOne();
      } else {
        this.createOne();
      }
      this.dialogState = false;
      this.resetForm();
      await this.fetchAll();
    },

    handleEdit(form: Partial<Subject>) {
      this.form = { ...form };
      this.titleForm = 'Edit Subject';
      this.toggleDialog();
    },

    handleCreate() {
      this.form = {} as Partial<Subject>;
      this.titleForm = 'New Subject';
      this.toggleDialog();
    },

    toggleDialog() {
      this.dialogState = !this.dialogState;
    },
  },
});
