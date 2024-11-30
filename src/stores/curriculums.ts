import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Curriculum } from 'src/types/curriculum';
import { CurriculumService } from 'src/services/curriculums';
import type { PageParams } from 'src/types/pagination';
export const useCurriculumStore = defineStore('curriculum', () => {
  const curriculums = ref<Curriculum[]>([]);
  const currentCurriculum = ref<Curriculum | null>(null);
  const totalCurriculums = ref(0);
  const initialCurriculum: Curriculum = {
    id: '',
    thaiName: '',
    engName: '',
    thaiDegreeName: '',
    engDegreeName: '',
    description: '',
    coordinators: [],
    period: 0,
    minimumGrade: 0,
    branch: '',
    // plos: [],
    subjects: [],
  };

  const editedCurriculum = ref<Curriculum>({ ...initialCurriculum });

  async function setCurrentCurriculum(id: string) {
    const res = await CurriculumService.getCurriculum(id);
    editedCurriculum.value = res.data;
    currentCurriculum.value = editedCurriculum.value;
    console.log(currentCurriculum.value);
  }

  function clearCurrentCurriculum() {
    currentCurriculum.value = null;
  }

  const addCurriculum = (curriculum: Curriculum) => {
    curriculums.value.push(curriculum);
  };

  async function fetchCurriculum(id: string) {
    const res = await CurriculumService.getCurriculum(id);
    editedCurriculum.value = res.data;
  }

  async function fetchCurriculums() {
    const res = await CurriculumService.getAll();
    curriculums.value = res.data;
  }

  async function fetchCurriculumsPage(params: PageParams) {
    const res = await CurriculumService.getCurriculumsByPage(params);
    curriculums.value = res.data.data;
    totalCurriculums.value = res.data.total;
  }

  async function saveCurriculum() {
    const curriculum = editedCurriculum.value;
    console.log(curriculum);
    await CurriculumService.addCurriculum(curriculum);
  }

  async function updateCurriculum() {
    const curriculum = editedCurriculum.value;
    await CurriculumService.updateCurriculum(curriculum);
  }

  async function addCoordinatorToCurriculum(
    curriculumId: string,
    teacher: { id: string }[]
  ) {
    await CurriculumService.addCoordinator(curriculumId, teacher);
  }

  async function addSubjectToCurriculum(
    curriculumId: string,
    subjects: { id: string }[]
  ) {
    await CurriculumService.addSubject(curriculumId, subjects);
  }

  async function addPlosToCurriculum(curriculumId: string, ploId: string) {
    // await curriculumService.addCoordinator(curriculumId, [{ id: ploId }])
    console.log('Why it using addCoordinator api for PLO?', ploId); // For debugging
  }

  async function deleteCurriculum(id: string) {
    await CurriculumService.delCurriculum(id);
    await fetchCurriculums();
  }

  function clearForm() {
    editedCurriculum.value = { ...initialCurriculum };
  }

  return {
    addCurriculum,
    curriculums,
    currentCurriculum,
    clearCurrentCurriculum,
    fetchCurriculum,
    fetchCurriculums,
    saveCurriculum,
    deleteCurriculum,
    editedCurriculum,
    fetchCurriculumsPage,
    totalCurriculums,
    clearForm,
    addCoordinatorToCurriculum,
    setCurrentCurriculum,
    addSubjectToCurriculum,
    addPlosToCurriculum,
    updateCurriculum,
  };
});
