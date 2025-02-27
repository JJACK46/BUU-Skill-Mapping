<template>
  <q-page padding>
    <MainHeader
      v-model:search-text="store.search"
      @open-dialog="store.handleOpenDialog"
      hide-filter
    />
    <q-separator class="q-my-md" />

    <!-- Add & Edit Dialog -->
    <DialogForm
      v-model="store.dialogState"
      :title="store.getDialogTitle"
      @save="store.handleSave"
      ref="formRef"
      v-model:form-valid="formValid"
    >
      <q-tabs v-model="store.tabsModel"> </q-tabs>
      <q-tab-panels v-model="store.tabsModel">
        <q-tab-panel name="req" class="q-gutter-y-md">
          <q-input
            v-model="store.form.code"
            outlined
            dense
            label="ID *"
            mask="########"
            :rules="[requireField]"
          />
          <q-input
            v-model="store.form.thaiName"
            outlined
            dense
            label="Name *"
            :rules="[requireField, onlyThai]"
          />
          <q-input
            v-model="store.form.engName"
            outlined
            dense
            label="Eng Name *"
            :rules="[requireField, onlyEnglish]"
          />
        </q-tab-panel>
      </q-tab-panels>
    </DialogForm>
    <!-- Table -->
    <q-table
      flat
      bordered
      :loading="global.getLoadingState"
      :pagination="store.pagination"
      class="q-mt-md q-animate--fade"
      :rows="store.getSubjects"
      :filter="store.search"
      :columns="columns"
      row-key="id"
      wrap-cells
      separator="cell"
    >
      <template #body-cell-description="props">
        <q-td style="max-width: 300px">
          {{ props.value }}
        </q-td>
      </template>
      <template #body-cell-credit="props">
        <q-td style="min-width: 90px">
          {{ props.value }}
        </q-td>
      </template>

      <template #body-cell-actions="props">
        <q-td class="q-gutter-x-sm" style="min-width: 100px">
          <q-btn
            icon="edit"
            padding="none"
            flat
            @click="store.handleOpenDialog(props.row)"
          ></q-btn>
          <q-btn
            icon="delete"
            padding="none"
            flat
            @click="store.removeSubject(props.row.id)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts" setup>
import type { QTableColumn } from 'quasar';
import { useMeta } from 'quasar';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import DialogForm from 'src/components/DialogForm.vue';
import { useLessonStore } from 'src/stores/lesson';
import { onlyEnglish, onlyThai, requireField } from 'src/utils/field-rules';
import { useGlobalStore } from 'src/stores/global';
import MainHeader from 'src/components/PageHeader.vue';

const global = useGlobalStore();
const route = useRoute();
const title = computed(() => route.matched[1]?.name as string);
const store = useLessonStore();
const formRef = ref();
const formValid = ref<boolean>(false);

const columns = ref<QTableColumn[]>([
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'engName', label: 'Eng Name', field: 'engName', align: 'left' },
  {
    name: 'description',
    label: 'Description',
    field: 'description',
    align: 'left',
  },
  { name: 'type', label: 'Type', field: 'type', align: 'left' },
  { name: 'credit', label: 'Credit', field: 'credit', align: 'left' },
  {
    name: 'skills',
    label: 'Skills',
    field: 'skillExpectedLevels',
    align: 'left',
  },
]);

// onMounted(async () => {
//   await store.fetchData();
//   if (auth.isAdmin) {
//     columns.value.push({
//       name: 'actions',
//       label: 'Actions',
//       field: 'actions',
//       align: 'left',
//     });
//   }
// });

useMeta({
  title: title.value,
});
</script>
