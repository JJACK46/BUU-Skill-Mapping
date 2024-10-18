import { defineStore } from 'pinia';
import { StudentService } from 'src/services/student';
import { PageParams } from 'src/types/pagination';
import { Student } from 'src/types/student';
import { reactive, ref } from 'vue';

export const useStudentStore = defineStore('student', () => {
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

  const formStudent = reactive<Student>({
    name: '',
    engName: '',
    dateEnrollment: new Date(),
    skillCollection: [],
  });

  const students = ref([]);
  const loading = ref(false);

  async function fetchData(
    search?: string,
    columnId?: string | null,
    columnName?: string | null
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
      pageParams.value.columnName = pageParams.value.columnName || '';
    }
    if (columnId && columnName === 'null') {
      pageParams.value.columnId = '';
      pageParams.value.columnName = '';
    }

    const res = await StudentService.fetchByPage(pageParams.value);
    students.value = res.data;

    loading.value = false;
  }

  const handleSave = async () => {
    StudentService.createOne(formStudent);
    dialogState.value = false;
    window.location.reload();
  };

  return {
    dialogState,
    formStudent,
    students,
    loading,
    search,
    pageParams,
    fetchData,
    handleSave,
  };
});
