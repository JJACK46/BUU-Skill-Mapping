<template>
  <div class="row justify-between">
    <div class="row q-gutter-sm">
      <q-btn v-if="handleImport" label="import" icon="upload" outline></q-btn>
      <q-btn
        v-if="handleExport"
        label="export"
        icon="cloud_download"
        outline
      ></q-btn>
    </div>
    <div class="row q-gutter-sm">
      <q-btn icon="filter_alt" flat label="filter" color="primary" dense>
      </q-btn>
      <q-input
        outlined
        clearable
        v-model="searchText"
        label="Search"
        class="col"
        dense
        style="width: 300px"
      >
        <template #prepend>
          <q-icon name="search"></q-icon>
        </template>
      </q-input>
      <q-btn
        @click="$emit('openDialog')"
        color="primary"
        label="add"
        unelevated
      >
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  handleImport?: () => void;
  handleExport?: () => void;
}>();

defineEmits<{
  (e: 'openDialog'): void;
}>();

const searchText = defineModel('searchText', { default: '' });
</script>
