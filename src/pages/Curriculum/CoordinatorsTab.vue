<template>
  <div class="q-py-md">
    <div class="text-h4 text-primary">
      {{ t('instructor') }}
    </div>
  </div>
  <q-select
    dense
    outlined
    v-model="store.form.coordinators"
    :options="instructors"
    :label="t('coordinators') + ' *'"
    use-chips
    option-label="name"
    multiple
    :rules="[requireField]"
  ></q-select>
  <q-card
    v-for="(coordinator, index) in store.form.coordinators"
    :key="index"
    class="q-mb-md shadow-3 rounded-card relative"
  >
    <q-card-section>
      <div class="row items-center">
        <div>
          <div class="text-h6 text-primary font-bold">
            {{ coordinator.position }} - {{ coordinator.name }}
          </div>
          <div class="text-subtitle2 text-grey-6">
            {{ t('branch : ') }}{{ coordinator.branch || 'No branch provided' }}
          </div>
        </div>

        <q-col class="q-ml-auto">
          <q-card-actions align="right">
            <q-btn
              align="right"
              flat
              color="negative"
              icon="close"
              @click="deleteCoordinator(index)"
              class="q-py-sm"
            /> </q-card-actions
        ></q-col>
      </div>
    </q-card-section>

    <q-card-section>
      <q-separator class="q-mb-md" />
      <div class="text-body1 q-pb-sm">
        <q-icon name="email" class="q-mr-sm text-primary" />&nbsp;
        <span class="text-grey-8">
          {{ t('email : ') }}{{ coordinator.email || 'No email provided' }}
        </span>
      </div>
      <div class="text-body1">
        <q-icon name="phone" class="q-mr-sm text-primary" />&nbsp;
        <span class="text-grey-8">
          {{ t('tel : ') }}{{ coordinator.tel || 'No phone provided' }}
        </span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { useCurriculumStore } from 'src/stores/curriculum';
import type { Instructor } from 'src/types/instructor';
import { requireField } from 'src/utils/field-rules';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const instructors = ref<Instructor[]>();
const store = useCurriculumStore();
const { t } = useI18n();

function deleteCoordinator(index: number) {
  if (store.form.coordinators) {
    store.form.coordinators.splice(index, 1);
  }
}
</script>
