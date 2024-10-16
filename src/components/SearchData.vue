<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  label: string;
  fetchData: (
    search: string,
    columnId?: string,
    columnName?: string
  ) => Promise<void>;
}>();

const loading = ref(false);

const search = ref('');
</script>

<template>
  <q-input
    outlined
    :debounce="500"
    @update:model-value="fetchData(search)"
    clearable
    v-model="search"
    :loading="loading"
    :label="'Search ' + props.label"
    @keydown.enter="fetchData(search)"
    class="w-full h-[55px]"
    style="font-size: 18px"
  >
    <template v-slot:append>
      <q-icon name="search" @click="fetchData(search)"> </q-icon> </template
  ></q-input>
</template>
