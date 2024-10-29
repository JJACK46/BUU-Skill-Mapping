<template>
  <q-page padding>
    <PageHeader
      @open-dialog="addDialog = true"
      :search-text="search"
      import-btn
      @open-dialog-import="importDialog = true"
    ></PageHeader>
    <q-separator class="q-my-md" />
    <q-table
      :rows="store.students"
      row-key="id"
      :loading="store.loading"
      :columns="studentColumns"
    >
    </q-table>
    <!-- import btn -->
    <DialogForm
      title="Import Students"
      v-model="importDialog"
      @save="handleImport"
    >
      <template #body>
        <q-separator />
        <TableSheetJS text="import" ref="sheet" />
      </template>
    </DialogForm>
    <!-- add btn -->
    <DialogForm
      title="New Student"
      v-model="addDialog"
      @save="store.handleSave"
    >
      <template #body>
        <q-input
          outlined
          v-model="store.formStudent.name"
          label="Name"
          clearable
          :rules="[requireField]"
        />
        <q-input
          outlined
          v-model="store.formStudent.engName"
          label="English Name"
          clearable
          :rules="[requireField]"
        />
        <q-input
          label="Date Enrolled"
          outlined
          v-model="(store.formStudent.dateEnrollment as string)"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="store.formStudent.dateEnrollment"
                  mask="YYYY-MM-DD"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </template>
    </DialogForm>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { QTableProps, useMeta } from 'quasar';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStudentStore } from 'src/stores/student';
// import SearchData from 'src/components/SearchData.vue';
// import AddButton from 'src/components/AddButton.vue';
import { requireField } from 'src/utils/field-rules';
import { BranchService } from 'src/services/branches';
import { Branch } from 'src/types/branch';
import DialogForm from 'src/components/DialogForm.vue';
import { StudentService } from 'src/services/student';
import PageHeader from 'src/components/PageHeader.vue';
import TableSheetJS from 'src/components/TableSheetJS.vue';

const importDialog = ref(false);
const search = ref('');
const store = useStudentStore();
const branches = ref<Branch[]>([]);
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
// const isCreate = ref(false);
const addDialog = ref(false);
const studentColumns: QTableProps['columns'] = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'center',
    sortable: true,
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    align: 'center',
    sortable: true,
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'center',
  },
  {
    name: 'engName',
    label: 'EngName',
    field: 'engName',
    align: 'center',
  },
];

// const paginationInit = ref<QTableProps['pagination']>({
//   sortBy: '',
//   descending: false,
//   page: 1,
//   rowsPerPage: 10,
// });

// const addStudent = () => {
//   isCreate.value = true;
//   addDialog.value = true;
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// function onRequest(props: any) {
//   studentStore.pageParams.page = props.page;
//   studentStore.pageParams.limit = props.rowsPerPage;
//   studentStore.pageParams.sort = props.sortBy;
//   studentStore.pageParams.order = props.descending ? 'DESC' : 'ASC';
//   studentStore.pageParams.search = props.search;
//   studentStore.fetchData();
// }

function handleImport() {
  // something here
}

useMeta({
  title: title.value,
});
onMounted(async () => {
  branches.value = await BranchService.getAll();
  store.students = await StudentService.getAll();
});
</script>
