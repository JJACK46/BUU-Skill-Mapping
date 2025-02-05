<template>
  <q-page padding>
    <MainHeader
      v-model:search-text="store.search"
      v-model:filter-model="store.filterModel"
      @open-dialog="handleOpenDialog"
      @enter-search="store.fetchData"
    />
    <q-table
      flat
      bordered
      :loading="global.getLoadingState"
      class="q-mt-md q-animate--fade"
      :rows="store.getCurriculums"
      :pagination="store.pagination"
      :columns="columns"
      row-key="id"
      wrap-cells
      separator="cell"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>
            {{ props.rowIndex + 1 }}
          </q-td>
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="id" :props="props">
            {{ props.row.curriculumId }}
          </q-td>
          <q-td key="name" :props="props" width="400px">
            {{ props.row.name }}
          </q-td>
          <q-td key="degree" :props="props">
            {{ props.row.degree }}
          </q-td>
          <q-td key="period" :props="props">
            {{ props.row.period }} &nbsp; ปี
          </q-td>
          <q-td key="branch" :props="props">
            {{ props.row.branch?.name }}
          </q-td>
          <q-td>
            <q-btn
              flat
              dense
              round
              color="primary"
              icon="edit"
              @click="handleEditBtn(props.row)" />
            <q-btn
              flat
              dense
              round
              color="negative"
              icon="delete"
              @click="store.handleDelete(props.row.id)"
          /></q-td>
        </q-tr>
      </template>
    </q-table>
    <!-- Dialog -->
    <DialogForm v-model="store.dialogState" :title="store.titleForm">
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
      />
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
        :options="branches"
        :label="t('branches') + ' *'"
        use-chips
        option-label="name"
        :rules="[requireField]"
        @vue:mounted="fetchBranches"
      ></q-select>
    </DialogForm>
  </q-page>
</template>

<script lang="ts" setup>
import type { QTableColumn } from 'quasar';
import { useMeta } from 'quasar';
import MainHeader from 'src/components/PageHeader.vue';
import { CurriculumService } from 'src/services/curriculums';
import { SubjectService } from 'src/services/subject';
import { useCurriculumStore } from 'src/stores/curriculum';
import type { Curriculum } from 'src/types/curriculum';
import type { Subject } from 'src/types/subject';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGlobalStore } from 'src/stores/global';
import DialogForm from 'src/components/DialogForm.vue';
import { onlyAlphabet, requireField } from 'src/utils/field-rules';
import { useI18n } from 'vue-i18n';
import { BranchService } from 'src/services/branches';
import type { Branch } from 'src/types/branch';
const global = useGlobalStore();
const route = useRoute();
const router = useRouter();
const title = computed(() => route.matched[1].name as string);
const store = useCurriculumStore();
const curriculums = ref<Curriculum[]>();
const subjects = ref<Subject[]>();
const columns = ref<QTableColumn[]>([
  { name: 'no', label: 'No.', field: 'no', align: 'left' },
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  {
    name: 'curriculumId',
    label: 'Curriculum ID',
    field: 'curriculumId',
    align: 'left',
  },
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'degree', label: 'Degree', field: 'degree', align: 'left' },
  { name: 'period', label: 'Period', field: 'period', align: 'left' },
  { name: 'branch', label: 'Branch', field: 'branch', align: 'left' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'left' },
]);
const { t } = useI18n();
const branches = ref<Branch[]>([]);

function fetchBranches() {
  BranchService.getAll().then((res) => {
    branches.value = res.data;
  });
}

onMounted(async () => {
  await store.fetchData();
});

const handleOpenDialog = async () => {
  // const id = await store.fetchInsertId();
  // router.push(`/curriculums/${id}`);
  store.resetForm();
  store.handleOpenDialog();
};

const handleEditBtn = (row) => {
  console.log('Selected row data:', row);
  store.handleOpenEdit(row);
  router.push(`/curriculums/${row.id}`);
};

useMeta({
  title: title.value,
});
onMounted(async () => {
  curriculums.value = (await CurriculumService.getAll({ page: 1 })).data;
  subjects.value = (await SubjectService.getAll()).data;
});
</script>
