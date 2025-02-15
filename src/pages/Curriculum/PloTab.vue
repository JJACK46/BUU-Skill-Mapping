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
        type="textarea"
        outlined
        class="col-12"
        v-model="store.form.thaiDescription"
        :label="t('thaiDescription') + ' *'"
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
      <q-input
        dense
        outlined
        class="col-12"
        v-model="store.form.type"
        :label="t('type') + ' *'"
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
      <q-input
        dense
        outlined
        class="col-12"
        v-model="store.form.type"
        :label="t('type') + ' *'"
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
    :rows="store.getData"
    :columns="columns"
    row-key="name"
    wrap-cells
    separator="cell"
    @update:pagination="store.fetchAll"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td>{{ props.rowIndex + 1 }}</q-td>
        <q-td key="name" :props="props" width="400px">{{
          props.row.name
        }}</q-td>
        <q-td key="thaiDescription" :props="props">{{
          props.row.thaiDescription
        }}</q-td>
        <q-td key="engDescription" :props="props">{{
          props.row.engDescription
        }}</q-td>
        <q-td key="type" :props="props">{{ props.row.type }}</q-td>
        <q-td
          key="actions"
          :props="props"
          style="width: 120px; white-space: nowrap"
        >
          <div class="flex items-center gap-2">
            <q-btn
              flat
              dense
              round
              color="primary"
              icon="edit"
              @click="store.handleEdit(props.row)"
            />
            <q-btn
              flat
              dense
              round
              color="negative"
              icon="delete"
              @click="store.handleDelete(props.row.id)"
            />
          </div>
        </q-td>
      </q-tr>
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

const { t } = useI18n();
const global = useGlobalStore();
const store = usePloStore();
const columns = ref<QTableColumn[]>([
  {
    name: 'no',
    label: 'No.',
    field: 'no',
    align: 'left',
    style: 'width: 60px',
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left',
    style: 'width: 150px',
  },
  {
    name: 'thaiDescription',
    label: 'Thai Description',
    field: 'thaiDescription',
    align: 'left',
    style:
      'max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
  },
  {
    name: 'engDescription',
    label: 'English Description',
    field: 'engDescription',
    align: 'left',
    style:
      'max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
  },
  {
    name: 'type',
    label: 'Type',
    field: 'type',
    align: 'left',
    style: 'width: 120px',
  },
  {
    name: 'actions',
    label: 'Actions',
    field: '',
    align: 'left',
    style: 'width: 120px',
  }, // กำหนดขนาด
]);
onMounted(() => {
  store.fetchAll(); // เรียกใช้ store เพื่อดึงข้อมูล
});
</script>
