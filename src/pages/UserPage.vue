<template>
  <q-page padding>
    <PageHeader v-model:search-text="search" @open-dialog="dialogState = true" />
    <q-separator class="q-my-md" />
    <q-table :rows="users" :columns="columns" row-key="name" :loading="loading" :filter="search" wrap-cells>
    </q-table>
    <DialogForm v-model="dialogState" title="New User" @save="store.handleSave">
      <template #body>
        <q-input outlined v-model="store.form.email" label="Email" :rules="[requireField]" />
        <q-input type="password" outlined v-model="store.form.password" label="Password" :rules="[requireField]" />
        <q-select :options="roles" option-label="name" outlined v-model="store.form.role" label="Role"
          @vue:mounted="fetchRole" :rules="[requireField]" />
      </template>
    </DialogForm>
  </q-page>
</template>

<script lang="ts" setup>
import { QTableColumn, useMeta } from 'quasar';
import DialogForm from 'src/components/DialogForm.vue';
import PageHeader from 'src/components/PageHeader.vue';
import { RoleService } from 'src/services/role';
import { UserService } from 'src/services/user';
import { useUserStore } from 'src/stores/user';
import { Role } from 'src/types/role';
import { requireField } from 'src/utils/field-rules';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const store = useUserStore()
const dialogState = ref(false);
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const search = ref();
const roles = ref<Role[]>([])
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

const fetchRole = async () => {
  roles.value = await RoleService.getAll();
}

useMeta({
  title: title.value,
});
onMounted(async () => {
  loading.value = true;
  users.value = await UserService.getAll();
  loading.value = false;
});
</script>
