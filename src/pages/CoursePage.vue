<template>
  <q-page padding>
    <div class="text-h6">{{ title }}</div>
    <q-separator class="q-my-md" />
    <div class="flex flex-center q-gutter-sm">
      <q-input
        outlined
        clearable
        v-model="search"
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
              style="height: 340px"
              flat
            >
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
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const sheet = ref();
const isDialogOpen = ref(false);
const search = ref();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);

const optionSubjects = ref<Subject[]>([]);
const sheetItems = computed(() => sheet.value?.items);

const handleSave = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupedByStudentID: { [student_id: string]: any[] } =
    sheetItems.value.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (acc: { [x: string]: any[] }, item: { student_id: string | number }) => {
        if (!acc[item.student_id]) {
          acc[item.student_id] = [];
        }
        acc[item.student_id].push(item);
        return acc;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {} as { [student_id: string]: any[] }
    );

  formCourse.students = Object.entries(groupedByStudentID).map(
    ([student_id, items]): Partial<Student> => {
      return {
        id: Number(student_id),
        skillCollection: items.map((item) => ({
          skillMapping: {
            skillId: item.skill_id,
            subjectId: 0,
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
    label: 'Skill ID',
    field: 'skillCollection',
    format(val) {
      return val
        .map((skill: SkillCollection) => {
          return skill.skillMapping.skillId;
        })
        .join(', ');
    },
  },
  {
    name: 'expectedLevel',
    label: 'Expected Level',
    field: 'skillCollection',
    format(val) {
      return val
        .map((skill: SkillCollection) => {
          return skill.acquiredLevel;
        })
        .join(', ');
    },
  },
  {
    name: 'result',
    label: 'Result',
    field: 'skillCollection',
    format(val) {
      return val
        ?.map((skill: SkillCollection) => {
          return skill.passed ? 'Pass' : 'Fail';
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
