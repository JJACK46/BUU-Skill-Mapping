import { defineStore } from 'pinia';
import { TeacherService } from 'src/services/teacher';
import { PageParams } from 'src/types/pagination';
import { Teacher } from 'src/types/teacher';
import { reactive, ref } from 'vue';

export const useTeacherStore = defineStore('teacher', () => {
  const dialogState = ref(false);
  const search = ref();
  const pageParams = ref<PageParams>({
    page: 1,
    limit: 10,
    sort: '',
    order: 'ASC',
    search: '',
    columnId: '',
    columnName: '',
  });

  const formTeacher = reactive<Teacher>({
    id: 0,
    name: '',
    engName: '',
    tel: '',
    picture: '',
    position: '',
    email: '',
    officeRoom: '',
    specialists: '',
    socials: '',
    bio: '',
    branch: undefined,
    curriculums: [],
    courses: [],
  });

  const teachers = ref([]);
  const loading = ref(false);

  async function fetchData(
    search?: string,
    columnId?: string,
    columnName?: string
  ) {
    loading.value = true;
    if (search) {
      pageParams.value.search = search;
    }

    if (columnId && columnName) {
      pageParams.value.columnId = columnId;
      pageParams.value.columnName = columnName;
    } else {
      pageParams.value.columnId = pageParams.value.columnId || '';
      pageParams.value.columnName = pageParams.value.columnId || '';
    }

    const res = await TeacherService.fetchByPage(pageParams.value);
    teachers.value = res.data;

    loading.value = false;
  }

  return {
    dialogState,
    formTeacher,
    teachers,
    loading,
    search,
    pageParams,
    fetchData,
  };
});
