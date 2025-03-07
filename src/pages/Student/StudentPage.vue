<template>
  <q-page padding>
    <MainHeader
      @open-dialog="store.toggleDialog"
      :search-text="search"
      import-btn
      @open-dialog-import="store.toggleDialogImport"
    ></MainHeader>
    <q-separator class="q-my-md" />
    <!-- Table -->
    <q-table
      flat
      bordered
      class="q-animate--fade"
      separator="cell"
      :rows="store.getStudents"
      row-key="id"
      :pagination="store.pagination"
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
      <FieldBranchOptions v-model="store.formStudent.branchId" />
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
      <q-input label="Date Enrolled" readonly outlined v-model="fieldDate">
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
    </DialogForm>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { QTableColumn } from 'quasar';
import { useMeta } from 'quasar';
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStudentStore } from 'src/stores/student';
import { requireField } from 'src/utils/field-rules';
import DialogForm from 'src/components/DialogForm.vue';
import { StudentService } from 'src/services/student';

import TableSheetJS from 'src/components/TableSheetJS.vue';
import { useGlobalStore } from 'src/stores/global';
import { downloadTemplateForStudents } from 'src/utils/file-template';
import MainHeader from 'src/components/PageHeader.vue';
import FieldBranchOptions from 'src/components/FieldBranchOptions.vue';

const global = useGlobalStore();
const router = useRouter();
const search = ref('');
const store = useStudentStore();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const fieldDate = store.formStudent.dateEnrollment as string;
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
