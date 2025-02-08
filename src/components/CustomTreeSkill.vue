<template>
  <div class="q-pa-md q-gutter-sm">
    <q-tree
      v-if="skills && skills.length > 0"
      :nodes="nodes"
      node-key="label"
      default-expand-all
    >
      <template #default-body="{ node }">
        <q-btn
          v-if="node.children && node.children.length > 0 && !readonly"
          icon="edit"
          flat
          size="sm"
          label="edit"
          color="primary"
        >
        </q-btn>
        <q-popup-edit
          v-model="node.children"
          @save="node.children = $event"
          v-slot="scope"
          style="width: 100px"
        >
          <label for="selectSub" class="text-h6">Edit sub skill</label>
          <q-list
            v-for="(item, index) in scope.value"
            :key="index"
            style="width: fit-content"
          >
            <q-item>
              <q-item-section>
                <span>
                  <div style="width: fit-content; display: inline-block">
                    {{ item.label }}
                  </div>
                  <q-btn
                    @click="scope.value.splice(index, 1)"
                    icon="delete"
                    flat
                    style="width: fit-content; display: inline-block"
                  ></q-btn>
                </span>
              </q-item-section>
            </q-item>
          </q-list>
          <div class="flex q-gutter-md" style="width: fit-content">
            <q-select
              id="selectSub"
              v-model="selectedSub"
              :options="options"
              dense
              outlined
              option-label="label"
            ></q-select>
            <q-btn
              color="primary"
              label="add"
              @click="scope.value.push(selectedSub)"
            ></q-btn>
          </div>
          <div class="q-mt-sm q-gutter-md" style="width: fit-content">
            <q-btn label="cancel" flat @click="scope.cancel"></q-btn>
            <q-btn
              label="save"
              color="positive"
              flat
              @click="scope.set"
            ></q-btn>
          </div>
        </q-popup-edit>
      </template>
    </q-tree>
    <q-linear-progress v-else indeterminate></q-linear-progress>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import type { QTreeProps } from 'quasar';
import type { Skill } from 'src/types/skill';

const props = defineProps<{
  skills: Skill[];
  readonly?: true;
}>();

const nodes = ref<QTreeProps['nodes']>([]);
const selectedSub = ref([]);

const options = <QTreeProps['nodes']>[
  {
    label: 'Azure Cloud Platform',
    description: '',
    type: 'Specific',
    domain: 'Ability',
  },
  {
    label: 'AWS Cloud Platform',
    description: '',
    type: 'Specific',
    domain: 'Ability',
  },
  {
    label: 'Cloudflare ',
    description: '',
    type: 'Specific',
    domain: 'Ability',
  },
];

const formatToNodes = (skills: Skill[]): QTreeProps['nodes'] => {
  return skills?.map((skill) => {
    const node = {
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
  },
);
</script>
