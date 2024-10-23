<script lang="ts" setup>
import { ref } from 'vue';
import { QTableProps, useMeta } from 'quasar';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from 'src/stores/user';
import PageHeader from 'src/components/PageHeader.vue';
import { PageParams } from 'src/types/pagination';

const store = useUserStore();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const dialogFilter = ref(false);
const teacherColumns: QTableProps['columns'] = [
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
    align: 'center',
    sortable: true,
  },
  {
    name: 'role',
    label: 'Role',
    field: 'role',
    align: 'center',
    sortable: true,
  },
  {
    name: 'action',
    label: '',
    field: 'action',
    align: 'center',
    sortable: true,
  },
];
const pageParams = ref<PageParams>({
  page: 1,
  limit: 10,
  sort: '',
  order: 'ASC',
  search: '',
  columnId: '',
  columnName: '',
});
// const paginationInit = ref<QTableProps['pagination']>({
//   sortBy: '',
//   descending: false,
//   page: 1,
//   rowsPerPage: 10,
// });
const handleDialogFilter = () => {
  dialogFilter.value = !dialogFilter.value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onRequest(props: any) {
  store.pageParams.page = props.page;
  store.pageParams.limit = props.rowsPerPage;
  store.pageParams.sort = props.sortBy;
  store.pageParams.order = props.descending ? 'DESC' : 'ASC';
  store.pageParams.search = props.search;
  store.fetchUserPage(pageParams.value);
}

useMeta({
  title: title.value,
});
onMounted(async () => {
  await store.fetchUserPage(pageParams.value);
  console.log(store.users);
});
</script>

<template>
  <q-page padding>
    <PageHeader
      v-model:search-text="store.search"
      @open-dialog="store.dialogState = true"
      @open-filter="handleDialogFilter"
    />
    <q-separator class="q-my-md" />
    <q-table
      :rows="store.users"
      row-key="name"
      :loading="store.loading"
      :items="store.users"
      :columns="teacherColumns"
      :filter="store.search"
      v-model:pagination="pageParams"
      @update:pagination="onRequest"
    >
      <template #body-cell-action>
        <q-td>
          <q-btn icon="more_vert" padding="none" flat>
            <q-popup-proxy
              :cover="false"
              anchor="top right"
              style="width: 150px"
            >
              <q-list>
                <q-item
                  clickable
                  onmouseenter="this.style.color='red'"
                  onmouseleave="this.style.color=''"
                  v-close-popup
                >
                  <q-item-section> Edit</q-item-section>
                  <q-item-section avatar>
                    <q-icon name="edit" />
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  onmouseenter="this.style.color='red'"
                  onmouseleave="this.style.color=''"
                  v-close-popup
                >
                  <q-item-section> Delete</q-item-section>
                  <q-item-section avatar>
                    <q-icon name="delete" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-popup-proxy>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>
