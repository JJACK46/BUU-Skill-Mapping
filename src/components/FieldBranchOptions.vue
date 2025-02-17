<template>
  <q-select
    outlined
    dense
    v-model="model"
    :options="branches"
    option-label="thaiName"
    :option-value="optionBranchValue"
    map-options
    emit-value
    label="Branch"
    class="col-12"
    options-dense
    :rules="[requireField]"
  />
</template>

<script setup lang="ts">
import { BranchService } from 'src/services/branch';
import type { Branch } from 'src/types/branch';
import { requireField } from 'src/utils/field-rules';
import { onMounted, ref } from 'vue';

const model = defineModel<number>();
const branches = ref<Branch[]>([]);

const props = defineProps<{
  // need if data has no branchId
  branch?: Partial<Branch>;
}>();

onMounted(() => {
  model.value = props.branch?.id || undefined;
});

// return branch id
const optionBranchValue = (branch: Branch) => branch.id;

onMounted(async () => {
  branches.value = await BranchService.getOptions();
});
</script>

<style scoped></style>
