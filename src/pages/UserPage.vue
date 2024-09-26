<template>
  <q-page padding>
    <div class="text-h6">{{ title }}</div>
    <q-separator class="q-my-md" />
    <div class="flex justify-end q-gutter-md q-mb-md">
      <q-input
        outlined
        clearable
        v-model="search"
        label="Search"
        class="col"
        dense
      >
        <template #prepend>
          <q-icon name="search"></q-icon>
        </template>
      </q-input>
      <q-btn @click="dialogState = true" color="secondary">Add</q-btn>
    </div>
    <q-table :rows="users" row-key="name" :loading="loading"> </q-table>
    <q-dialog v-model="dialogState">
      <q-card>
        <div class="q-pa-md text-h5">New User</div>
        <q-card-section class="flex q-gutter-md">
          <q-input outlined v-model="formUser.email" label="Email"></q-input>
        </q-card-section>
        <q-card-actions class="justify-end">
          <q-btn flat @click="dialogState = false"> cancel </q-btn>
          <q-btn flat color="positive"> save </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts" setup>
import { useMeta } from 'quasar';
import { UserService } from 'src/services/user';
import { User } from 'src/types/user';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const dialogState = ref(false);
const route = useRoute();
const title = computed(() => route.matched[0].name as string);
const search = ref();
const formUser = reactive<User>({
  id: 0,
  email: '',
  role: { id: 1, name: 'Admin' },
});
const users = ref([]);
const loading = ref(false);
useMeta({
  title: title.value,
});
onMounted(async () => {
  loading.value = true;
  users.value = await UserService.fetchAll();
  loading.value = false;
});
</script>
