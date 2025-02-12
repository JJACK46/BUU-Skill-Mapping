<template>
  <div class="q-py-md">
    <div class="text-h4 text-primary">
      {{ t('curriculum') }}
    </div>
  </div>
  <q-input
    dense
    outlined
    v-model="store.form.code"
    :label="t('curriculumCode') + ' *'"
    :rules="[requireField]"
  />
  <q-input
    dense
    outlined
    v-model="store.form.thaiName"
    :label="t('name') + ' *'"
    :rules="[requireField]"
  />
  <q-input
    dense
    outlined
    v-model="store.form.engName"
    :label="t('engName') + ' *'"
    :rules="[requireField]"
  />
  <q-input
    dense
    type="textarea"
    outlined
    v-model="store.form.thaiDescription"
    :label="t('description') + ' *'"
    :rules="[requireField]"
  />
  <q-input
    dense
    type="textarea"
    outlined
    v-model="store.form.engDescription"
    :label="t('englishDescription') + ' *'"
    :rules="[requireField]"
  />
  <q-input
    dense
    outlined
    v-model="store.form.thaiDegree"
    :label="t('degree') + ' *'"
    :rules="[requireField, onlyAlphabet]"
  >
    <template #loading></template>
  </q-input>
  <q-input
    dense
    outlined
    v-model="store.form.engDegree"
    :label="t('engDegree') + ' *'"
    :rules="[requireField, onlyAlphabet]"
  />

  <q-input
    dense
    type="number"
    outlined
    v-model.number="store.form.period"
    :label="t('period') + ' *'"
    :rules="[requireField]"
  >
  </q-input>
  <q-input
    dense
    type="number"
    outlined
    v-model.number="store.form.minimumGrade"
    :label="t('minimumGrade') + ' *'"
    :rules="[requireField]"
  />
  <q-select
    dense
    outlined
    v-model="store.form.branch"
    :options="branches"
    :label="t('branches') + ' *'"
    option-label="name"
    :rules="[requireField]"
    @vue:mounted="fetchBranch"
  ></q-select>
</template>

<script lang="ts" setup>
import { BranchService } from 'src/services/branches';
import { onlyAlphabet, requireField } from 'src/utils/field-rules';
import type { Branch } from 'src/types/branch';
import { onMounted, ref } from 'vue';
import { useCurriculumStore } from 'src/stores/curriculum';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const store = useCurriculumStore();
const branches = ref<Branch[]>();
const { t } = useI18n();
const route = useRoute();

onMounted(() => {
  store.form.id = Number(route.params.id);
});

async function fetchBranch() {
  branches.value = (await BranchService.getAll()).data;
}
</script>
