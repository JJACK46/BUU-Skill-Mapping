<template>
  <q-page padding>
    <PageHeader
      v-model:search-text="search"
      @open-dialog="store.dialogState = true"
    />
    <q-separator class="q-my-md" />
    <DialogForm
      v-model="store.dialogState"
      title="New Subject"
      @save="store.handleSave"
    >
      <template #body>
        <q-tabs v-model="tabModel">
          <q-tab name="req" label="Requirements" />
          <q-tab name="add" label="Additional" />
        </q-tabs>
        <q-tab-panels v-model="tabModel">
          <q-tab-panel name="req">
            <q-input
              v-model="store.form.id"
              outlined
              dense
              label="ID"
              mask="########"
              :rules="[requireField]"
            />
            <q-select
              v-model="store.form.type"
              outlined
              dense
              label="Type"
              :options="Object.values(SubjectType)"
              :rules="[requireField]"
            />
            <q-input
              v-model="store.form.name"
              outlined
              dense
              label="Name"
              :rules="[requireField]"
            />
            <q-input
              v-model="store.form.engName"
              outlined
              dense
              label="Eng Name"
              :rules="[requireField]"
            />
            <q-input
              v-model="store.form.description"
              outlined
              dense
              label="Description"
              autogrow
              :rules="[requireField]"
            />
            <q-input
              v-model="store.form.credit"
              outlined
              dense
              label="Credit"
              mask="# (#-#-#)"
              :rules="[requireField]"
            />
          </q-tab-panel>
          <q-tab-panel name="add" @vue:mounted="store.fetchAllSkills">
            <q-select
              label="Skills"
              outlined
              :options="store.skillOptions"
              option-label="name"
              multiple
              use-chips
              v-model="store.form.skills"
            />
            <CustomTreeSkill :skills="store.form.skills || []" readonly />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </DialogForm>
    <q-table
      class="q-mt-md"
      :rows="store.subjects"
      :filter="search"
      :columns="columns"
      row-key="id"
      wrap-cells
    >
      <template #body-cell-skills="props">
        <q-td>
          <q-btn
            :disable="props.value === undefined || props.value.length === 0"
            icon="info"
            padding="none"
            flat
          >
            <q-popup-proxy
              :cover="false"
              anchor="top right"
              style="width: 400px"
            >
              <q-toolbar>
                <q-toolbar-title>Skills View</q-toolbar-title>
                <q-btn icon="close" flat padding="none" v-close-popup />
              </q-toolbar>
              <q-separator></q-separator>
              <CustomTreeSkill :skills="props.value || []" readonly />
            </q-popup-proxy>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts" setup>
import { QTableColumn, useMeta } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import PageHeader from 'src/components/PageHeader.vue';
import DialogForm from 'src/components/DialogForm.vue';
import { useSubjectStore } from 'src/stores/subject';
import { requireField } from 'src/utils/field-rules';
import { SubjectType } from 'src/types/subject';
import CustomTreeSkill from 'src/components/CustomTreeSkill.vue';

const tabModel = ref();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const search = ref('');
const store = useSubjectStore();

const columns: QTableColumn[] = [
  { name: 'id', label: 'ID', field: 'id' },
  { name: 'name', label: 'Name', field: 'name' },
  { name: 'engName', label: 'Eng Name', field: 'engName' },
  {
    name: 'description',
    label: 'Description',
    field: 'description',
    align: 'left',
  },
  { name: 'type', label: 'Type', field: 'type' },
  { name: 'credit', label: 'Credit', field: 'credit' },
  { name: 'skills', label: 'Skills', field: 'skills' },
];

onMounted(async () => {
  await store.setup();
});

useMeta({
  title: title.value,
});
</script>
