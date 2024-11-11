<template>
  <q-page padding>
    <PageHeader v-model:search-text="search" @open-dialog="dialogState = true" />
    <q-separator class="q-my-md" />
    <q-table :rows="users" :columns="columns" row-key="name" :loading="loading" :filter="search" wrap-cells>
    </q-table>
    <DialogForm v-model="dialogState" title="New User">
      <template #body>
        <q-input outlined v-model="formUser.email" label="Email"></q-input>
      </template>
    </DialogForm>
  </q-page>
</template>

<script lang="ts" setup>
import { QTableColumn, useMeta } from 'quasar';
import DialogForm from 'src/components/DialogForm.vue';
import PageHeader from 'src/components/PageHeader.vue';
import { UserService } from 'src/services/user';
import { User } from 'src/types/user';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const dialogState = ref(false);
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const search = ref();
const formUser = reactive<User>({
  id: 0,
  email: '',
  role: { id: 1, name: 'Admin' },
});
const users = ref([]);
const loading = ref(false);

const columns = ref(<QTableColumn[]>[
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'left',
    sortable: true,
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    align: 'left',
  },
  {
    name: 'role',
    label: 'Role',
    field: 'role',
    align: 'left',
  },
])

useMeta({
  title: title.value,
});
onMounted(async () => {
  loading.value = true;
  users.value = await UserService.getAll();
  loading.value = false;
});
</script>
