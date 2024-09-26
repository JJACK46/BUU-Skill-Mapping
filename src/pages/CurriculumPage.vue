<template>
  <q-page padding>
    <div class="text-h6">{{ title }}</div>
    <q-separator class="q-my-md" />
    <div class="flex flex-center q-gutter-sm">
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
      <q-space />
      <div>
        <q-btn @click="isDialogOpen = true" color="secondary">Add</q-btn>
      </div>
    </div>
    <q-table
      class="q-mt-md"
      :rows="mockRows"
      :columns="mockColumns"
      row-key="name"
    ></q-table>
  </q-page>
</template>

<script lang="ts" setup>
import { mockColumns, mockRows } from 'src/mock/DataTable';
import { useMeta } from 'quasar';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const isDialogOpen = ref(false);
const search = ref();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
useMeta({
  title: title.value,
});
</script>
