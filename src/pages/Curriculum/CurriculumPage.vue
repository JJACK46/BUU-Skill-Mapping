<template>
  <q-page padding>
    <MainHeader :search-text="search" @open-dialog="handleAdd" />
    <q-separator class="q-my-md" />
    <q-table
      flat
      bordered
      :loading="global.getLoadingState"
      class="q-mt-md q-animate--fade"
      :rows="store.curriculums"
      :columns="columns"
      row-key="id"
      wrap-cells
      separator="cell"
    >
      <template v-slot:body-cell-actions="props">
        <q-btn
          icon="edit"
          color="primary"
          flat
          round
          @click="store.handleOpenDialog(props.row)"
          class="q-mr-sm"
        />
        <q-btn
          icon="delete"
          color="negative"
          flat
          round
          @click="store.removeCurriculum(props.row.id)"
        />
      </template>
    </q-table>

    <DialogForm
      v-model="store.dialogState"
      :title="store.getDialogTitle"
      @save="store.handleSave"
      @vue:mounted="store.fetchAllCurriculums"
    >
      <template #body>
        <q-tabs v-model="store.tabsModel">
          <q-tab name="req" label="Required" />
          <q-tab name="teach" label="teach" />
          <q-tab name="sub" label="sub" />
        </q-tabs>
        <q-tab-panels v-model="store.tabsModel">
          <q-tab-panel name="req" class="q-gutter-y-md">
            <q-input
              dense
              outlined
              v-model="store.form.id"
              :label="t('id') + ' *'"
              :rules="[requireField]"
            />
            <q-input
              dense
              outlined
              v-model="store.form.name"
              :label="t('name') + ' *'"
              :rules="[requireField]"
            >
              <template #label></template>
            </q-input>
            <q-input
              dense
              outlined
              v-model="store.form.engName"
              :label="t('engName') + ' *'"
              :rules="[requireField, onlyAlphabet]"
            />
            <q-input
              dense
              type="textarea"
              outlined
              v-model="store.form.description"
              :label="t('description') + ' *'"
              :rules="[requireField]"
            />
            <q-input
              dense
              outlined
              v-model="store.form.degree"
              :label="t('degree') + ' *'"
              :rules="[requireField]"
            />
            <q-input
              dense
              outlined
              v-model="store.form.engDegree"
              :label="t('engDegree') + ' *'"
              :rules="[requireField]"
            />

            <q-input
              dense
              type="number"
              outlined
              v-model.number="store.form.period"
              :label="t('period') + ' *'"
              :rules="[requireField]"
            >
              <template #before></template>
            </q-input>
            <q-input
              dense
              type="number"
              outlined
              v-model.number="store.form.minimumGrade"
              :label="t('minimumGrade') + ' *'"
              :rules="[requireField]"
            />

            <q-select
              dense
              outlined
              v-model="store.form.branch"
              :options="branchs"
              :label="t('branchs') + ' *'"
              use-chips
              option-label="name"
              :rules="[requireField]"
              @vue:mounted="fetchBranch"
            ></q-select>
          </q-tab-panel>
          <q-tab-panel
            name="teach"
            class="q-gutter-y-md"
            @vue:mounted="fetchInstructors"
          >
            <q-select
              dense
              outlined
              v-model="store.form.coordinators"
              :options="instructors"
              :label="t('instructors') + ' *'"
              use-chips
              option-label="name"
              multiple
              :rules="[requireField]"
            ></q-select>
          </q-tab-panel>
          <q-tab-panel
            name="sub"
            class="q-gutter-y-md"
            @vue:mounted="fetchSubjects"
          >
            <q-select
              dense
              outlined
              v-model="store.form.subjects"
              :options="subjects"
              :label="t('subjects') + ' *'"
              use-chips
              option-label="name"
              multiple
              :rules="[requireField]"
            ></q-select>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </DialogForm>
  </q-page>
</template>

<script lang="ts" setup>
import DialogForm from 'src/components/DialogForm.vue';
import { QTableColumn, useMeta } from 'quasar';
import MainHeader from 'src/components/Header/main-header.vue';
import { CurriculumService } from 'src/services/curriculums';
import { SubjectService } from 'src/services/subject';
import { BranchService } from 'src/services/branches';
import { useCurriculumStore } from 'src/stores/curriculum';
import { Curriculum } from 'src/types/curriculum';
import { Subject } from 'src/types/subject';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { onlyAlphabet, requireField } from 'src/utils/field-rules';
import { Branch } from 'src/types/branch';
import { useGlobalStore } from 'src/stores/global';
import { InstructorService } from 'src/services/instructor';
import { Instructor } from 'src/types/instructor';
const global = useGlobalStore();
const search = ref();
const route = useRoute();
const router = useRouter();
const title = computed(() => route.matched[1].name as string);
const store = useCurriculumStore();
const curriculums = ref<Curriculum[]>();
const subjects = ref<Subject[]>();
const { t } = useI18n();
const branchs = ref<Branch[]>();
const instructors = ref<Instructor[]>();
const columns = ref<QTableColumn[]>([
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: 'Thai Name', field: 'name', align: 'left' },
  { name: 'engName', label: 'Eng Name', field: 'engName', align: 'left' },
  { name: 'period', label: 'Period', field: 'period', align: 'left' },
  {
    name: 'actions',
    label: 'Actions',
    field: () => null, // Dummy field as this column doesn't map to actual row data
    align: 'center',
    sortable: false,
  },
]);

onMounted(async () => {
  await store.fetchData();
});

const handleAdd = () => {
  router.push({ name: 'New Curriculum' });
  store.resetForm();
};

useMeta({
  title: title.value,
});
onMounted(async () => {
  curriculums.value = (await CurriculumService.getAll({ page: 1 })).data;
  subjects.value = (await SubjectService.getAll()).data;
});

async function fetchBranch() {
  branchs.value = (await BranchService.getAll()).data;
}

async function fetchInstructors() {
  instructors.value = (await InstructorService.getAll()).data;
}

async function fetchSubjects() {
  subjects.value = (await SubjectService.getAll()).data;
}
</script>
