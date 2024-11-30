<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { QTableProps, useMeta } from 'quasar';
import { useRoute } from 'vue-router';
import { useUserStore } from 'src/stores/user';
import PageHeader from 'src/components/PageHeader.vue';
import AddUserDialog from './Dialog/addUserDialog.vue';
import deleteUserDialog from './Dialog/deleteUserDialog.vue';
import detailUserDialog from './Dialog/detailUserDialog.vue';
import { PageParams } from 'src/types/pagination';
import { User } from 'src/types/user';

const store = useUserStore();
const users = computed(() => store.users);
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const dialogFilter = ref(false);
const dialogAdd = ref(false);
const dialogDel = ref(false);
const dialogEdit = ref(false);

const userColumns: QTableProps['columns'] = [
  {
    name: 'email',
    label: 'ID',
    field: 'email',
    align: 'center' as const,
    sortable: true,
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
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

const closeDialogAddUser = () => {
  dialogAdd.value = false;
};
const closeDialogDelUser = async (item: User | null = null) => {
  store.editedUser = item;

  if (dialogDel.value) {
    dialogDel.value = false;
  } else dialogDel.value = true;
};

const closeDialogEditUser = async (item: User | null = null) => {
  store.editedUser = item;
  if (dialogEdit.value) {
    dialogEdit.value = false;
  } else dialogEdit.value = true;
};

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
      @open-dialog="dialogAdd = true"
      @open-filter="handleDialogFilter"
    />
    <q-separator class="q-my-md" />
    <q-table
      :rows="users"
      row-key="id"
      :loading="store.loading"
      :columns="userColumns"
      :filter="store.search"
      v-model:pagination="pageParams"
      @update:pagination="onRequest"
    >
      <template #body-cell-name="props">
        <q-td
          >{{ props.row.firstName || '' }} {{ props.row.lastName || '' }}</q-td
        >
      </template>
      <template #body-cell-role="props">
        <q-td>{{ props.row.role?.name || 'N/A' }}</q-td>
      </template>
      <template #body-cell-action="props">
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
                  @click="closeDialogEditUser(props.row)"
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
                  @click="closeDialogDelUser(props.row)"
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

    <!-- AddUserDialog component -->
    <AddUserDialog
      :visible="dialogAdd"
      @close-dialog="closeDialogAddUser"
      :item="null"
    />
    <deleteUserDialog
      :visible="dialogDel"
      :item="store.editedUser"
      @close-dialog="closeDialogDelUser"
    />
    <detailUserDialog
      :visible="dialogEdit"
      :item="store.editedUser"
      @close-dialog="closeDialogEditUser"
    />
  </q-page>
</template>
