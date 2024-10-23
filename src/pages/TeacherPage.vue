<template>
  <q-page padding>
    <PageHeader
      v-model:search-text="store.search"
      @open-dialog="store.dialogState = true"
      @open-filter="handleDialogFilter"
    />
    <q-separator class="q-my-md" />
    <q-table
      :rows="store.teachers"
      row-key="name"
      :loading="store.loading"
      :columns="teacherColumns"
      :filter="store.search"
      v-model:pagination="paginationInit"
      @update:pagination="onRequest"
    >
    </q-table>
    <DialogForm
      title="New Teacher"
      v-model="store.dialogState"
      @save="store.handleSave"
    >
      <template #body>
        <q-select
          outlined
          dense
          v-model="store.formTeacher.branch"
          :options="branches"
          option-label="name"
          label="Branch"
          options-dense
          :rules="[requireField]"
        />
        <q-input
          outlined
          dense
          v-model="store.formTeacher.email"
          label="Email"
          type="email"
          clearable
          :rules="[requireField]"
        />
        <q-input
          outlined
          v-model="store.formTeacher.name"
          label="Name"
          clearable
          dense
          :rules="[requireField]"
        />
        <q-input
          outlined
          dense
          v-model="store.formTeacher.engName"
          label="English Name"
          clearable
          :rules="[requireField]"
        />
        <q-select
          outlined
          dense
          v-model="store.formTeacher.position"
          :options="[...Object.values(AcademicRank)]"
          label="Position"
          options-dense
          :rules="[requireField]"
        />
        <q-select
          outlined
          dense
          v-model="store.formTeacher.specialists"
          :options="[
            'Machine Learning',
            'Deep Learning',
            'Software Engineering',
          ]"
          label="Specialists"
          hint="optional"
          options-dense
          clearable
          multiple
        />
        <q-input
          outlined
          dense
          v-model="store.formTeacher.tel"
          label="Telephone"
          clearable
          :rules="[(val) => val.length == 10 || 'Field not correct format']"
          mask="###-###-####"
          unmasked-value
        />
        <q-input
          outlined
          dense
          v-model="store.formTeacher.officeRoom"
          label="Office Room"
          :rules="[requireField]"
          clearable
          hint="optional"
        >
          <template #prepend></template> </q-input
        >/>
        <q-input
          outlined
          dense
          v-model="store.formTeacher.bio"
          label="Bio"
          hint="optional"
          autogrow
        />
      </template>
    </DialogForm>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { QTableProps, useMeta } from 'quasar';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTeacherStore } from 'src/stores/teacher';
import PageHeader from 'src/components/PageHeader.vue';
import DialogForm from 'src/components/DialogForm.vue';
import { requireField } from 'src/utils/field-rules';
import { Branch } from 'src/types/branch';
import { BranchService } from 'src/services/branches';
import { AcademicRank } from 'src/types/position.enum';

const branches = ref<Branch[]>([]);
const store = useTeacherStore();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const dialogFilter = ref(false);
const teacherColumns: QTableProps['columns'] = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'center' as const,
    sortable: true,
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    align: 'center' as const,
    sortable: true,
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'center' as const,
  },
  {
    name: 'engName',
    label: 'EngName',
    field: 'engName',
    align: 'center' as const,
  },
  {
    name: 'tel',
    label: 'Tel',
    field: 'tel',
    align: 'center' as const,
  },
  {
    name: 'position',
    label: 'Position',
    field: 'position',
    align: 'center' as const,
  },
];

const paginationInit = ref<QTableProps['pagination']>({
  sortBy: '',
  descending: false,
  page: 1,
  rowsPerPage: 10,
});
const handleDialogFilter = () => {
  dialogFilter.value = !dialogFilter.value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onRequest(props: any) {
  store.pageParams.page = props.page;
  store.pageParams.limit = props.rowsPerPage;
  store.pageParams.sort = props.sortBy;
  store.pageParams.order = props.descending ? 'DESC' : 'ASC';
  store.pageParams.search = props.search;
  console.log(store.pageParams);
  store.fetchData();
}

useMeta({
  title: title.value,
});
onMounted(async () => {
  branches.value = await BranchService.getAll();
});
</script>
