<template>
  <q-page padding>
    <PageHeader :search-text="search" @open-dialog="store.toggleDialog" />
    <q-separator class="q-my-md" />
    <DialogForm title="New Branch" v-model="store.dialogState" @save="store.handleSave">
      <template #body>
        <q-input outlined dense label="Name *" v-model="store.form.name" :rules="[requireField, onlyAlphabet]" />
        <q-input outlined dense label="English Name *" v-model="store.form.engName"
          :rules="[requireField, onlyAlphabet]" />
        <q-select outlined dense label="Faculty *" :options="faculties" v-model="store.form.faculty"
          :rules="[requireField]" @vue:mounted="fetchFaculties" option-label="name" options-dense />
        <q-input outlined dense label="Abbreviation *" v-model="store.form.abbreviation"
          :rules="[requireField, onlyAlphabet]" />
      </template>
    </DialogForm>
    <q-table :loading="global.getLoadingState" :pagination="store.pagination" class="q-animate--fade" separator="cell"
      :rows="branches" row-key="id" :columns="columns" wrap-cells></q-table>
  </q-page>
</template>

<script lang="ts" setup>
import { QTableProps, useMeta } from 'quasar';
import DialogForm from 'src/components/DialogForm.vue';
import PageHeader from 'src/components/PageHeader.vue';
import { BranchService } from 'src/services/branches';
import { FacultyService } from 'src/services/faculty';
import { useBranchStore } from 'src/stores/branch';
import { useGlobalStore } from 'src/stores/global';
import { Branch } from 'src/types/branch';
import { Faculty } from 'src/types/faculty';
import { onlyAlphabet, requireField } from 'src/utils/field-rules';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const global = useGlobalStore()
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const search = ref();
const store = useBranchStore()
const loading = ref(false);
const branches = ref<Branch[]>([]);
const faculties = ref<Faculty[]>([])
const columns = ref<QTableProps['columns']>([
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left'
  },
  {
    name: 'engName',
    label: 'English Name',
    field: 'engName',
    align: 'left'
  },

  {
    name: 'curriculum',
    label: 'Curriculum',
    field: (c) => c.name,
    align: 'left'
  },
  {
    name: 'faculty',
    label: 'Faculty',
    field: (f) => f.name,
    align: 'left'
  },
  {
    name: 'abbrev',
    label: 'Abbrev',
    field: 'abbrev',
    align: 'left'
  },
]);

const fetchFaculties = async () => {
  faculties.value = await FacultyService.getAll()
}

onMounted(async () => {
  loading.value = true;
  branches.value = await BranchService.getAll();
  loading.value = false;
});

useMeta({
  title: title.value,
});
</script>
