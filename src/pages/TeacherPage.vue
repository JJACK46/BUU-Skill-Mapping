<template>
  <q-page padding>
    <PageHeader
      :search-text="teacherStore.search"
      @open-dialog="teacherStore.dialogState = true"
    />
    <q-input
      outlined
      clearable
      label="Search"
      class="col"
      v-model="teacherStore.pageParams.search"
      dense
      style="width: 300px"
      @keydown.enter="teacherStore.fetchData"
    >
      <template v-slot:append>
        <q-icon name="search">
          <template #default></template>
        </q-icon>
      </template>
    </q-input>

    <q-separator class="q-my-md" />

    <q-table
      :rows="teacherStore.teachers"
      row-key="name"
      :loading="teacherStore.loading"
      :columns="teacherColumns"
      v-model:pagination="paginationInit"
      @update:pagination="onRequest"
    >
    </q-table>
    <q-dialog v-model="teacherStore.dialogState">
      <q-card>
        <div class="q-pa-md text-h5">New User</div>
        <q-card-section class="flex q-gutter-md">
          <q-input
            outlined
            v-model="teacherStore.formTeacher.email"
            label="Email"
          ></q-input>
        </q-card-section>
        <q-card-actions class="justify-end">
          <q-btn flat @click="teacherStore.dialogState = false"> cancel </q-btn>
          <q-btn flat color="positive"> save </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useMeta } from 'quasar';
import PageHeader from 'src/components/PageHeader.vue';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTeacherStore } from 'src/stores/teacher';

const teacherStore = useTeacherStore();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);

const teacherColumns = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'center' as const,
    sortable: true,
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    align: 'center' as const,
    sortable: true,
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'center' as const,
  },
  {
    name: 'engName',
    label: 'EngName',
    field: 'engName',
    align: 'center' as const,
  },
  {
    name: 'tel',
    label: 'Tel',
    field: 'tel',
    align: 'center' as const,
  },
  {
    name: 'position',
    label: 'Position',
    field: 'position',
    align: 'center' as const,
  },
];

const paginationInit = ref({
  sortBy: '',
  descending: false,
  page: 1,
  rowsPerPage: 10,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onRequest(props: any) {
  console.log(props);
  teacherStore.pageParams.page = props.page;
  teacherStore.pageParams.limit = props.rowsPerPage;
  teacherStore.pageParams.sort = props.sortBy;
  teacherStore.pageParams.order = props.descending ? 'DESC' : 'ASC';
  teacherStore.pageParams.search = props.search;
  teacherStore.fetchData();
}

useMeta({
  title: title.value,
});
onMounted(async () => {});
</script>
