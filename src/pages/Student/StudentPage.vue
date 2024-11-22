<template>
  <q-page padding>
    <PageHeader
      @open-dialog="store.toggleDialog"
      :search-text="search"
      import-btn
      @open-dialog-import="store.toggleDialogImport"
    ></PageHeader>
    <q-separator class="q-my-md" />
    <!-- Table -->
    <q-table
      class="q-animate--fade"
      separator="cell"
      :rows="store.students"
      row-key="id"
      :loading="global.getLoadingState"
      :columns="studentColumns"
    >
      <template #body-cell-info="props">
        <q-td>
          <q-btn
            icon="info"
            padding="none"
            flat
            @click="handleClickInfo(props.row.id)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
    <!-- import btn -->
    <DialogForm
      title="Import Students"
      v-model="store.dialogImport"
      @save="handleImport"
      full-width
    >
      <template #body>
        <TableSheetJS
          ref="sheet"
          @download-template="downloadTemplateForStudents"
        />
      </template>
    </DialogForm>
    <!-- add btn -->
    <DialogForm
      :title="store.getTitleForm"
      v-model="store.dialogState"
      @save="store.handleSave"
    >
      <template #body>
        <q-select
          :options="branches"
          option-label="name"
          @vue:mounted="async () => (branches = await BranchService.getAll())"
          outlined
          v-model="store.formStudent.branch"
          label="Branch *"
          clearable
          :rules="[requireField]"
        />
        <q-input
          outlined
          v-model="store.formStudent.name"
          label="Name *"
          clearable
          :rules="[requireField]"
        />
        <q-input
          outlined
          v-model="store.formStudent.engName"
          label="English Name *"
          clearable
          :rules="[requireField]"
        />
        <q-input
          label="Date Enrolled"
          readonly
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
                  <div class="row items-left justify-end">
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
import { QTableColumn, useMeta } from 'quasar';
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStudentStore } from 'src/stores/student';
import { requireField } from 'src/utils/field-rules';
import { BranchService } from 'src/services/branches';
import { Branch } from 'src/types/branch';
import DialogForm from 'src/components/DialogForm.vue';
import { StudentService } from 'src/services/student';
import PageHeader from 'src/components/PageHeader.vue';
import TableSheetJS from 'src/components/TableSheetJS.vue';
import { useGlobalStore } from 'src/stores/global';
import { downloadTemplateForStudents } from 'src/utils/file-template';

const global = useGlobalStore();
const router = useRouter();
const search = ref('');
const store = useStudentStore();
const branches = ref<Branch[]>([]);
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const studentColumns: QTableColumn[] = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'left',
    sortable: true,
  },
  {
    name: 'email',
    label: 'Email',
    field: (s) => s.email || 'Unknown',
    align: 'left',
    sortable: true,
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left',
  },
  {
    name: 'engName',
    label: 'English Name',
    field: 'engName',
    align: 'left',
  },
  {
    name: 'branch',
    label: 'Branch',
    field: (s) => s.branch?.name ?? 'Unknown',
    align: 'left',
  },
  {
    name: 'info',
    label: 'More Info',
    field: '',
    align: 'left',
  },
  {
    name: 'actions',
    label: 'Actions',
    field: '',
    align: 'left',
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

const sheet = ref();

function handleClickInfo(id: number | string) {
  router.push(`/students/${id}`);
}

async function handleImport() {
  await StudentService.postImportedStudents(sheet.value.items);
}

useMeta({
  title: title.value,
});
onMounted(async () => {
  await store.fetchData();
});
</script>
