<template>
  <q-input
    outlined
    dense
    class="col"
    style="min-width: 200px"
    v-model="model"
    @update:model-value="funcUpdate"
    debounce="100"
    :mask="computedMask"
    hide-selected
    :label
    input-debounce="500"
    :rules="computedRules"
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
import type { ValidationRule } from 'quasar';
import { requireField } from 'src/utils/field-rules';
import { computed } from 'vue';

const props = defineProps<{
  isFound: boolean;
  foundHint: string;
  funcUpdate: (arg0: string | number) => void;
  mask?: string;
  rules?: ValidationRule[];
  label: string;
}>();

const computedMask = computed(() => props.mask || '########'); //default 8

const computedRules = computed(() => [requireField].concat(props.rules || []));

const model = defineModel<string | number>();
</script>
