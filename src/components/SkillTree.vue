<template>
  <div class="q-pa-md q-gutter-sm">
    <q-tree :nodes="nodes" node-key="label" default-expand-all> </q-tree>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { QTreeProps } from 'quasar';
import { Skill } from 'src/types/skill';

const props = defineProps<{
  skills: Skill[];
}>();

const nodes = ref<QTreeProps['nodes']>([]);

const formatToNodes = (skills: Skill[]): QTreeProps['nodes'] => {
  return skills.map((skill) => {
    let node = {
      label: skill.name,
      children: [] as QTreeProps['nodes'], // Initialize children as empty
    };

    // Recursively handle children if they exist
    if (skill.children && skill.children.length > 0) {
      node.children = formatToNodes(skill.children); // Recursive conversion
    }
    return node;
  });
};

onMounted(() => {
  nodes.value = formatToNodes(props.skills);
});

watch(
  () => props.skills,
  (val) => {
    nodes.value = formatToNodes(val);
  }
);
</script>
