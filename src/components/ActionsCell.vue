<template>
  <q-td class="q-gutter-x-xs" style="min-width: 100px">
    <slot name="prefix"></slot>
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
