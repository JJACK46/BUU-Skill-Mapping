<template>
  <div class="q-pa-md q-gutter-sm">
    <q-tree :nodes="nodes" node-key="label" default-expand-all> </q-tree>
  </div>
</template>

<script lang="ts" setup>
export interface SkillNode {
  label: string;
  avatar?: string;
  icon?: string;
  children?: SkillNode[];
  disabled?: boolean;
}

defineProps<{
  nodes: SkillNode[];
}>();
</script>
