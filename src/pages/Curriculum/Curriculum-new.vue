<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Curriculums" to="/curriculums" />
    </q-breadcrumbs>
    <q-separator class="q-my-md" />
    <q-card flat bordered class="q-pa-md">
      <q-splitter v-model="qsplitterVModel">
        <template #before>
          <q-tabs v-model="innerTab" vertical class="text-primary">
            <q-tab name="main" icon="home" label="Main" />
            <q-tab name="subjects" icon="book" label="Subjects" />
          </q-tabs>
        </template>
        <template #after>
          <q-tab-panels
            v-model="innerTab"
            animated
            transition-next="slide-up"
            transition-prev="slide-down"
          >
            <q-tab-panel name="main" class="q-gutter-y-md">
              <q-input
                dense
                outlined
                v-model="store.form.name"
                label="Name *"
                :rules="[requireField, onlyAlphabet]"
              />
              <q-input
                dense
                outlined
                v-model="store.form.engName"
                label="English Name *"
                :rules="[requireField, onlyAlphabet]"
              />
              <q-input
                dense
                type="textarea"
                outlined
                v-model="store.form.description"
                label="Description *"
                :rules="[requireField]"
              />
              <q-input
                dense
                outlined
                v-model="store.form.degreeName"
                label="Degree Name *"
                :rules="[requireField, onlyAlphabet]"
              />
              <q-input
                dense
                outlined
                v-model="store.form.engDegreeName"
                label="English Degree Name *"
                :rules="[requireField, onlyAlphabet]"
              />
              <q-input
                dense
                type="number"
                outlined
                v-model="store.form.period"
                label="Period *"
                :rules="[requireField]"
              />
              <q-input
                dense
                type="number"
                outlined
                v-model="store.form.minimumGrade"
                label="Minimum Grade *"
                :rules="[requireField]"
              />
            </q-tab-panel>
            <q-tab-panel name="subjects">
              <q-select
                dense
                outlined
                v-model="store.form.subjects"
                :options="subjects"
                label="Subjects  *"
                use-chips
                option-label="name"
                multiple
                :rules="[requireField]"
              ></q-select>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
      <q-card-actions align="right">
        <q-btn flat @click="goBack" label="Cancel" />
        <q-btn color="primary" unelevated label="save" style="width: 80px" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { useCurriculumStore } from 'src/stores/curriculum';
import { Subject } from 'src/types/subject';
import { onlyAlphabet, requireField } from 'src/utils/field-rules';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const subjects = ref<Subject[]>();
const innerTab = ref('main');
const qsplitterVModel = ref(10);
const store = useCurriculumStore();

function goBack() {
  router.push('/curriculums');
}
</script>
