<template>
  <div class="text-h4 text-primary">PLO</div>
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
        :label="t('type')"
        :rules="[requireField]"
        counter
        maxlength="300"
      />
      <q-input
        dense
        type="textarea"
        outlined
        class="col-12"
        v-model="store.form.thaiDescription"
        :label="t('description')"
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
        :label="t('englishDescription')"
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
    :rows="store.getListPLO"
    :columns="columns"
    row-key="name"
    wrap-cells
    separator="cell"
    @update:pagination="store.fetchAll"
  >
    <template #body-cell-number="props">
      <q-td>
        {{ props.rowIndex + 1 }}
      </q-td>
    </template>
    <template #body-cell-actions="props">
      <ActionsCell
        @handle-delete="store.handleDelete(props.row.id)"
        @handle-edit="store.handleEdit(props.row)"
      />
    </template>
  </q-table>
</template>

<script lang="ts" setup>
import type { QTableColumn } from 'quasar';
import { useGlobalStore } from 'src/stores/global';
import { onMounted, ref } from 'vue';
import { usePloStore } from 'src/stores/plo';
import DialogForm from 'src/components/DialogForm.vue';
import { useI18n } from 'vue-i18n';
import { requireField } from 'src/utils/field-rules';
import ActionsCell from 'src/components/ActionsCell.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { t } = useI18n();
const global = useGlobalStore();
const store = usePloStore();
const columns = ref<QTableColumn[]>([
  {
    name: 'number',
    label: t('no'),
    field: 'no',
    align: 'left',
    style: 'width: 60px',
  },
  {
    name: 'name',
    label: t('name'),
    field: 'name',
    align: 'left',
    style: 'width: 150px',
  },
  {
    name: 'thaiDescription',
    label: t('thaiDescription'),
    field: 'thaiDescription',
    align: 'left',
    style:
      'max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
  },
  {
    name: 'engDescription',
    label: t('engDescription'),
    field: 'engDescription',
    align: 'left',
    style:
      'max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
  },
  {
    name: 'type',
    label: t('type'),
    field: 'type',
    align: 'left',
    style: 'width: 120px',
  },
  {
    name: 'actions',
    label: t('actions'),
    field: '',
    align: 'left',
    style: 'width: 120px',
  }, // กำหนดขนาด
]);
onMounted(async () => {
  store.filterModel.curriculumCode = route.params.code as string;
  await store.fetchAll(); // เรียกใช้ store เพื่อดึงข้อมูล
});
</script>
