<template>
  <div class="q-py-md">
    <div class="text-h4 text-primary">PLO</div>
  </div>
  <div class="flex justify-end">
    <q-btn
      unelevated
      color="primary"
      :label="t('add')"
      @click="store.handleCreate"
    />
  </div>
  <DialogForm
    v-model="store.dialogState"
    :title="store.getDialogTitle"
    @save="store.handleSave"
    ref="formRef"
  >
    <div class="row q-gutter-y-md">
      <q-input
        v-model="store.form.name"
        outlined
        dense
        class="col-12"
        :label="t('name')"
        :rules="[requireField]"
      />
      <q-input
        dense
        outlined
        class="col-12"
        v-model="store.form.type"
        :label="t('type') + ' *'"
        :rules="[requireField]"
      />
      <q-input
        dense
        type="textarea"
        outlined
        class="col-12"
        v-model="store.form.thaiDescription"
        :label="t('description') + ' *'"
        :rules="[requireField]"
        counter
        maxlength="300"
      />
      <q-input
        dense
        type="textarea"
        outlined
        class="col-12"
        v-model="store.form.engDescription"
        :label="t('englishDescription') + ' *'"
        :rules="[requireField]"
        counter
        maxlength="300"
      />
    </div>
  </DialogForm>
  <q-table
    flat
    bordered
    :loading="global.getLoadingState"
    class="q-mt-md q-animate--fade"
    :rows="store.getListPlo"
    :columns="columns"
    row-key="name"
    wrap-cells
    separator="cell"
    @update:pagination="store.fetchAll"
  >
    <template #body-cell-actions> </template>
  </q-table>
</template>

<script lang="ts" setup>
import type { QTableColumn } from 'quasar';
import { useGlobalStore } from 'src/stores/global';
import { ref } from 'vue';
import { usePloStore } from 'src/stores/plo';
import DialogForm from 'src/components/DialogForm.vue';
import { useI18n } from 'vue-i18n';
import { requireField } from 'src/utils/field-rules';

const { t } = useI18n();
const global = useGlobalStore();
const store = usePloStore();
const columns = ref<QTableColumn[]>([
  { name: 'no', label: 'No.', field: 'no', align: 'left' },
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  {
    name: 'description',
    label: 'Description',
    field: 'description',
    align: 'left',
  },
  {
    name: 'engDescription',
    label: 'English Description',
    field: 'engDescription',
    align: 'left',
  },
  { name: 'actions', label: 'Actions', field: '', align: 'left' },
]);
</script>
