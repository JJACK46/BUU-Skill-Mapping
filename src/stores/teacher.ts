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
    name: '',
    engName: '',
    tel: '',
    picture: '',
    email: '',
    officeRoom: '',
    specialists: [],
    bio: '',
    position: '',
    branch: null,
    socials: {
      line: '',
    },
    courses: [],
    curriculums: [],
  });

  const teachers = ref([]);
  const loading = ref(false);

  async function fetchData(pageParams?: PageParams) {
    loading.value = true;
    let res;

    if (pageParams) {
      console.log('pageParams', pageParams);
      res = await TeacherService.fetchByPage(pageParams);
    } else {
      // initial pageParams
      const pageParamsInit = <PageParams>{
        page: 1,
        limit: 10,
        sort: '',
        order: 'ASC',
        search: '',
        columnId: '',
        columnName: '',
      };
      res = await TeacherService.fetchByPage(pageParamsInit);
    }

    console.log('teachers.value', teachers.value);
    teachers.value = res.data;

    loading.value = false;
  }

  const handleSave = async () => {
    TeacherService.createOne(formTeacher);
    dialogState.value = false;
    window.location.reload();
  };

  const updatePageParams = (newParams: PageParams) => {
    pageParams.value = newParams;
  };

  return {
    dialogState,
    formTeacher,
    teachers,
    loading,
    search,
    pageParams,
    fetchData,
    handleSave,
    updatePageParams,
  };
});
