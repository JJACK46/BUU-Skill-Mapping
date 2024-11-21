<template>
  <q-page padding>
    <PageHeader :search-text="search" />
    <q-separator class="q-my-md" />
    <q-btn label="ADD" color="primary" to="/addcurriculums" />

    <q-table
      class="q-mt-md"
      :rows="curriculums || []"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:body-cell-actions="props">
        <q-btn
          icon="edit"
          color="primary"
          flat
          round
          @click="editRow(props.row)"
          class="q-mr-sm"
        />
      </template>
    </q-table>

    <DialogForm title="Edit" v-model="dialogState" @save="save">
      <template #body>
        <q-input
          outlined
          outline
          label="ID"
          v-model="form.id"
          class="q-mt-md" />
        <q-input
          outlined
          label="Thai Name"
          v-model="form.thaiName"
          class="q-mt-md" />
        <q-input
          outlined
          label="English Name"
          v-model="form.engName"
          class="q-mt-md" />
        <q-input
          outlined
          label="Thai Degree Name"
          v-model="form.thaiDegreeName"
          class="q-mt-md" />
        <q-input
          outlined
          label="English Degree Name"
          v-model="form.engDegreeName"
          class="q-mt-md" />
        <q-input
          outlined
          label="Period"
          type="number"
          v-model="form.period"
          class="q-mt-md" />
        <q-input
          outlined
          label="Minimum Grade"
          type="number"
          v-model="form.minimumGrade"
          class="q-mt-md" />

        <q-select
          label="Branch"
          outlined
          class="q-mt-md"
          v-model="form.branch"
          :options="availableBranches"
          option-value="id"
          option-label="name" />
        <q-input
          outlined
          label="Description"
          type="textarea"
          v-model="form.description"
          class="q-mt-md"
      /></template>
    </DialogForm>
  </q-page>
</template>

<script lang="ts" setup>
import { QForm, QTableColumn, useMeta } from 'quasar';
import DialogForm from 'src/components/DialogForm.vue';
import PageHeader from 'src/components/PageHeader.vue';
import { useCurriculumStore } from 'src/stores/curriculums';
import { CurriculumService } from 'src/services/curriculums';
import { Curriculum } from 'src/types/curriculum';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { BranchService } from 'src/services/branches';
const dialogState = ref(false);
const search = ref('');
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const curriculums = ref<Curriculum[]>([]);
const curriculumStore = useCurriculumStore();
const availableBranches = ref([]);
const formRef = ref<QForm | null>(null);
const columns = ref<QTableColumn[]>([
  { name: 'id', label: 'ID', field: 'id', align: 'center' },
  { name: 'thaiName', label: 'Thai Name', field: 'thaiName', align: 'center' },
  { name: 'engName', label: 'Eng Name', field: 'engName', align: 'center' },
  { name: 'period', label: 'Period', field: 'period', align: 'center' },
  {
    name: 'branch',
    label: 'Branch',
    field: (row) => row.branch.name,
    align: 'center',
  },
  {
    name: 'actions',
    label: 'Actions',
    field: () => null, // Dummy field as this column doesn't map to actual row data
    align: 'center',
    sortable: false,
  },
]);
useMeta({
  title: title.value,
});
const editRow = (row: Curriculum) => {
  console.log('Edit row:', row.id);
  curriculumStore.setCurrentCurriculum(row.id);
  console.log('Edit', curriculumStore.currentCurriculum);
  dialogState.value = true;
};

onMounted(async () => {
  try {
    availableBranches.value = await BranchService.getAll();
    curriculums.value = await CurriculumService.getAll();
  } catch (error) {
    console.error('Failed to fetch curriculums:', error);
  }
});
const form = reactive({
  id: '',
  thaiName: '',
  engName: '',
  thaiDegreeName: '',
  engDegreeName: '',
  description: '',
  period: 4,
  minimumGrade: 0,
  branch: {},
  coordinators: [],
});

watch(
  () => curriculumStore.currentCurriculum,
  (newCurriculum) => {
    if (newCurriculum) {
      form.id = newCurriculum.id || '';
      form.thaiName = newCurriculum.thaiName || '';
      form.engName = newCurriculum.engName || '';
      form.thaiDegreeName = newCurriculum.thaiDegreeName || '';
      form.engDegreeName = newCurriculum.engDegreeName || '';
      form.description = newCurriculum.description || '';
      form.period = newCurriculum.period || 0;
      form.minimumGrade = newCurriculum.minimumGrade || 0;
      form.branch = newCurriculum.branch;
    }
  },
  { immediate: true }
);

const save = async () => {
  const formInstance = formRef.value;
  if (!formInstance) {
    console.error('Form reference is null');
    return;
  }
  const valid = await formInstance.validate();
  if (!valid) return;
  curriculumStore.editedCurriculum.thaiName = form.thaiName;
  curriculumStore.editedCurriculum.engName = form.engName;
  curriculumStore.editedCurriculum.id = form.id;
  curriculumStore.editedCurriculum.thaiDegreeName = form.thaiDegreeName;
  curriculumStore.editedCurriculum.engDegreeName = form.engDegreeName;
  curriculumStore.editedCurriculum.description = form.description;
  curriculumStore.editedCurriculum.period = form.period;
  curriculumStore.editedCurriculum.minimumGrade = form.minimumGrade;
  await curriculumStore.saveCurriculum();
  dialogState.value = false;
};
</script>
