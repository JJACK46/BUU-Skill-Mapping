<template>
  <q-td>
    <q-btn
      flat
      dense
      round
      color="grey-8"
      icon="edit"
      @click="$emit('handleEdit')"
    />
    <q-btn
      flat
      dense
      round
      color="grey-8"
      icon="delete"
      class="q-ml-sm"
      @click="$emit('handleDelete')"
    />
  </q-td>
</template>

<script setup lang="ts">
defineEmits<{
  // (e: 'handleView'): void;
  (e: 'handleEdit'): void;
  (e: 'handleDelete'): void;
}>();
</script>
