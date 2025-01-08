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
              <div class="q-py-md">
                <div class="text-h4 text-primary">
                  {{ t('curriculum') }}
                </div>
              </div>
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
            <q-tab-panel
              name="coordinators"
              @vue:mounted="fetchInstructors"
              class="q-gutter-y-md"
            >
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
                        {{ t('branch : ')
                        }}{{ coordinator.branch || 'No branch provided' }}
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
                      {{ t('email : ')
                      }}{{ coordinator.email || 'No email provided' }}
                    </span>
                  </div>
                  <div class="text-body1">
                    <q-icon name="phone" class="q-mr-sm text-primary" />&nbsp;
                    <span class="text-grey-8">
                      {{ t('tel : ')
                      }}{{ coordinator.tel || 'No phone provided' }}
                    </span>
                  </div>
                </q-card-section>
              </q-card>
            </q-tab-panel>
            <q-tab-panel
              name="subjects"
              @vue:mounted="fetchSubjects"
              class="q-gutter-y-md"
            >
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
                        {{ t('credit : ')
                        }}{{ subject.credit || 'No credit provided' }}
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
                    <div
                      class="text-subtitle2 text-grey-6 row items-center q-gutter-sm"
                    >
                      <div
                        v-for="(item, idx) in subject.skillExpectedLevels"
                        :key="idx"
                      >
                        <q-chip clickable color="primary" text-color="white">
                          {{ item.skill?.name || 'No skill provided' }}
                        </q-chip>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
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
import type { Instructor } from 'src/types/instructor';
import type { Subject } from 'src/types/subject';
import { onlyAlphabet, requireField } from 'src/utils/field-rules';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import type { Branch } from 'src/types/branch';

const router = useRouter();
const subjects = ref<Subject[]>();
const branchs = ref<Branch[]>();
const innerTab = ref('main');
const qsplitterVModel = ref(10);
const instructors = ref<Instructor[]>();
const store = useCurriculumStore();
const { t } = useI18n();

function deleteCoordinator(index: number) {
  if (store.form.coordinators) {
    store.form.coordinators.splice(index, 1);
  }
}

function deleteSubject(index: number) {
  if (store.form.subjects) {
    store.form.subjects.splice(index, 1);
  }
}

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
