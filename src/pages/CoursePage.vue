<template>
  <q-page padding>
    <div class="text-h6">{{ title }}</div>
    <q-separator class="q-my-md" />
    <div class="flex flex-center q-gutter-sm">
      <q-input
        outlined
        clearable
        v-model="filterCourse"
        label="Search"
        class="col"
        dense
      >
        <template #prepend>
          <q-icon name="search"></q-icon>
        </template>
      </q-input>
      <q-space />
      <q-btn @click="handleOpenDialog" color="secondary" label="add">
        <q-dialog v-model="isDialogOpen" full-width>
          <q-card>
            <q-card-section class="q-gutter-y-md">
              <div class="text-h6">New Course</div>
              <q-select
                outlined
                v-model="formCourse.subject"
                :options="optionSubjects"
                option-label="thaiName"
                options-dense
              ></q-select>

              <TableSheetJS ref="sheet" text="Import students" />
            </q-card-section>
            <q-card-actions class="justify-end q-pa-md">
              <q-btn label="cancel" @click="isDialogOpen = false"></q-btn>
              <q-btn
                color="primary"
                :disable="!formCourse.subject"
                label="save"
                @click="handleImport"
              ></q-btn>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-btn>
    </div>
    <section class="q-mt-md q-gutter-y-lg">
      <q-card class="q-pa-md" v-for="data in mockCourse" :key="data.id">
        <div class="row justify-between">
          <span class="text-h6"
            >{{ data.subject.name ?? data.subject.engName }}
            <p class="text-caption">{{ data.subject.engName }}</p>
          </span>
          <q-btn icon="edit" flat></q-btn>
        </div>
        <div style="text-indent: 1rem" class="q-py-sm">
          {{ data.subject.description }}
        </div>
        <q-card-section class="text-body1">
          <q-expansion-item
            label="Enrolled students"
            style="border: solid #ccc 1px; border-radius: 5px"
          >
            <q-table
              :columns="columnsTable"
              :rows="data.courseEnrollments"
              row-key="id"
              style="max-height: 400px"
              flat
              :filter="filterStudent"
            >
              <template #top-right>
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
                          name: 'level',
                          label: 'Level',
                          field: 'level',
                        },
                        {
                          name: 'result',
                          label: 'Result',
                          field: (s) => (s.passed ? 'Passed' : 'Failed'),
                        },
                      ]"
                      :rows="props.value"
                      row-key="id"
                    >
                    </q-table>
                  </q-popup-edit>
                </q-td>
              </template>
            </q-table>
          </q-expansion-item>
        </q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<script lang="ts" setup>
import { QTable, QTableColumn, useMeta } from 'quasar';
import TableSheetJS from 'src/components/TableSheetJS.vue';
import { mockCourse } from 'src/mock/course';
import { SubjectService } from 'src/services/subject';
import { Course } from 'src/types/course';
import { SkillCollection } from 'src/types/skill-collection';
import { Subject } from 'src/types/subject';
import { groupBy } from 'src/utils/sheet2object';
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const sheet = ref();
const isDialogOpen = ref(false);
const filterCourse = ref();
const filterStudent = ref();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const skillDialog = ref<boolean>(false);
const optionSubjects = ref<Subject[]>([]);
const sheetItems = computed(() => sheet.value?.items);

const handleImport = () => {
  const groupedByStudentID = groupBy(
    sheetItems.value,
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
            passed: item.result === 1 ? true : false,
          } as SkillCollection)
      ),
      gainScore: {
        project: 0,
        examMid: 0,
        examFinal: 0,
        assignment: 0,
      },
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
  //push to array & post api
  mockCourse.value.push(formCourse);
  isDialogOpen.value = false;
};
const handleOpenDialog = async () => {
  isDialogOpen.value = true;
  optionSubjects.value = await SubjectService.fetchAll();
};

const columnsTable: QTableColumn[] = [
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
    name: 'engName',
    label: 'Eng Name',
    field: (s) => s.student.engName,
  },
  {
    name: 'overallScore',
    label: 'Score',

    field: (s) => {
      return (
        s.gainScore.project +
        s.gainScore.examMid +
        s.gainScore.examFinal +
        s.gainScore.assignment
      );
    },
  },
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

    format(val: SkillCollection[]) {
      return val?.map((i) => i.passed).includes(false) ? 'Failed' : 'Passed';
    },
  },
];

const formCourse = reactive<Course>({
  subject: {},
  curriculum: {},
  teacher: {},
  courseEnrollments: [],
  description: '',
  active: true,
  score: {
    project: 0,
    examMid: 0,
    examFinal: 0,
    assignment: 0,
  },
});

useMeta({
  title: title.value,
});
</script>
