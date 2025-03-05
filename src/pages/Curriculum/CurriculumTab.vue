<template>
  <div class="container">
    <div class="text-h4 text-primary">
      {{ t('curriculum') }}
    </div>
    <div class="q-mt-lg q-gutter-y-md">
      <FieldBranchOptions v-model="store.form.branchId" />

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
        counter
        maxlength="1000"
      />
      <q-input
        dense
        type="textarea"
        outlined
        v-model="store.form.engDescription"
        :label="t('englishDescription') + ' *'"
        :rules="[requireField]"
        counter
        maxlength="1000"
      />
      <q-select
        dense
        outlined
        :options="OptionEducationLevelTH"
        v-model="store.form.thaiDegree"
        :label="t('degree') + ' *'"
        :rules="[requireField]"
      />
      <q-select
        dense
        outlined
        v-model="store.form.engDegree"
        :options="OptionEducationLevelEN"
        :label="t('engDegree') + ' *'"
        :rules="[requireField]"
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
        outlined
        mask="#.##"
        v-model="store.form.minimumGrade"
        :label="t('minimumGrade') + ' *'"
        :rules="[requireField, ruleGradeFormat]"
        class="col-2 q-mr-md"
      />
      <div class="row col-12">
        <q-btn
          :label="t('save')"
          color="primary"
          unelevated
          class="col-grow"
          @click="store.handleSave"
        ></q-btn>
      </div>
      <JSON_Card :data="store.form" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  requireField,
  ruleGradeFormat,
} from 'src/utils/field-rules';
import { computed, nextTick, onMounted, watch } from 'vue';
import { useCurriculumStore } from 'src/stores/curriculum';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import {
  OptionEducationLevelEN,
  OptionEducationLevelTH,
} from 'src/data/education_level';
import FieldBranchOptions from 'src/components/FieldBranchOptions.vue';
import JSON_Card from 'src/components/JSON_Card.vue';

const store = useCurriculumStore();
const { t } = useI18n();
const route = useRoute();
const curCode = computed(()=>route.params.code as string);

onMounted(async () => {
  await nextTick().then(async () => {
    await store.fetchOneByCode(curCode.value);
  });
});

watch(
  () => [store.form.thaiDegree, store.form.engDegree],
  ([newThaiDegree, newEngDegree], [oldThaiDegree, oldEngDegree]) => {
    // Avoid infinite loops by checking if the value has actually changed
    if (newThaiDegree !== oldThaiDegree) {
      const indexTH = OptionEducationLevelTH.indexOf(newThaiDegree);
      if (indexTH !== -1) {
        store.form.engDegree = OptionEducationLevelEN[indexTH]!;
      }
    } else if (newEngDegree !== oldEngDegree) {
      const indexEN = OptionEducationLevelEN.indexOf(newEngDegree);
      if (indexEN !== -1) {
        store.form.thaiDegree = OptionEducationLevelTH[indexEN]!;
      }
    }
  },
  { deep: true },
);
</script>
