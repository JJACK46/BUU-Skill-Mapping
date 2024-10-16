<template>
  <q-btn
    color="primary "
    icon="add"
    :to="props.toLink"
    @click="clickAddFuction"
    :label="props.label || 'Add New'"
    style="height: 55px; width: 200px"
  >
    <!-- <q-icon name="mdi-plus" />{{ props.label }} -->
  </q-btn>
</template>

<script lang="ts" setup>
const props = defineProps<{
  label?: string;
  toLink?: string;
  clickAddFuction: () => void;
}>();
</script>
