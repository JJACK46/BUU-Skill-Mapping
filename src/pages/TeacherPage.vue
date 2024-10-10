<template>
  <q-page padding>
    <PageHeader :search-text="search" @open-dialog="dialogState = true" />
    <q-separator class="q-my-md" />
    <q-table :rows="mockRows" :columns="mockColumns" row-key="name"></q-table>
    <q-dialog v-model="dialogState">
      <q-card>
        <div class="q-pa-md text-h5">New User</div>
        <q-card-section class="flex q-gutter-md">
          <q-input outlined v-model="form.email" label="Email"></q-input>
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
import PageHeader from 'src/components/PageHeader.vue';
import { mockColumns, mockRows } from 'src/mock/DataTable';
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const dialogState = ref(false);
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const search = ref();
const form = reactive({
  email: '',
});
useMeta({
  title: title.value,
});
</script>
