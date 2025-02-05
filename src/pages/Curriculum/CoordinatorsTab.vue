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
    row-key="id"
    :loading="global.getLoadingState"
    :columns="columns"
    :filter="store.search"
    @update:pagination="store.fetchData"
  >
  </q-table>
  <DialogForm
    title="New Instructor"
    v-model="store.dialogState"
    @save="handleSave()"
    width="60%"
  >
    <template #body>
      <div class="flex q-gutter-md">
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
          style="width: 400px"
        />
        <q-input
          outlined
          dense
          v-model="store.form.email"
          label="Email *"
          type="email"
          clearable
          :rules="[requireField]"
          style="width: 370px"
        />
        <q-input
          outlined
          v-model="store.form.name"
          label="Name *"
          clearable
          dense
          :rules="[requireField]"
          style="width: 250px"
        />
        <q-input
          outlined
          dense
          v-model="store.form.engName"
          label="English Name *"
          clearable
          :rules="[requireField]"
          style="width: 250px"
        />
        <q-select
          outlined
          dense
          v-model="store.form.position"
          :options="[...Object.values(AcademicRank)]"
          label="Position *"
          options-dense
          :rules="[requireField]"
          style="width: 250px"
        />
        <q-select
          outlined
          dense
          v-model="store.form.specialists"
          :options="[
            'Machine Learning',
            'Deep Learning',
            'Software Engineering',
          ]"
          label="Specialists"
          hint="Optional"
          options-dense
          clearable
          multiple
          style="width: 250px"
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
          style="width: 250px"
        />
        <q-input
          outlined
          dense
          v-model="store.form.officeRoom"
          label="Office Room *"
          :rules="[requireField]"
          clearable
          style="width: 250px"
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
    </template>
  </DialogForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { QTableColumn } from 'quasar';
import { useMeta } from 'quasar';
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

const columns: QTableColumn[] = [
  {
    name: 'number',
    label: 'No.',
    field: () => {},
    align: 'left',
    sortable: true,
  },
  {
    name: 'id',
    label: 'ID',
    field: 'id',
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
  // {
  //   name: 'engName',
  //   label: 'EngName',
  //   field: 'engName',
  //   align: 'left',
  // },
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
];
function fetchBranches() {
  BranchService.getAll().then((res) => {
    branches.value = res.data;
  });
}

const handleSave = () => {
  if (!curr.form.coordinators) {
    curr.form.coordinators = [];
  }
  curr.form.coordinators.push(store.form as Coordinator);
  store.dialogState = false;
};

useMeta({
  title: title.value,
});
</script>
