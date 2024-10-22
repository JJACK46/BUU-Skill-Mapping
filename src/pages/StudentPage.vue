<template>
  <q-page padding>
    <div class="row q-gutter-md">
      <div class="col-grow" style="width: 40%">
        <SearchData
          :fetch-data="studentStore.fetchData"
          label="Student"
        ></SearchData>
      </div>
      <div class="col">
        <FillterData
          :fetch-data="studentStore.fetchData"
          :by-branch="true"
          :by-curriculum="true"
        ></FillterData>
      </div>
      <div class="col-shrink">
        <AddButton :click-add-fuction="addStudent"></AddButton>
      </div>
    </div>
    <q-separator class="q-my-md" />
    <q-table
      :rows="studentStore.students"
      row-key="name"
      :loading="studentStore.loading"
      :columns="studentColumns"
      v-model:pagination="paginationInit"
      @update:pagination="onRequest"
    >
    </q-table>
    <DialogForm
      title="New Student"
      v-model="addDialog"
      @save="studentStore.handleSave"
    >
      <template #body>
        <q-input
          outlined
          v-model="studentStore.formStudent.name"
          label="Name"
          clearable
          :rules="[requireField]"
        />
        <q-input
          outlined
          v-model="studentStore.formStudent.engName"
          label="English Name"
          clearable
          :rules="[requireField]"
        />
        <q-date
          outlined
          v-model="studentStore.formStudent.dateEnrollment"
          label="Date of Enrollment"
          clearable
          :rules="[requireField]"
        />
        <!-- <q-select
      outlined
      v-model="studentStore.formStudent.skillCollection"
      :options="skillCollections"
      label="Skill Collection"
      options-dense
      multiple
      clearable
    /> -->
      </template>
    </DialogForm>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useMeta } from 'quasar';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStudentStore } from 'src/stores/student';
import SearchData from 'src/components/SearchData.vue';
import AddButton from 'src/components/AddButton.vue';
import FillterData from 'src/components/FillterData.vue';
import { requireField } from 'src/utils/field-rules';
import { BranchService } from 'src/services/branches';
import { Branch } from 'src/types/branch';
import DialogForm from 'src/components/DialogForm.vue';

const studentStore = useStudentStore();
const branches = ref<Branch[]>([]);
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const isCreate = ref(false);
const addDialog = ref(false);
const studentColumns = [
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

const paginationInit = ref({
  sortBy: '',
  descending: false,
  page: 1,
  rowsPerPage: 10,
});

const addStudent = () => {
  isCreate.value = true;
  addDialog.value = true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onRequest(props: any) {
  studentStore.pageParams.page = props.page;
  studentStore.pageParams.limit = props.rowsPerPage;
  studentStore.pageParams.sort = props.sortBy;
  studentStore.pageParams.order = props.descending ? 'DESC' : 'ASC';
  studentStore.pageParams.search = props.search;
  studentStore.fetchData();
}

useMeta({
  title: title.value,
});
onMounted(async () => {
  branches.value = await BranchService.getAll();
});
</script>
