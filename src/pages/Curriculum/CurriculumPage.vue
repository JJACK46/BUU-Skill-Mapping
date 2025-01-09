<template>
  <q-page padding>
    <q-card flat bordered class="q-pa-md q-animate--fade container">
      <q-splitter v-model="qsplitterVModel" :limits="[10]">
        <template #before>
          <q-tabs v-model="innerTab" vertical class="text-primary">
            <q-tab
              name="main"
              icon="collections_bookmark"
              :label="t('curriculum')"
            />
            <q-tab
              name="coordinators"
              icon="group"
              :label="t('coordinators')"
            />
            <q-tab name="skills" icon="code" :label="t('skills')" />
            <q-tab name="subjects" icon="book" :label="t('subject')" />
            <q-tab name="plos" icon="book" :label="t('plos')" />
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
              <CurriculumsMainTab />
            </q-tab-panel>
            <q-tab-panel
              name="skills"
              @vue:mounted="fetchInstructors"
              class="q-gutter-y-md"
            >
              <SkillTab />
            </q-tab-panel>
            <q-tab-panel
              name="plos"
              @vue:mounted="fetchInstructors"
              class="q-gutter-y-md"
            >
              <PloTab />
            </q-tab-panel>
            <q-tab-panel
              name="coordinators"
              @vue:mounted="fetchInstructors"
              class="q-gutter-y-md"
            >
              <CoordinatorsTab />
            </q-tab-panel>
            <q-tab-panel
              name="subjects"
              @vue:mounted="fetchSubjects"
              class="q-gutter-y-md"
            >
              <SubjectTab />
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
      <q-card-actions align="right">
        <div v-if="innerTab === 'subjects'" class="q-gutter-x-md">
          <q-btn flat @click="handleCancel" color="red" :label="t('cancel')" />
          <q-btn flat @click="handleGo('main')" :label="t('back')" />
          <q-btn
            color="primary"
            unelevated
            :label="t('save')"
            @click="store.handleSave"
            style="width: 80px"
          />
        </div>
        <div v-if="innerTab === 'main'">
          <q-btn
            color="primary"
            unelevated
            :label="t('next')"
            @click="handleGo('coordinators')"
            style="width: 80px"
          />
        </div>
        <div v-if="innerTab === 'coordinators'">
          <q-btn
            color="primary"
            unelevated
            :label="t('next')"
            @click="handleGo('subjects')"
            style="width: 80px"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { InstructorService } from 'src/services/instructor';
import { SubjectService } from 'src/services/subject';
import { useCurriculumStore } from 'src/stores/curriculum';
import type { Instructor } from 'src/types/instructor';
import type { Subject } from 'src/types/subject';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import CurriculumsMainTab from './CurriculumsMainTab.vue';
import CoordinatorsTab from './CoordinatorsTab.vue';
import SubjectTab from './SubjectTab.vue';
import SkillTab from './SkillTab.vue';
import PloTab from './PloTab.vue';

const router = useRouter();
const subjects = ref<Subject[]>();
const innerTab = ref('main');
const qsplitterVModel = ref(10);
const instructors = ref<Instructor[]>();
const store = useCurriculumStore();
const { t } = useI18n();

function handleGo(val: string) {
  innerTab.value = val;
}

function handleCancel() {
  router.push('/curriculums');
}

async function fetchSubjects() {
  subjects.value = (await SubjectService.getAll()).data;
}
async function fetchInstructors() {
  instructors.value = (await InstructorService.getAll()).data;
}
</script>
