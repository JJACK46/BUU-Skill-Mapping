<template>
  <div class="q-py-md">
    <div class="text-h4 text-primary">CLOS</div>
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
      <div class="row justify-between">
        <div class="col-6">
          <q-input
            v-model="store.form.name"
            outlined
            dense
            :label="t('Name')"
          />
        </div>
        <div class="col-5">
          <q-select
            v-model="store.form.expectedLevel"
            :options="[1, 2, 3, 4, 5]"
            outlined
            dense
            :label="t('Expected Level')"
          />

          <!-- <q-input
            v-model="store.form.expectedLevel"
            outlined
            dense
            :label="t('expectedLevel')"
            mask="########"
          /> -->
        </div>
      </div>
      <div class="row justify-between">
        <div class="col-6">
          <q-input
            v-model="store.form.id"
            outlined
            dense
            :label="t('PLO ID')"
            mask="########"
          />
        </div>
        <div class="col-5">
          <q-input
            v-model="store.form.id"
            outlined
            dense
            :label="t('Search')"
            mask="########"
          />
        </div>
      </div>
      <div class="row justify-between">
        <div class="col-6">
          <q-input
            v-model="store.form.id"
            outlined
            dense
            :label="t('Skill ID')"
            mask="########"
          />
        </div>
        <div class="col-5">
          <q-input
            v-model="store.form.id"
            outlined
            dense
            :label="t('Search')"
            mask="########"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <q-input
            dense
            type="textarea"
            outlined
            v-model="store.form.description"
            :label="t('description') + ' *'"
          />
        </div>
      </div>
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
import { useClostore } from 'src/stores/clos';
import DialogForm from 'src/components/DialogForm.vue';
import MainHeader from 'src/components/PageHeader.vue';
import { useI18n } from 'vue-i18n';
// import { requireField } from 'src/utils/field-rules';

const { t } = useI18n();
const global = useGlobalStore();
const store = useClostore();
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
    name: 'CLOs 1',
    description: 'description',
    expectedLevel: 2,
    plo: 1,
    skill: 1,
  },
  {
    id: 2,
    name: 'CLOs 2',
    description: 'description',
    expectedLevel: 2,
    plo: 1,
    skill: 1,
  },
  {
    id: 3,
    name: 'CLOs 3',
    description: 'description',
    expectedLevel: 2,
    plo: 1,
    skill: 1,
  },
]);
</script>
