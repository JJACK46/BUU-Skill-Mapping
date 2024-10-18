import { defineStore } from 'pinia';
import { TeacherService } from 'src/services/teacher';
import { PageParams } from 'src/types/pagination';
import { Teacher } from 'src/types/teacher';

export const useTeacherStore = defineStore('teacher', {
  state: () => ({
    dialogState: false,
    search: '',
    pageParams: <PageParams>{
      page: 1,
      limit: 10,
      sort: '',
      order: 'ASC',
      search: '',
      columnId: '',
      columnName: '',
    },
    form: <Partial<Teacher>>{
      id: 0,
      name: '',
      engName: '',
      tel: '',
      picture: '',
      position: '',
      email: '',
      officeRoom: '',
      specialists: [],
      socials: '',
      bio: '',
      branch: undefined,
      curriculums: [],
      courses: [],
    },
    teachers: [] as Teacher[],
    loading: false,
  }),
  actions: {
    async setup() {
      this.teachers = await TeacherService.getAll();
    },
    async fetchData(search?: string, columnId?: string, columnName?: string) {
      this.loading = true;
      if (search) {
        this.pageParams.search = search;
      }

      if (columnId && columnName) {
        this.pageParams.columnId = columnId;
        this.pageParams.columnName = columnName;
      } else {
        this.pageParams.columnId = this.pageParams.columnId || '';
        this.pageParams.columnName = this.pageParams.columnId || '';
      }

      const res = await TeacherService.fetchByPage(this.pageParams);
      this.teachers = res.data;

      this.loading = false;
    },
  },
});
