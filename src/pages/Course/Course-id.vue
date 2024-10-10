<template>
  <q-page padding>
    <div class="q-pb-sm q-px-md">
      <span>
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Courses" to="/courses" />
          <q-breadcrumbs-el :label="`${courseId}`" />
        </q-breadcrumbs>
      </span>
      <div class="text-body2">
        <div>name:</div>
        <div>eng name:</div>
      </div>
      <q-separator class="q-my-sm" />
    </div>
    <q-table
      :columns="columns"
      :rows="rows"
      row-key="id"
      flat
      :filter="filterStudent"
    >
      <template #top>
        <div class="q-py-sm">
          <span class="text-h6">Course Enrollment</span>
        </div>
        <div class="flex justify-between fit">
          <div class="row q-gutter-x-sm">
            <q-btn
              label="import"
              icon="upload"
              outline
              color="primary"
              @click="importDialog = true"
            >
              <q-dialog v-model="importDialog">
                <q-card>
                  <q-card-section>
                    <TableSheetJS text="import" />
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn label="close" unelevated v-close-popup></q-btn>
                    <q-btn label="save" unelevated color="primary"></q-btn>
                  </q-card-actions>
                </q-card>
              </q-dialog>
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
import TableSheetJS from 'src/components/TableSheetJS.vue';
import { mockCourse } from 'src/mock/course';
import { CourseEnrollment } from 'src/types/course';
import { SkillCollection } from 'src/types/skill-collection';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const filterStudent = ref();
const skillDialog = ref();
const rows = ref<CourseEnrollment[]>([]);
const courseId = ref(0);
const route = useRoute();
const importDialog = ref(false);

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
</script>
