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

  const form = reactive<Teacher>({
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

  async function fetchData(pageParam?: PageParams) {
    loading.value = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let res: any;

    if (pageParam) {
      pageParams.value = pageParam;
      console.log('pageParams', pageParams);
      res = await TeacherService.fetchByPage(pageParams.value);
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

    console.log('teachers.value', res.data);
    teachers.value = res.data;

    loading.value = false;
  }

  async function setup() {
    await fetchData();
  }

  const handleSave = async () => {
    TeacherService.createOne(form);
    dialogState.value = false;
    window.location.reload();
  };

  const updatePageParams = (newParams: PageParams) => {
    pageParams.value = newParams;
  };

  const toggleDialog = () => {
    dialogState.value = !dialogState.value;
  };

  return {
    dialogState,
    form,
    teachers,
    loading,
    search,
    pageParams,
    fetchData,
    handleSave,
    updatePageParams,
    setup,
    toggleDialog,
  };
});
