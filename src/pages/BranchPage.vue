<template>
  <q-page padding>
    <PageHeader :search-text="search" @open-dialog="dialogState = true" />
    <q-separator class="q-my-md" />
    <DialogForm title="New Branch" v-model="dialogState" @save="handleSave">
      <template #body>
        <q-input label="Name" v-model="form.name" />
      </template>
    </DialogForm>
    <q-table :rows="branches" row-key="id" :columns="columns"></q-table>
  </q-page>
</template>

<script lang="ts" setup>
import { QTableProps, useMeta } from 'quasar';
import DialogForm from 'src/components/DialogForm.vue';
import { BranchService } from 'src/services/branches';
import { Branch } from 'src/types/branch';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const dialogState = ref(false);
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const search = ref();
const form = reactive<Branch>({
  name: '',
});
const loading = ref(false);
const branches = ref<Branch[]>([]);
const columns = ref<QTableProps['columns']>([
  {
    name: 'name',
    label: 'Name',
    field: 'name',
  },
  {
    name: 'engName',
    label: 'English Name',
    field: 'engName',
  },
  {
    name: 'abbrev',
    label: 'Abbrev',
    field: 'abbrev',
  },
  {
    name: 'curriculum',
    label: 'Curriculum',
    field: (c) => c.name,
  },
  {
    name: 'faculty',
    label: 'Faculty',
    field: (f) => f.name,
  },
]);
const handleSave = () => {
  dialogState.value = false;
};

onMounted(async () => {
  loading.value = true;
  branches.value = await BranchService.getAll();
  loading.value = false;
});

useMeta({
  title: title.value,
});
</script>
