<script lang="ts" setup>
import type { QTableColumn } from 'quasar';
import { useGlobalStore } from 'src/stores/global';
import { ref } from 'vue';
// import type { TitleFormPlo } from 'src/stores/plos';
import type { TitleFormPlo } from 'src/stores/plos';
import { usePlostore } from 'src/stores/plos';
import DialogForm from 'src/components/DialogForm.vue';
import MainHeader from 'src/components/PageHeader.vue';
import { useI18n } from 'vue-i18n';
import { requireField, onlyEnglish, onlyThai } from 'src/utils/field-rules';
// import type { Plo } from 'src/types/plo';
import { useCurriculumStore } from 'src/stores/curriculum';
import type { Plo } from 'src/types/plo';
const curr = useCurriculumStore();

const { t } = useI18n();
const global = useGlobalStore();
const store = usePlostore();
const columns = ref<QTableColumn[]>([
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  {
    name: 'type',
    label: 'Type',
    field: 'name',
    align: 'left',
  },

  {
    name: 'thaiDescription',
    label: 'Thai Description',
    field: 'description',
    align: 'left',
  },
  {
    name: 'englishDescription',
    label: 'English Description',
    field: 'description',
    align: 'left',
  },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'left' },
]);
const rowIndex = ref(-1);
const selectedItem = ref<Plo | null>(null);
const savePlo = (pl: Plo, rowIndex: number) => {
  if (!curr.form.plos) {
    curr.form.plos = [];
  }
  if (rowIndex >= 0) {
    curr.form.plos.splice(rowIndex, 1, pl);
    selectedItem.value = pl;
  } else {
    curr.form.plos.push(pl);
  }
};

const handleAdd = (title: TitleFormPlo, rowIndex: number) => {
  if (title === 'New Plo') {
    savePlo(store.form as Plo, rowIndex);
  }
  store.dialogState = false;
};

// function savePlos() {
//   const payload = {
//     name: store.form.name,
//     engDescription: store.form.engDescription,
//     thaiDescription: store.form.thaiDescription,
//     type: store.form.type,
//   };

//   console.log('Saving:', payload);

//   // if (payload.id) {
//   //   store.handleUpdate(payload); // ถ้ามี id ให้เรียกอัปเดต
//   // } else {
//   // }
//   store.handleSave(payload);

//   store.dialogState = false; // ปิด Dialog
// }
</script>

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
    @save="handleAdd(store.titleForm, rowIndex)"
    ref="formRef"
  >
    <q-input
      v-model="store.form.name"
      outlined
      dense
      :label="t('name')"
      :rules="[requireField]"
    />
    <q-input
      dense
      type="textarea"
      outlined
      v-model="store.form.thaiDescription"
      :label="t('thai description') + ' *'"
      :rules="[requireField, onlyThai]"
    />
    <q-input
      dense
      type="textarea"
      outlined
      v-model="store.form.engDescription"
      :label="t('english description') + ' *'"
      :rules="[requireField, onlyEnglish]"
    />
    <q-input
      dense
      outlined
      v-model="store.form.type"
      :label="t('ลักษณะ') + ' *'"
      :rules="[requireField]"
    />
  </DialogForm>
  <q-table
    flat
    bordered
    :loading="global.getLoadingState"
    class="q-mt-md q-animate--fade"
    :rows="curr.getPlos"
    :columns="columns"
    row-key="id"
    wrap-cells
    separator="cell"
    @update:pagination="store.fetchData"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td>
          {{ props.rowIndex + 1 }}
        </q-td>
        <q-td key="id">
          {{ props.row.id }}
        </q-td>
        <q-td key="name" width="400px">
          {{ props.row.name }}
        </q-td>
        <q-td key="thaiDescription" width="400px">
          {{ props.row.thaiDescription }}
        </q-td>
        <q-td key="englishDescription">
          {{ props.row.engDescription }}
        </q-td>
        <q-td key="type">
          {{ props.row.type }}
        </q-td>
        <q-td>
          <q-btn flat dense round color="grey-8" icon="edit" />
          <q-btn
            flat
            dense
            round
            color="grey-8"
            icon="delete"
            class="q-ml-sm"
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
