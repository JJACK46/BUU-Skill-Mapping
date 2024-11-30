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
      width="1000px"
    >
      <template #body>
        <q-tabs v-model="store.tabsModel">
          <q-tab name="req" label="Required" />
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
              :rules="[requireField, onlyAlphabet]"
            />
            <q-input
              dense
              outlined
              v-model="store.form.engDegree"
              :label="t('engDegree') + ' *'"
              :rules="[requireField, onlyAlphabet]"
            />

            <q-input
              dense
              type="number"
              outlined
              v-model.number="store.form.period"
              :label="t('period') + ' *'"
              :rules="[requireField]"
            >
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
</script>
