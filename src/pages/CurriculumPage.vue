<template>
  <q-page padding>
    <PageHeader :search-text="search" @open-dialog="store.toggleDialogForm" />
    <q-separator class="q-my-md" />
    <q-btn label="ADD" color="primary" to="/addcurriculums" />

    <q-table class="q-mt-md" :rows="curriculums || []" :columns="columns" row-key="id">
      <template v-slot:body-cell-actions="props">
        <q-btn icon="edit" color="primary" flat round @click="editRow(props.row)" class="q-mr-sm" />
      </template>
    </q-table>

    <DialogForm title="Edit" v-model="dialogState" @save="save">
      <template #body>
        <q-input outlined outline label="ID" v-model="form.id" class="q-mt-md" />
        <q-input outlined label="Thai Name" v-model="form.thaiName" class="q-mt-md" />
        <q-input outlined label="English Name" v-model="form.engName" class="q-mt-md" />
        <q-input outlined label="Thai Degree Name" v-model="form.thaiDegreeName" class="q-mt-md" />
        <q-input outlined label="English Degree Name" v-model="form.engDegreeName" class="q-mt-md" />
        <q-input outlined label="Period" type="number" v-model="form.period" class="q-mt-md" />
        <q-input outlined label="Minimum Grade" type="number" v-model="form.minimumGrade" class="q-mt-md" />

        <q-select label="Branch" outlined class="q-mt-md" v-model="form.branch" :options="availableBranches"
          option-value="id" option-label="name" />
        <q-input outlined label="Description" type="textarea" v-model="form.description" class="q-mt-md" /></template>
    </DialogForm>
    =======
    <section class="q-mt-md q-gutter-y-lg">
      <DialogForm @save="() => { }" title="New Curriculum" v-model="store.dialogForm" full-width>
        <template #body>
          <q-splitter v-model="qsplitterVModel">
            <template #before>
              <q-tabs v-model="innerTab" vertical class="text-primary">
                <q-tab name="main" icon="home" label="Main" />
                <q-tab name="subjects" icon="book" label="Subjects" />
              </q-tabs>
            </template>
            <template #after>
              <q-tab-panels v-model="innerTab" animated transition-next="slide-up" transition-prev="slide-down">
                <q-tab-panel name="main" class="q-gutter-y-md">
                  <q-input dense outlined v-model="store.form.thaiName" label="Name *"
                    :rules="[requireField, onlyAlphabet]" />
                  <q-input dense outlined v-model="store.form.engName" label="English Name *"
                    :rules="[requireField, onlyAlphabet]" />
                  <q-input dense type="textarea" outlined v-model="store.form.description" label="Description *"
                    :rules="[requireField]" />
                  <q-input dense outlined v-model="store.form.thaiDegreeName" label="Degree Name *"
                    :rules="[requireField, onlyAlphabet]" />
                  <q-input dense outlined v-model="store.form.engDegreeName" label="English Degree Name *"
                    :rules="[requireField, onlyAlphabet]" />
                  <q-input dense type="number" outlined v-model="store.form.period" label="Period *"
                    :rules="[requireField]" />
                  <q-input dense type="number" outlined v-model="store.form.minimumGrade" label="Minimum Grade *"
                    :rules="[requireField]" />
                </q-tab-panel>
                <q-tab-panel name="subjects">
                  <q-select dense outlined v-model="store.form.subjects" :options="subjects" label="Subjects  *"
                    use-chips option-label="name" multiple :rules="[requireField]"></q-select>
                </q-tab-panel>
              </q-tab-panels>

            </template>
          </q-splitter>
        </template>
      </DialogForm>
      <q-card class="q-pa-md q-animate--fade" v-for="(c, index) in curriculums" bordered flat :key="c.id">
        <q-card-section>
          <div class="row justify-between">
            <span class="text-h6">
              {{ c.thaiName }}
              <p class="text-caption">{{ c.engName }}</p>
            </span>
            <q-btn icon="edit" flat padding="none" @click="store.toggleDialogForm(c)" />
          </div>
          <div>{{ c.description }}</div>
          <div>{{ c.thaiDegreeName }}</div>
          <div>{{ c.engDegreeName }}</div>
          <div>Period: {{ c.period }} Years</div>
          <div>Minimum Grade: {{ c.minimumGrade }}</div>
          <div>{{ c.coordinators }}</div>
        </q-card-section>
        <q-card-section class="text-body1 q-pa-none">
          <q-expansion-item label="List of subjects" @click="handleSubjects(index)">
            <q-table :rows="c.subjects || []" wrap-cells grid flat bordered row-key="id" :rows-per-page-options="[0]"
              hide-bottom>
            </q-table>
          </q-expansion-item>
        </q-card-section>
      </q-card>
    </section>
    >>>>>>> master
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
import { onlyAlphabet, requireField } from 'src/utils/field-rules';
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
