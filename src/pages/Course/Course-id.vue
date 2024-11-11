<template>
  <q-page padding class="q-gutter-y-md">
    <div>
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Courses" to="/courses" />
        <q-breadcrumbs-el :label="`${courseId}`" />
      </q-breadcrumbs>
    </div>
    <q-separator class="q-my-sm" />
    <!-- Top Card -->
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ course.name }}</div>
        <div class="text-body2">
          <div>Course Description: {{ course.description }}</div>
          <div>Subject ID: {{ course.subject?.id }}</div>
          <div>Subject Name: {{ course.subject?.name }}</div>
          <div>Subject Description: {{ course.subject?.description }}</div>
          <div>Subject Skills:
            <ul>
              <li v-for="s in course.subject?.skillExpectedLevels" :key="s.id">
                {{ s.skill?.name }} - {{ s.expectedLevel }}
              </li>
            </ul>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <!-- Table -->
    <q-table :rows="enrollments ?? []" row-key="id" :columns="columns" :filter="filterStudent">
      <template #top>
        <div class="q-pb-sm">
          <span class="text-h6">Course Enrollment</span>
        </div>
        <div class="flex justify-between fit">
          <div class="row q-gutter-x-sm">
            <q-btn label="import" icon="upload" outline color="primary" @click="dialogImport = true">
              <DialogForm title="Import Students" v-model="dialogImport" @save="handleImport">
                <template #body>
                  <q-separator />
                  <TableSheetJS text="import" ref="sheet" />
                </template>
              </DialogForm>
            </q-btn>
            <q-btn label="export" icon="cloud_download" outline color="primary" />
          </div>
          <div class="row q-gutter-x-sm">
            <q-input outlined dense debounce="200" v-model="filterStudent" placeholder="Search">
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn label="add" unelevated color="primary" />
          </div>
        </div>
      </template>
      <template #body-cell-skills="props">
        <q-td style="cursor: pointer;">
          <!-- Popup Skill -->
          <q-btn class="flex q-mx-auto" flat icon="info" @click="skillDialog = true"> </q-btn>
          <q-popup-edit v-model="skillDialog">
            <div class="text-body2 text-bold q-mb-sm">
              Skill Collection
              <span class="float-right"><q-btn v-close-popup icon="close" flat size="xs" padding="none" />
              </span>
            </div>
            <q-table hide-bottom flat dense separator="cell" :columns="([
              {
                name: 'skill',
                label: 'Name',
                field: (s) => s.skillExpectedLevels?.skill?.name,
              },
              {
                name: 'level',
                label: 'Gained Level',
                field: (s) => s.gainLevel ?? 0,
              },
              {
                name: 'expected-level',
                label: 'Expected Level',
                field: (s) => s.skillExpectedLevels.expectedLevel,
              },
              {
                name: 'result',
                label: 'Result',
                field: 'passed',
              },
            ] as QTableColumn<SkillCollection>[])" :rows="props.value || []" row-key="id">
              <template #body-cell-result="props">
                <q-td :class="` ${computedResult(props.row).css} text-bold`">
                  {{ computedResult(props.row).text }}
                </q-td>
              </template>
            </q-table>
          </q-popup-edit>
        </q-td>
      </template>
      <template #body-cell-result="props">
        <q-td :class="` ${computedResult(props.row).css} text-bold text-right`">
          {{ computedResult(props.row).text }}
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts" setup>
import { QTableColumn } from 'quasar';
import DialogForm from 'src/components/DialogForm.vue';
import TableSheetJS from 'src/components/TableSheetJS.vue';
import { CourseService } from 'src/services/course';
import { Course, CourseEnrollment } from 'src/types/course';
import { SkillCollection } from 'src/types/skill-collection';
// import { groupBy } from 'src/utils/sheet2object';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const sheet = ref();
const filterStudent = ref();
const skillDialog = ref();
const courseId = ref(0);
const route = useRoute();
const dialogImport = ref(false);
const enrollments = ref<CourseEnrollment[]>([]);

function computedResult(sk: SkillCollection) {
  if (sk.gainLevel === 0 || !sk.gainLevel) {
    return { text: 'Not Evaluated', css: 'text-grey' }
  }
  if (sk.gainLevel >= sk.skillExpectedLevels.expectedLevel) {
    return { text: 'Passed', class: 'text-green' }
  } else {
    return { text: 'Failed', class: 'text-red' }
  }
}

const course = ref<Course>({
  name: '',
  description: '',
  active: true,
  subject: null,
  teachers: [],
  courseEnrollment: [],
});

function fetchCourse() {
  CourseService.getOne(courseId.value).then((res) => {
    course.value = res;
  });
  CourseService.getEnrollment(courseId.value).then(res => enrollments.value = res)
}

onMounted(() => {
  filterStudent.value = '';
  route.params.id && (courseId.value = Number(route.params.id));
  fetchCourse();
});

const columns: QTableColumn<CourseEnrollment>[] = [
  {
    name: 'id',
    label: 'Student ID',
    field: (s) => s.student.id,
  },
  {
    name: 'name',
    label: 'Name',
    field: (s) => s.student.name,
  },
  {
    name: 'skills',
    label: 'Skills',
    field: (s) => s.skillCollections,
    align: 'center'
  },
  {
    name: 'result',
    label: 'Summary Result',
    field: (s) => s.skillCollections?.map((i) => i.passed),
    sortable: true,
  },
];

const handleImport = async () => {
  const sheetItems = sheet.value.items;

  const studentListId = sheetItems.map((args: { id: string }) => {
    return String(args.id);
  });

  await CourseService.importStudents(courseId.value, studentListId);
  dialogImport.value = false;
  window.location.reload();
};
</script>
