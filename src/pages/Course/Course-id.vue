<template>
  <q-page padding class="q-gutter-y-md">
    <div>
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Courses" to="/courses" />
        <q-breadcrumbs-el :label="`${courseId}`" />
      </q-breadcrumbs>
    </div>
    <q-separator class="q-my-sm" />
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ course.name }}</div>
        <div class="text-body2">
          <div>Course Description: {{ course.description }}</div>
          <div>Subject Description: {{ course.subject?.description }}</div>
        </div>
      </q-card-section>
    </q-card>

    <q-table
      :rows="rows ?? []"
      :row-key="(s) => s.student.id"
      :columns="columns"
      :filter="filterStudent"
    >
      <template #top>
        <div class="q-pb-sm">
          <span class="text-h6">Course Enrollment</span>
        </div>
        <div class="flex justify-between fit">
          <div class="row q-gutter-x-sm">
            <q-btn
              label="import"
              icon="upload"
              outline
              color="primary"
              @click="dialogImport = true"
            >
              <DialogForm
                title="Import Students"
                v-model="dialogImport"
                @save="handleImport"
              >
                <template #body>
                  <q-separator />
                  <TableSheetJS text="import" ref="sheet" />
                </template>
              </DialogForm>
            </q-btn>
            <q-btn
              label="export"
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
              placeholder="Search"
            >
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn label="add" unelevated color="primary" />
          </div>
        </div>
      </template>
      <template #body-cell-skills="props">
        <q-td :props="props">
          <q-btn flat icon="info" @click="skillDialog = true"> </q-btn>
          <q-popup-edit v-model="skillDialog">
            <div class="text-body2 q-mb-sm">
              Skill Collection
              <span class="float-right"
                ><q-btn
                  v-close-popup
                  icon="close"
                  flat
                  size="xs"
                  padding="none"
                />
              </span>
            </div>
            <q-table
              hide-bottom
              flat
              dense
              separator="cell"
              :columns="[
                {
                  name: 'id',
                  label: 'ID',
                  field: (s) => s.skill.id,
                },
                {
                  name: 'skill',
                  label: 'Name',
                  field: (s) => s.skill.name,
                },
                {
                  name: 'score',
                  label: 'Score',
                  field: (s) => s.skill.score,
                },
                {
                  name: 'level',
                  label: 'Level',
                  field: 'level',
                },
                {
                  name: 'result',
                  label: 'Result',
                  field: 'passed',
                },
              ]"
              :rows="props.value"
              row-key="id"
            >
              <template #body-cell-result="props">
                <q-td
                  :class="` ${
                    props.value ? 'text-green' : 'text-red'
                  } text-bold`"
                >
                  {{ props.value ? 'Passed' : 'Failed' }}
                </q-td>
              </template>
            </q-table>
          </q-popup-edit>
        </q-td>
      </template>
      <template #body-cell-result="props">
        <q-td
          :class="` ${
            props.value === 'Passed' ? 'text-green' : 'text-red'
          } text-bold text-right `"
        >
          {{ props.value === 'Passed' ? 'Passed' : 'Failed' }}
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

const rows = ref<CourseEnrollment[]>();

const course = ref<Course>({
  name: '',
  description: '',
  active: true,
  subject: null,
  teachers: [],
  courseEnrollments: [],
});

function fetchCourse() {
  CourseService.getOne(courseId.value).then((res) => {
    course.value = res;
  });
}

onMounted(() => {
  filterStudent.value = '';
  route.params.id && (courseId.value = Number(route.params.id));
  fetchCourse();
});

const columns: QTableColumn[] = [
  {
    name: 'id',
    label: 'Student ID',
    field: (s) => s.student.id,
  },
  // {
  //   name: 'name',
  //   label: 'Name',
  //   field: (s) => s.student.name,
  // },
  // {
  //   name: 'engName',
  //   label: 'Eng Name',
  //   field: (s) => s.student.engName,
  // },
  {
    name: 'skills',
    label: 'Skills',
    field: 'skillCollection',
    align: 'center',
  },
  {
    name: 'result',
    label: 'Result',
    field: 'skillCollection',
    sortable: true,

    format(val: SkillCollection[]) {
      return val?.map((i) => i.passed).includes(false) ? 'Failed' : 'Passed';
    },
  },
];

const handleImport = () => {
  const sheetItems = sheet.value.items;
  if (!course.value.id) return;

  const studentListId = sheetItems.map((args: { student_id: string }) => {
    return String(args.student_id);
  });

  CourseService.importStudents(courseId.value, studentListId);
};
</script>
