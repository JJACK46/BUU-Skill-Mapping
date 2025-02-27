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
    option-label="thaiName"
    emit-value
    map-options
    clearable
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
  fetchOptions?: () => Promise<DataResponse>;
  funcFilter: QSelect['onFilter'];
  funcClear: QSelect['onClear'];
}>();

const mutationOptions = ref<[]>([]);

const computedOptions = computed(() => props.options || mutationOptions.value);

onMounted(async () => {
  if (!props.options) {
    const res = await props.fetchOptions?.();
    if (res?.data) {
      mutationOptions.value = res.data as [];
    }
  }
});
</script>
