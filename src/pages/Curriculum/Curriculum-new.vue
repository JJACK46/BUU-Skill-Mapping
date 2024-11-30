<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el :label="t('curriculums')" to="/curriculums" />
      <q-breadcrumbs-el :label="t('newCurriculum')" />
    </q-breadcrumbs>
    <q-separator class="q-my-md" />
    <q-card flat bordered class="q-pa-md q-animate--fade">
      <q-splitter v-model="qsplitterVModel">
        <template #before>
          <q-tabs v-model="innerTab" vertical class="text-primary">
            <q-tab name="main" icon="home" :label="t('main')" />
            <q-tab
              name="coordinators"
              icon="group"
              :label="t('coordinators')"
            />
            <q-tab name="subjects" icon="book" :label="t('subject')" />
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
                v-model="store.form.id"
                :label="t('id') + ' *'"
                :rules="[requireField]"
              />
              <q-input
                dense
                outlined
                v-model="store.form.name"
                :label="t('name') + ' *'"
                :rules="[requireField]"
              />
              <q-input
                dense
                outlined
                v-model="store.form.engName"
                :label="t('engName') + ' *'"
                :rules="[requireField, onlyAlphabet]"
              />
              <q-input
                dense
                type="textarea"
                outlined
                v-model="store.form.description"
                :label="t('description') + ' *'"
                :rules="[requireField]"
              />
              <q-input
                dense
                outlined
                v-model="store.form.degree"
                :label="t('degree') + ' *'"
                :rules="[requireField, onlyAlphabet]"
              />
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
                :options="branchs"
                :label="t('branchs') + ' *'"
                use-chips
                option-label="name"
                :rules="[requireField]"
                @vue:mounted="fetchBranch"
              ></q-select>
            </q-tab-panel>
            <q-tab-panel name="coordinators" @vue:mounted="fetchInstructors">
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
            </q-tab-panel>
            <q-tab-panel name="subjects" @vue:mounted="fetchSubjects">
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
import { BranchService } from 'src/services/branches';
import { useCurriculumStore } from 'src/stores/curriculum';
import { Instructor } from 'src/types/instructor';
import { Subject } from 'src/types/subject';
import { onlyAlphabet, requireField } from 'src/utils/field-rules';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { Branch } from 'src/types/branch';

const router = useRouter();
const subjects = ref<Subject[]>();
const branchs = ref<Branch[]>();
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

async function fetchBranch() {
  branchs.value = (await BranchService.getAll()).data;
}
</script>
