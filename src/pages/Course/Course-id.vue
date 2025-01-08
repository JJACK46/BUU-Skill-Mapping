<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Courses" to="/courses" />
      <q-breadcrumbs-el :label="`${store.getCourseId}`" />
    </q-breadcrumbs>
    <q-separator class="q-my-md" />
    <!-- Top Card -->
    <section class="row q-gutter-md">
      <q-card flat bordered class="col-grow col-sm q-animate--fade">
        <q-card-section>
          <div class="text-h6 text-caption">
            {{ t('courseId') }} : {{ store.getCourseId }}
          </div>
          <div class="text-h5">{{ store.course.name }}</div>
          <div class="text-body2 q-mt-sm">
            {{ store.course.description }}
          </div>
        </q-card-section>
      </q-card>
      <q-card flat bordered class="col-grow col-sm q-animate--fade">
        <q-card-section>
          <div class="text-h6 text-caption">
            {{ t('subjectId') }} : {{ store.course.subject?.id }}
          </div>
          <div class="text-h5">
            {{ store.course.subject?.name }}
          </div>
          <div class="text-body2 q-mt-sm">
            {{ store.course.subject?.description }}
          </div>
        </q-card-section>
      </q-card>
    </section>
    <q-card flat bordered class="q-my-md q-animate--fade">
      <q-card-section>
        <div class="text-h6">{{ t('expectedSkillsLevel') }}</div>
        <q-tree
          :nodes="skillTree || []"
          node-key="id"
          label-key="name"
          default-expand-all
        >
          <template #default-body="{ node }">
            <span v-show="node.level">
              {{ t('expectedLevel') }} :
              <span class="text-primary text-weight-medium">{{
                node.level
              }}</span>
            </span>
          </template>
        </q-tree>
      </q-card-section>
    </q-card>
    <!-- Table -->
    <q-table
      flat
      bordered
      v-model:expanded="expanded"
      :rows="enrollments ?? []"
      row-key="id"
      :columns="columns"
      separator="cell"
      :filter="filterStudent"
    >
      <template #top>
        <div class="q-mb-md">
          <span class="text-h6">{{ t('courseEnrollment') }}</span>
        </div>
        <div class="flex justify-between fit">
          <div class="row q-gutter-x-sm">
            <q-btn
              :label="t('import')"
              icon="upload"
              outline
              color="primary"
              @click="dialogImport = true"
            >
              <DialogForm
                title="Import Students"
                v-model="dialogImport"
                @save="handleImport"
                full-width
              >
                <template #body>
                  <TableSheetJS
                    ref="sheet"
                    @download-template="downloadTemplateForStudents"
                  />
                </template>
              </DialogForm>
            </q-btn>
            <q-btn
              :label="t('export')"
              icon="cloud_download"
              outline
              color="primary"
            />
          </div>
          <div class="row q-gutter-x-sm">
            <q-input
              outlined
              dense
              debounce="200"
              v-model="filterStudent"
              :placeholder="t('search') + '...'"
            >
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-toggle
              v-model="evaluationMode"
              :label="t('evaluation')"
              unelevated
              color="primary"
            />
          </div>
        </div>
      </template>
      <template #body="props">
        <q-tr :props>
          <q-td key="id" :props>
            {{ props.row.student.id }}
          </q-td>
          <q-td key="name" :props>
            {{ props.row.student.name }}
          </q-td>
          <q-td
            key="result"
            :class="`${computeSumResult(props.row.skillCollections as SkillCollection[]).css} text-bold`"
            :props
          >
            {{
              computeSumResult(props.row.skillCollections as SkillCollection[])
                .text
            }}
          </q-td>
          <q-td key="skills" :props="props">
            <q-btn
              :icon="props.expand ? 'expand_less' : 'expand_more'"
              flat
              padding="none"
              @click="props.expand = !props.expand"
            />
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%" class="bg-gray">
            <q-table
              hide-bottom
              flat
              dense
              separator="cell"
              :columns="
                [
                  {
                    name: 'name',
                    label: 'Name',
                    field: (s) => s.skillExpectedLevels?.skill?.name,
                    align: 'left',
                  },
                  {
                    name: 'level',
                    label: 'Gained Level',
                    field: (s) => s.gainedLevel ?? 0,
                    align: 'left',
                  },
                  {
                    name: 'exp-level',
                    label: 'Expected Level',
                    field: (s) => s.skillExpectedLevels.expectedLevel,
                    align: 'left',
                  },
                  {
                    name: 'result',
                    label: 'Result',
                    field: 'passed',
                    align: 'left',
                  },
                ] as QTableColumn<SkillCollection>[]
              "
              :rows="props.row.skillCollections || []"
              row-key="id"
            >
              <template #body="props">
                <q-tr :props>
                  <q-td key="name">
                    {{ props.row.skillExpectedLevels?.skill?.name }}
                  </q-td>
                  <q-td
                    key="level"
                    :class="evaluationMode ? `cursor-pointer bg-amber-2` : ''"
                  >
                    <q-select
                      v-model="props.row.gainedLevel"
                      v-if="evaluationMode"
                      dense
                      outlined
                      autofocus
                      :options="[1, 2, 3, 4, 5]"
                      @update:model-value="
                        () =>
                          (props.row.passed =
                            props.row.gainedLevel >=
                            props.row.skillExpectedLevels.expectedLevel)
                      "
                    ></q-select>
                    <span v-else>{{ props.row.gainedLevel ?? 0 }}</span>
                  </q-td>
                  <q-td key="exp-level">
                    {{ props.row.skillExpectedLevels.expectedLevel }}
                  </q-td>
                  <q-td :class="` ${computeResult(props.row).css} text-bold`">
                    {{ computeResult(props.row).text }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts" setup>
import type { QTableColumn } from 'quasar';
import DialogForm from 'src/components/DialogForm.vue';
import TableSheetJS from 'src/components/TableSheetJS.vue';
import { CourseService } from 'src/services/course';
import { useCourseStore } from 'src/stores/course';
import type { CourseEnrollment } from 'src/types/course';
import type { SkillCollection } from 'src/types/skill-collection';
import type { SkillExpectedLevel } from 'src/types/skill-exp-lvl';
import { downloadTemplateForStudents } from 'src/utils/file-template';
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const store = useCourseStore();
const sheet = ref();
const filterStudent = ref();
const route = useRoute();
const dialogImport = ref(false);
const enrollments = ref<CourseEnrollment[]>([]);
const expanded = ref<number[]>([]);
const evaluationMode = ref(false);
const { t } = useI18n();

watch(
  () => evaluationMode.value,
  () => {
    if (evaluationMode.value) {
      expanded.value = Array.from(
        { length: enrollments.value.length },
        (_, i) => i + 1,
      );
    } else {
      expanded.value = [];
    }
  },
);

const computeResult = computed(() => (sk: SkillCollection) => {
  if (sk.gainedLevel === 0 || !sk.gainedLevel) {
    return { text: 'Not Evaluated', css: 'text-grey' };
  }
  if (sk.gainedLevel >= sk.skillExpectedLevels.expectedLevel) {
    return { text: 'Passed', css: 'text-green' };
  } else {
    return { text: 'Failed', css: 'text-red' };
  }
});

const computeSumResult = computed(() => (sk: SkillCollection[]) => {
  if (sk.some((s) => s.gainedLevel === 0 || !s.gainedLevel)) {
    return { text: 'Not Evaluated', css: 'text-grey' };
  }
  const result = sk.every((s) => s.passed);
  if (result) {
    return { text: 'Passed', css: 'text-green' };
  } else {
    return { text: 'Failed', css: 'text-red' };
  }
});

async function fetchCourse() {
  await CourseService.getOne(store.getCourseId).then((res) => {
    store.course = res;
  });
  await CourseService.getEnrollment(store.getCourseId).then(
    (res) => (enrollments.value = res),
  );
}

function makeSkillTree(skills: Partial<SkillExpectedLevel>[]) {
  return skills.map((s) => ({ ...s.skill, level: s.expectedLevel }));
}

const skillTree = ref();

onMounted(async () => {
  filterStudent.value = '';
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  route.params.id && store.setCourseId(String(route.params.id));
  await fetchCourse();
  skillTree.value = makeSkillTree(
    store.course.subject?.skillExpectedLevels || [],
  );
});

const columns: QTableColumn<CourseEnrollment>[] = [
  {
    name: 'id',
    label: 'Student ID',
    field: (s) => s.student.id,
    align: 'left',
  },
  {
    name: 'name',
    label: 'Name',
    field: (s) => s.student.name,
    align: 'left',
  },
  {
    name: 'result',
    label: 'Summary Result',
    field: (s) => s.skillCollections.map((s) => s.passed),
    sortable: true,
    align: 'left',
  },
  {
    name: 'skills',
    label: 'Skills',
    field: (s) => s.skillCollections,
    align: 'left',
  },
];

const handleImport = async () => {
  const sheetItems = sheet.value.items;

  const studentListId = sheetItems.map((args: { id: string }) => {
    return String(args.id);
  });

  await CourseService.importStudents(store.getCourseId, studentListId);
  dialogImport.value = false;
  window.location.reload();
};
</script>
