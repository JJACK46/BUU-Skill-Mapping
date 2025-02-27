<template>
  <q-select
    v-model="model"
    :options="computedOptions"
    outlined
    dense
    use-input
    hide-selected
    fill-input
    @filter="funcFilter"
    :label
    option-value="id"
    :option-label="computedOptionLabel"
    emit-value
    map-options
    clearable
    @update:model-value="emitObject"
    @clear="funcClear"
    behavior="menu"
    :rules="[requireField]"
  >
  </q-select>
</template>

<script setup lang="ts">
import { QSelect } from 'quasar';
import type { DataResponse } from 'src/types/data-response';
import { requireField } from 'src/utils/field-rules';
import { computed, onMounted, ref } from 'vue';

// * bind with ID of the object
const model = defineModel<number>();

const props = defineProps<{
  label: QSelect['label'];
  options?: QSelect['options'];
  fetchOptions?: () => Promise<DataResponse<unknown>>;
  funcFilter: QSelect['onFilter'];
  funcClear: QSelect['onClear'];
  optionLabel? : string
}>();

const mutationOptions = ref<[]>([]);
const computedOptionLabel = computed(()=> props.optionLabel || 'thaiName')
const computedOptions = computed(() => props.options || mutationOptions.value);

// Function to find and emit the full object
const emitObject = (val: number | null) => {
  if (val === null) {
    emit('update:modelValue', null);
    return;
  }
  
  const selectedObject = computedOptions.value.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (option: any) => option.id === val
  );
  emit('update:modelValue', selectedObject || null);
};

const emit = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e: 'update:modelValue', value: any): void; 
}>();

onMounted(async () => {
  if (!props.options) {
    const res = await props.fetchOptions?.();
    if (res?.data) {
      mutationOptions.value = res.data as [];
    }
  }
});
</script>
