<template>
  <div class="q-py-md">
    <div class="text-h4 text-primary">PLO</div>
  </div>
  <MainHeader
    v-model:search-text="store.search"
    @open-dialog="store.handleOpenDialog"
    hide-filter
  />
  <DialogForm
    v-model="store.dialogState"
    :title="store.getDialogTitle"
    ref="formRef"
  >
    <template #body>
      <q-input
        v-model="store.form.id"
        outlined
        dense
        :label="t('name')"
        mask="########"
        :rules="[requireField]"
      />
      <q-input
        dense
        type="textarea"
        outlined
        v-model="store.form.description"
        :label="t('description') + ' *'"
        :rules="[requireField]"
      />
    </template>
  </DialogForm>
  <q-table
    flat
    bordered
    :loading="global.getLoadingState"
    class="q-mt-md q-animate--fade"
    :rows="rows"
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
        <q-td key="name" :props="props" width="400px">
          {{ props.row.name }}
        </q-td>
        <q-td key="description" :props="props">
          {{ props.row.description }}
        </q-td>
        <q-td>
          <q-btn flat dense round color="primary" icon="edit" />
          <q-btn
            flat
            dense
            round
            color="negative"
            icon="delete"
            class="q-ml-sm"
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
import type { QTableColumn } from 'quasar';
import { useGlobalStore } from 'src/stores/global';
import { ref } from 'vue';
import { usePlostore } from 'src/stores/pols';
import DialogForm from 'src/components/DialogForm.vue';
import MainHeader from 'src/components/PageHeader.vue';
import { useI18n } from 'vue-i18n';
import { requireField } from 'src/utils/field-rules';

const { t } = useI18n();
const global = useGlobalStore();
const store = usePlostore();
const columns = ref<QTableColumn[]>([
  { name: 'no', label: 'No.', field: 'no', align: 'left' },
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  {
    name: 'description',
    label: 'Dscription',
    field: 'description',
    align: 'left',
  },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'left' },
]);

const rows = ref([
  {
    id: 1,
    name: 'PLO 1',
    description: '1',
  },
  {
    id: 2,
    name: 'PLO 2',
    description: '1',
  },
  {
    id: 3,
    name: 'PLO 3',
    description: '1',
  },
]);
</script>
