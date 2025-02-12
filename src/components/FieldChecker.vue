<template>
  <q-input
    outlined
    dense
    class="col"
    style="min-width: 200px"
    v-model="model"
    @update:model-value="funcUpdate"
    debounce="100"
    mask="########"
    hide-selected
    label="Subject Code *"
    input-debounce="500"
    :rules="[requireField]"
  >
    <template #hint>
      <span
        :class="`${isFound ? 'text-blue' : 'text-positive'} text-weight-medium`"
      >
        {{ foundHint }}
      </span>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { requireField } from 'src/utils/field-rules';

defineProps<{
  isFound: boolean;
  foundHint: string;
  funcUpdate: (arg0: string | number) => void;
}>();

const model = defineModel<string | number>();
</script>
