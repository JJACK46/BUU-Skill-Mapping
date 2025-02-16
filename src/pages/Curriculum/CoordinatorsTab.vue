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
    @update:pagination="store.fetchAll"
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
          color="grey-8"
          icon="edit"
          @click="handleEditBtn(props.rowIndex, props.row)"
        />
        <q-btn
          flat
          dense
          round
          color="grey-8"
          icon="delete"
          class="q-ml-sm"
          @click="handleDeleteBtn(props.rowIndex)"
        />
      </q-td>
    </template>
  </q-table>
  <DialogForm
    :title="t('coordinators')"
    v-model="store.dialogState"
    @save="handleSave()"
    width="50%"
    :cta-text="'addCoordinators'"
  >
    <div class="row q-gutter-y-md">
      <FieldChecker
        v-model="store.form.code"
        :found-hint="store.codeLabel"
        :is-found="store.isFoundCode"
        :func-update="store.findExistCode"
        label="Find the coordinator code"
      />

      <q-input
        outlined
        dense
        v-model="store.form.email"
        label="Email"
        type="email"
        clearable
        class="col-12 bg-grey-2"
        readonly
      />

      <q-input
        outlined
        v-model="store.form.thaiName"
        label="Thai Name"
        clearable
        class="col-12 bg-grey-2"
        dense
        readonly
      />
      <q-input
        outlined
        dense
        v-model="store.form.engName"
        label="English Name"
        class="col-12 bg-grey-2"
        clearable
        readonly
      />
      <q-select
        outlined
        dense
        v-model="store.form.position"
        :options="[...Object.values(AcademicRank)]"
        label="Position"
        class="col-12 bg-grey-2"
        options-dense
        readonly
      />
      <FieldBranchOptions v-model="store.form.branchId" />
      <q-select
        outlined
        dense
        v-model="store.form.specialists"
        label="Specialists"
        options-dense
        class="col-12 bg-grey-2"
        clearable
        multiple
        readonly
      />
      <q-input
        outlined
        dense
        v-model="store.form.tel"
        label="Telephone"
        clearable
        class="col-12 bg-grey-2"
        mask="###-###-####"
        unmasked-value
        readonly
      />
      <q-input
        outlined
        dense
        v-model="store.form.officeRoom"
        label="Office Room"
        class="col-12 bg-grey-2"
        clearable
        readonly
      />
      <q-input
        outlined
        dense
        v-model="store.form.bio"
        label="Bio"
        class="col-12 bg-grey-2"
        type="textarea"
        counter
        maxlength="500"
        readonly
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
import { AcademicRank } from 'src/data/academic_rank';
import { useGlobalStore } from 'src/stores/global';
import MainHeader from 'src/components/PageHeader.vue';
import { useI18n } from 'vue-i18n';
import { useCurriculumStore } from 'src/stores/curriculum';
import type { Coordinator } from 'src/types/coordinator';
import FieldChecker from 'src/components/FieldChecker.vue';
import FieldBranchOptions from 'src/components/FieldBranchOptions.vue';

const { t } = useI18n();
const global = useGlobalStore();
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
    align: 'left',
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
    field: 'thaiName',
    align: 'left',
  },
  {
    name: 'engName',
    label: 'English Name',
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
