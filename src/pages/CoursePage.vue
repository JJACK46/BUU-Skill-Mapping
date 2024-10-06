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
              {{ formCourse.students }}
            </q-card-section>
            <q-card-actions class="justify-end q-pa-md">
              <q-btn label="cancel" @click="isDialogOpen = false"></q-btn>
              <q-btn
                color="primary"
                :disable="!formCourse.subject"
                label="save"
                @click="handleSave"
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
              :rows="data.students"
              row-key="name"
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
              <template #body-cell-skillCollection="props">
                <q-td :props="props">
                  <q-btn flat icon="info" @click="skillDialog = true"> </q-btn>
                  <q-popup-edit v-model="skillDialog" buttons>
                    {{ props?.value }}
                  </q-popup-edit>
                </q-td>
              </template>
              <template #body-cell-result="props">
                <q-td :props="props">
                  <span v-if="props">
                    {{
                      (props.value as string)
                        .split(', ')
                        .find((s) => s === 'Failed') ?? 'Passed'
                    }}
                  </span>
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
import { SkillCollection, Student } from 'src/types/student';
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

const handleSave = () => {
  const groupedByStudentID = groupBy(sheetItems.value, 'student_id');

  formCourse.students = Object.entries(groupedByStudentID).map(
    ([student_id, items]): Partial<Student> => {
      return {
        id: Number(student_id),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        skillCollection: items.map((item: any) => ({
          skillMapping: {
            skillId: item.skill_id,
            subjectId: formCourse.subject.id ?? 0,
            expectedLevel: 1,
            expectedMean: item.gain_level,
          },
          acquiredLevel: item.gain_level,
          passed: item.result === 1 ? true : false,
        })),
      };
    }
  );

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
    field: 'id',
  },
  {
    name: 'skillCollection',
    label: 'Skills',
    field: 'skillCollection',
    align: 'center',
    format(val) {
      return val
        .map((skill: SkillCollection) => {
          return skill.skillMapping.skillId;
        })
        .join(', ');
    },
  },
  {
    name: 'result',
    label: 'Result',
    field: 'skillCollection',
    align: 'left',

    format(val) {
      return val
        ?.map((skill: SkillCollection) => {
          return skill.passed ? 'Passed' : 'Failed';
        })
        .join(', ');
    },
  },
];

const formCourse = reactive<Course>({
  subject: null as unknown as Subject,
  curriculumId: 0,
  teacherId: 0,
  students: [],
});

useMeta({
  title: title.value,
});
</script>
