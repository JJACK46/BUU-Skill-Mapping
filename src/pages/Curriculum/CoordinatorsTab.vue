<template>
  <div class="text-h4 text-primary">{{ t('coordinatorsManagement') }}</div>
  <MainHeader
    v-model:search-text="store.search"
    @open-dialog="store.toggleDialog"
    hide-filter
  />
  <q-table
    flat
    bordered
    :pagination="store.pagination"
    class="q-animate--fade q-mt-lg"
    separator="cell"
    :rows="curr.form.coordinators || []"
    row-key="code"
    :loading="global.getLoadingState"
    :columns="columns"
    :filter="store.search"
    @update:pagination="store.fetchData"
  >
    <template #body-cell-number="props">
      <q-td>
        {{ props.rowIndex + 1 }}
      </q-td>
    </template>
    <template #body-cell-actions="props">
      <q-td>
        <q-btn
          flat
          dense
          round
          icon="edit"
          @click="handleEditBtn(props.rowIndex, props.row)"
        />
        <q-btn
          flat
          dense
          round
          icon="delete"
          class="q-ml-sm"
          @click="handleDeleteBtn(props.rowIndex)"
        />
      </q-td>
    </template>
  </q-table>
  <DialogForm
    title="New Instructor"
    v-model="store.dialogState"
    @save="handleSave()"
    width="60%"
  >
    <div class="flex q-gutter-md">
      <q-input
        outlined
        dense
        v-model="store.form.code"
        label="Code *"
        clearable
        :rules="[requireField]"
        style="width: 340px"
      />
      <q-input
        outlined
        dense
        v-model="store.form.email"
        label="Email *"
        type="email"
        clearable
        :rules="[requireField]"
        style="width: 340px"
      />
      <q-select
        outlined
        dense
        v-model="store.form.position"
        :options="[...Object.values(AcademicRank)]"
        label="Position *"
        options-dense
        :rules="[requireField]"
        style="width: 340px"
      />
      <q-input
        outlined
        v-model="store.form.name"
        label="Name *"
        clearable
        dense
        :rules="[requireField]"
        style="width: 340px"
      />
      <q-input
        outlined
        dense
        v-model="store.form.engName"
        label="English Name *"
        clearable
        :rules="[requireField]"
        style="width: 340px"
      />
      <q-select
        outlined
        dense
        v-model="store.form.branch"
        :options="branches"
        option-label="name"
        label="Branch *"
        options-dense
        :rules="[requireField]"
        @vue:mounted="fetchBranches"
        style="width: 340px"
      />
      <q-select
        outlined
        dense
        v-model="store.form.specialists"
        :options="['Machine Learning', 'Deep Learning', 'Software Engineering']"
        label="Specialists"
        hint="Optional"
        options-dense
        clearable
        multiple
        style="width: 340px"
      />
      <q-input
        outlined
        dense
        v-model="store.form.tel"
        label="Telephone *"
        clearable
        :rules="[(val) => val.length == 10 || 'Field not correct format']"
        mask="###-###-####"
        unmasked-value
        style="width: 200px"
      />
      <q-input
        outlined
        dense
        v-model="store.form.officeRoom"
        label="Office Room *"
        :rules="[requireField]"
        clearable
        style="width: 480px"
      />
      <q-input
        outlined
        dense
        v-model="store.form.bio"
        label="Bio"
        hint="Optional"
        type="textarea"
        style="width: 100%"
      />
    </div>
  </DialogForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { QTableColumn } from 'quasar';
import { useMeta, useQuasar } from 'quasar';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useInstructorStore } from 'src/stores/instructor';
import DialogForm from 'src/components/DialogForm.vue';
import { requireField } from 'src/utils/field-rules';
import type { Branch } from 'src/types/branch';
import { AcademicRank } from 'src/types/position.enum';
import { useGlobalStore } from 'src/stores/global';
import { BranchService } from 'src/services/branches';
import MainHeader from 'src/components/PageHeader.vue';
import { useI18n } from 'vue-i18n';
import { useCurriculumStore } from 'src/stores/curriculum';
import type { Coordinator } from 'src/types/coordinator';

const { t } = useI18n();
const global = useGlobalStore();
const branches = ref<Branch[]>([]);
const store = useInstructorStore();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const curr = useCurriculumStore();
const q = useQuasar();
const rowIndex = ref(-1);

const columns: QTableColumn[] = [
  {
    name: 'number',
    label: 'No.',
    field: () => {},
    align: 'left',
    sortable: true,
  },
  {
    name: 'code',
    label: 'Code',
    field: 'code',
    align: 'center',
    sortable: true,
  },
  {
    name: 'position',
    label: 'Position',
    field: (c) => c.position || 'Unknown',
    align: 'left',
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left',
  },
  {
    name: 'engName',
    label: 'EngName',
    field: 'engName',
    align: 'left',
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    align: 'left',
    sortable: true,
  },
  {
    name: 'tel',
    label: 'Tel',
    field: 'tel',
    align: 'left',
  },
  {
    name: 'actions',
    label: 'Actions',
    field: () => {},
    align: 'left',
  },
];
function fetchBranches() {
  BranchService.getAll().then((res) => {
    branches.value = res.data;
  });
}

const handleSave = () => {
  const index = rowIndex.value;
  if (index === -1) {
    curr.form.coordinators?.push(store.form as Coordinator);
  } else {
    curr.form.coordinators?.splice(index, 1, store.form as Coordinator);
  }
  rowIndex.value = -1;
  store.dialogState = false;
};

const handleEditBtn = (index: number, item: Coordinator) => {
  rowIndex.value = index;
  store.form = JSON.parse(JSON.stringify(item));
  store.toggleDialog();
};

const handleDeleteBtn = (index: number) => {
  q.dialog({
    title: 'Confirm',
    message: 'Are you sure?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    curr.form.coordinators?.splice(index, 1);
  });
};

useMeta({
  title: title.value,
});
</script>
