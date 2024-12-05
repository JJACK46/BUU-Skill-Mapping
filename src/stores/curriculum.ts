import { defineStore } from 'pinia';
import { CurriculumService } from 'src/services/curriculums';
import { InstructorService } from 'src/services/instructor';
import { SubjectService } from 'src/services/subject';
import { Curriculum } from 'src/types/curriculum';
import { PageParams } from 'src/types/pagination';
import { useRouter } from 'vue-router';
type TitleForm = 'Edit Curriculum';
export const useCurriculumStore = defineStore('curriculum', {
  state: () => ({
    form: {} as Partial<Curriculum>,
    curriculums: [] as Curriculum[],
    curriculumsOptions: <Curriculum[]>[],
    pageParams: {
      page: 1,
      limit: 10,
    } as PageParams,
    dialogState: false,
    tabsModel: 'req',
    titleForm: '' as TitleForm,
    router: useRouter(),
  }),
  getters: {
    getCurriculums: (c) => c.curriculums,
    getDialogTitle: (c) => c.titleForm,
  },
  actions: {
    async fetchData() {
      this.curriculums = (await CurriculumService.getAll(this.pageParams)).data;
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

    async handleSave() {
      console.log(this.form);
      await CurriculumService.createOne(this.form);
      this.router.push('/curriculums');
      location.reload();
      this.dialogState = false;
      this.resetForm();
    },

    async fetchCoordinatorsData() {
      try {
        if (this.form.coordinators?.length) {
          const coordinatorsData = await Promise.all(
            this.form.coordinators.map(async (coordinator) => {
              const id = coordinator.id ?? 0;
              return await InstructorService.getOne(id);
            })
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
              const id = subject.id ?? 0;
              return await SubjectService.getOne(id);
            })
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

    handleOpenDialog(form?: Partial<Curriculum>) {
      this.dialogState = true;
      this.titleForm = 'Edit Curriculum';
      this.form = { ...form };
      console.log(this.form);
      this.fetchCoordinatorsData();
      this.fetchSubjectsData();
    },
    async removeCurriculum(id: string) {
      await CurriculumService.removeOne(id);
      this.fetchData();
    },
    resetForm() {
      this.form = {};
    },
  },
});
