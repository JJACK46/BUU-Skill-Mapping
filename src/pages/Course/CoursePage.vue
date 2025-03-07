<template>
  <q-page padding>
    <div v-if="!$route.params.id">
      <MainHeader
        v-model:searchText="filterCourse"
        @open-dialog="handleOpenDialog"
        :label-add="t('newCourse')"
      />
      <section v-if="store.courses">
        <div id="available">
          <div class="text-primary q-mb-md text-weight-bold text-h5">
            Available Course
          </div>
          <div class="text-weight-medium q-mb-md">
            {{ t('academicYear') }} 2025 / {{ t('semester') }} 2
          </div>
          <div class="q-gutter-lg q-mb-md row">
            <div
              v-for="(course, index) in store.courses"
              :key="index"
              class="cursor-pointer"
            >
              <CustomCard
                :head-text="course.subject.thaiName || ''"
                :sub-text="course.subject.engName || ''"
                @click="handleViewCourse(course.id)"
              >
              </CustomCard>
            </div>
          </div>
        </div>
        <q-separator class="q-my-lg" />
        <q-expansion-item>
          <template #header>
            <div class="text-grey-6 text-weight-bold text-h5 q-mr-md">
              Archived Course
            </div>
          </template>
          <template #default>
            <div class="q-px-md">
              <div class="text-weight-medium q-my-md">2025 / 2</div>
              <div class="q-gutter-lg q-mb-md row">
                <div
                  v-for="(course, index) in store.courses"
                  :key="index"
                  class="cursor-pointer"
                >
                  <CustomCard
                    :head-text="course.subject.thaiName || ''"
                    :sub-text="course.subject.engName || ''"
                    @click="handleViewCourse(course.id)"
                  >
                  </CustomCard>
                </div>
              </div>
            </div>
          </template>
        </q-expansion-item>
      </section>
      <section
        class="q-mt-lg"
        v-if="!store.courses || store.courses.length === 0"
      >
        <div class="text-body2 text-center">{{ t('noData') }}</div>
      </section>
      <DialogForm
        width="70%"
        :title="t('newCourse')"
        v-model="store.dialogState"
        @hide="
          () => {
            store.resetForm(), clearAllSelected();
          }
        "
      >
        <div class="row">
          <div class="col-5 q-gutter-y-md">
            <div class="text-primary text-weight-bold">
              {{ t('curriculum') }}
            </div>
            <q-list bordered separator class="rounded-borders">
              <q-item
                clickable
                v-for="item in curriculums"
                @click="setSelectedCurrCode(item.code)"
                :key="item.id"
              >
                <q-item-section>
                  {{ item.thaiName || item.engName }}
                  <div class="text-grey-8 text-caption">
                    {{ t('code') }} {{ item.code }}
                  </div>
                </q-item-section>
                <q-item-section side v-if="selectedCurrCode === item.code">
                  <q-icon name="done" color="positive"> </q-icon
                ></q-item-section>
              </q-item>
            </q-list>
          </div>
          <q-separator vertical class="q-mx-md"></q-separator>
          <div v-if="selectedCurrCode" class="col q-gutter-y-md cursor-pointer">
            <div class="text-primary text-weight-bold">
              {{ t('subject') }}
            </div>
            <q-list bordered separator class="rounded-borders">
              <q-item
                clickable
                v-for="item in subjects"
                @click="toggleSelectedSubject(item)"
                :key="item.id"
              >
                <q-item-section>
                  {{ item.thaiName || item.engName }}
                  <div class="text-grey-8 text-caption">
                    {{ t('subjectCode') }} {{ item.code }}
                  </div>
                </q-item-section>
                <q-item-section side v-if="findExistSubjectCode(item.code)">
                  <q-icon name="done" color="positive"> </q-icon
                ></q-item-section>
              </q-item>
            </q-list>
          </div>
          <div v-else class="flex q-mx-auto items-center text-grey-6">
            Please select curriculum first
          </div>
          <div v-if="selectedSubjects" class="col-12 q-mt-lg">
            <div class="q-gutter-x-sm q-mb-sm">
              <q-radio
                v-model="store.form.semester"
                val="ภาคต้น"
                :label="t('firstSemester')"
              ></q-radio>
              <q-radio
                v-model="store.form.semester"
                val="ภาคปลาย"
                :label="t('secondSemester')"
              ></q-radio>
              <q-radio
                v-model="store.form.semester"
                val="ภาคฤดูร้อน"
                :label="t('summerSemester')"
              ></q-radio>
            </div>
            <q-input
              v-model="store.form.year"
              :label="t('academicYear')"
              @vue:mounted="() => (store.form.year = undefined)"
              :rules="[
                requireField,
                (v) => v.length === 4 || 'Invalid year format',
              ]"
              outlined
            >
            </q-input>
          </div>
        </div>
      </DialogForm>
    </div>
    <!-- Course ID page -->
    <router-view />
  </q-page>
</template>

<script lang="ts" setup>
/*
    imports
*/
import { useMeta } from 'quasar';
import CustomCard from 'src/components/CustomCard.vue';
import { useCourseStore } from 'src/stores/course';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MainHeader from 'src/components/PageHeader.vue';
import { useI18n } from 'vue-i18n';
import DialogForm from 'src/components/DialogForm.vue';
import type { Subject } from 'src/types/subject';
import { CurriculumService } from 'src/services/curriculums';
import type { Curriculum } from 'src/types/curriculum';
import { SubjectService } from 'src/services/subject';
import { requireField } from 'src/utils/field-rules';
/*
    states
*/
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const filterCourse = ref('');
const store = useCourseStore();
const title = computed(() => route.matched[1]?.name as string);
const subjects = ref<Subject[]>([]);
const curriculums = ref<Curriculum[]>([]);
const selectedCurrCode = ref<string | undefined>();
const selectedSubjects = ref<Subject[]>([]);

const handleViewCourse = async (id: number) => {
  if (id) {
    await router.push(`/courses/${id}`);
  }
};

/*
    methods
*/
const handleOpenDialog = () => {
  store.dialogState = true;
};
const clearSelectedSubjects = () => {
  selectedSubjects.value = [];
};
const clearSelectedCurriculum = () => {
  selectedCurrCode.value = undefined;
};
const setSelectedCurrCode = (code: string) => {
  selectedCurrCode.value = code;
  clearSelectedSubjects();
};
const addSelectedSubject = (subject: Subject) => {
  selectedSubjects.value.push(subject);
};
const removeSelectedSubject = (subject: Subject) => {
  selectedSubjects.value = selectedSubjects.value?.filter(
    (s) => s.code !== subject.code,
  );
};
const toggleSelectedSubject = (subject: Subject) => {
  if (findExistSubjectCode(subject.code)) {
    removeSelectedSubject(subject);
  } else {
    addSelectedSubject(subject);
  }
};
const findExistSubjectCode = (code: string) => {
  return selectedSubjects.value.some((s) => s.code === code);
};
const fetchSubjectInCourse = async (code: string) => {
  const { data } = await SubjectService.getAll({ curriculumCode: code });
  subjects.value = data;
};
const clearAllSelected = () => {
  clearSelectedSubjects();
  clearSelectedCurriculum();
};

watch(selectedCurrCode, async (newCode) => {
  if (newCode) {
    await fetchSubjectInCourse(newCode);
  }
});

onMounted(async () => {
  store.fetchData();
  const { data } = await CurriculumService.getAll();
  curriculums.value = data;
});

useMeta({
  title: title.value,
});
</script>
