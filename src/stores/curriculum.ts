import { defineStore } from 'pinia';
import { Dialog, Notify } from 'quasar';
import { CurriculumService } from 'src/services/curriculums';
import { InstructorService } from 'src/services/instructor';
import { SubjectService } from 'src/services/subject';
import type { Curriculum } from 'src/types/curriculum';
import type { FilterModel } from 'src/types/filter';
import { convertToPageParams, defaultPagination } from 'src/utils/pagination';
import { useRouter } from 'vue-router';
type TitleForm = 'Edit Curriculum';
export const useCurriculumStore = defineStore('curriculum', {
  state: () => ({
    form: {} as Partial<Curriculum>,
    curriculums: [] as Curriculum[],
    curriculumsOptions: <Curriculum[]>[],
    pagination: defaultPagination,
    dialogState: false,
    tabsModel: 'main',
    titleForm: '' as TitleForm,
    router: useRouter(),
    search: '',
    filterModel: {} as Partial<FilterModel>,
  }),
  getters: {
    getCurriculums: (c) => c.curriculums,
    getDialogTitle: (c) => c.titleForm,
    getInsertId: (c) => c.form.id,
    getSkills: (c) => {
      return c.form.skills?.map((skill, index) => ({ ...skill, index })) || [];
    },
    getCurriculum: (c) => c.form,
    getListSubject: (c) => c.form.courseSpecs?.flatMap((c) => c.subject) || [],
  },
  actions: {
    async fetchOne(id: string) {
      const res = await CurriculumService.getOneByCode(id);
      this.form = res;
    },
    async fetchData() {
      const { data, total } = await CurriculumService.getAll(
        convertToPageParams(this.pagination, this.search, this.filterModel),
      );
      this.curriculums = data;
      this.pagination!.rowsNumber = total || 0;
    },

    async fetchAllCurriculums() {
      this.curriculumsOptions = (await CurriculumService.getAll()).data;
    },
    toggleDialogForm(form?: Partial<Curriculum>) {
      if (form) {
        this.form = { ...form };
      }
      this.dialogState = !this.dialogState;
    },
    async handleAdd() {
      const ok = await CurriculumService.createOne(this.form);
      if (ok) {
        Notify.create({
          type: 'ok',
          message: 'Curriculum created successfully',
        });
        this.dialogState = false;
        this.resetForm();
      }
    },

    async handleSave() {
      const ok = await CurriculumService.updateOne(this.form);
      if (ok) {
        Notify.create({
          type: 'ok',
          message: 'Curriculum saved successfully',
        });
        this.router.push('/administer/curriculums');
        this.dialogState = false;
        setTimeout(() => {
          this.resetForm();
        }, 1000);
      }
    },

    async fetchCoordinatorsData() {
      try {
        if (this.form.coordinators?.length) {
          const coordinatorsData = await Promise.all(
            this.form.coordinators.map(async (coordinator) => {
              const id = coordinator.id ?? 0;
              return await InstructorService.getOne(id);
            }),
          );
          this.form.coordinators = coordinatorsData;
          console.log('Updated Coordinators:', this.form.coordinators);
        } else {
          console.log('No coordinators found.');
        }
      } catch (error) {
        console.error('Error fetching coordinator data:', error);
      }
    },

    async fetchSubjectsData() {
      try {
        if (this.form.subjects?.length) {
          const subjectsData = await Promise.all(
            this.form.subjects.map(async (subject) => {
              const id = subject.code ?? 0;
              return await SubjectService.getOne(id);
            }),
          );
          this.form.subjects = subjectsData;
          console.log('Updated Subjects:', this.form.subjects);
        } else {
          console.log('No subjects found.');
        }
      } catch (error) {
        console.error('Error fetching subjects data:', error);
      }
    },

    handleOpenEdit(form?: Partial<Curriculum>) {
      this.form = { ...form };
      this.fetchCoordinatorsData();
      this.fetchSubjectsData();
    },
    handleOpenDialog(form?: Partial<Curriculum>) {
      if (form) {
        this.titleForm = 'Delete Curriculum';
        this.form = { ...form };
      }
      this.dialogState = true;
    },
    handleDelete(id: number) {
      Dialog.create({
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this curriculum?',
        cancel: true,
        persistent: true,
      }).onOk(() => this.removeCurriculum(id));
    },
    async removeCurriculum(id: number) {
      const ok = await CurriculumService.removeOne(id);
      if (ok) {
        Notify.create({
          type: 'ok',
          message: 'Curriculum removed successfully',
        });
        this.fetchData();
      }
    },
    resetForm() {
      this.form = {};
    },
  },
});
