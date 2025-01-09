<template>
  <div class="q-py-md">
    <div class="text-h4 text-primary">
      {{ t('subjects') }}
    </div>
  </div>
  <q-select
    dense
    outlined
    v-model="store.form.subjects"
    :options="subjects"
    :label="t('subjects') + ' *'"
    use-chips
    option-label="name"
    multiple
    :rules="[requireField]"
  ></q-select>
  <q-card
    v-for="(subject, index) in store.form.subjects"
    :key="index"
    class="q-mb-md shadow-3 rounded-card relative"
  >
    <q-card-section>
      <div class="row items-center">
        <div>
          <div class="text-h6 text-primary font-bold">
            {{ subject.name }}
          </div>
          <div class="text-subtitle2 text-grey-6">
            {{ t('credit : ') }}{{ subject.credit || 'No credit provided' }}
          </div>
        </div>

        <q-col class="q-ml-auto">
          <q-card-actions align="right">
            <q-btn
              align="right"
              flat
              color="negative"
              icon="close"
              @click="deleteSubject(index)"
              class="q-py-sm"
            /> </q-card-actions
        ></q-col>
      </div>
    </q-card-section>

    <q-card-section>
      <q-separator class="q-mb-md" />
      <div class="text-body1 q-pb-sm">
        <div class="text-subtitle2 text-grey-6 row items-center q-gutter-sm">
          <div v-for="(item, idx) in subject.skillExpectedLevels" :key="idx">
            <q-chip clickable color="primary" text-color="white">
              {{ item.skill?.name || 'No skill provided' }}
            </q-chip>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { useCurriculumStore } from 'src/stores/curriculum';
import type { Subject } from 'src/types/subject';
import { requireField } from 'src/utils/field-rules';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const subjects = ref<Subject[]>();
const store = useCurriculumStore();
const { t } = useI18n();

function deleteSubject(index: number) {
  if (store.form.subjects) {
    store.form.subjects.splice(index, 1);
  }
}
</script>
