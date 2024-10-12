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
        <div class="text-h6">Course Name</div>
        <div class="text-body2">
          <div>eng name:</div>
          <div>description:</div>
        </div>
      </q-card-section>
    </q-card>

    <q-table
      :columns="columns"
      :rows="rows"
      row-key="id"
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
import { mockCourse } from 'src/mock/course';
import { Course, CourseEnrollment } from 'src/types/course';
import { SkillCollection } from 'src/types/skill-collection';
import { groupBy } from 'src/utils/sheet2object';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const sheet = ref();
const filterStudent = ref();
const skillDialog = ref();
const rows = ref<CourseEnrollment[]>([]);
const courseId = ref(0);
const route = useRoute();
const dialogImport = ref(false);

const formCourse = reactive<Course>({
  description: '',
  active: true,
  subject: null,
  curriculum: null,
  teachers: [],
  courseEnrollments: [],
});

onMounted(() => {
  filterStudent.value = '';
  //fake fetch api
  route.params.id && (courseId.value = Number(route.params.id));
  rows.value = mockCourse.value[0].courseEnrollments;
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
  const groupedByStudentID = groupBy(
    sheet.value.item,
    (i: { student_id: string }) => i.student_id
  );

  Object.entries(groupedByStudentID).map(([student_id, items]): void => {
    formCourse.courseEnrollments.push({
      student: { id: Number(student_id) },
      skillCollection: items.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) =>
          ({
            skill: { id: Number(item.skill_id) },
            subject: formCourse.subject,
            level: item.gain_level,
            score: 0,
            passed: item.result === 1 ? true : false,
          } as unknown as SkillCollection)
      ),
    });
    // return {
    //   id: Number(student_id),
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   skillCollection: items.map((item: any) => ({
    //     skillMapping: {
    //       skillId: item.skill_id,
    //       subjectId: formCourse.subject.id ?? 0,
    //       expectedLevel: 1,
    //       expectedMean: item.gain_level,
    //     },
    //     acquiredLevel: item.gain_level,
    //     passed: item.result === 1 ? true : false,
    //   })),
    // };
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // formCourse.students = sheetItems.value.map((item: any): Partial<Student> => {
  //   return {
  //     id: item.student_id,
  //     skillCollection: [
  //       {
  //         skillMapping: {
  //           skillId: item.skill_id,
  //           subjectId: 0,
  //           expectedLevel: 1,
  //           expectedMean: item.gain_level,
  //         },
  //         acquiredLevel: item.gain_level,
  //         passed: item.result === 1 ? true : false,
  //       },
  //     ],
  //   };
  // });
};
</script>
