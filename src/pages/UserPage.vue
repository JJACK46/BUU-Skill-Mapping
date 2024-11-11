<template>
  <q-page padding>
    <PageHeader
      v-model:search-text="search"
      @open-dialog="dialogState = true"
    />
    <q-separator class="q-my-md" />
    <q-table :rows="users" row-key="name" :loading="loading" :filter="search">
    </q-table>
    <DialogForm v-model="dialogState" title="New User">
      <template #body>
        <q-input outlined v-model="formUser.email" label="Email"></q-input>
      </template>
    </DialogForm>
  </q-page>
</template>

<script lang="ts" setup>
import { useMeta } from 'quasar';
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
  id: '',
  email: '',
  password: '',
  role: {
    id: '',
    name: '',
  },
});
const users = ref([]);
const loading = ref(false);
useMeta({
  title: title.value,
});
onMounted(async () => {
  loading.value = true;
  users.value = await UserService.getAll();
  loading.value = false;
});
</script>
