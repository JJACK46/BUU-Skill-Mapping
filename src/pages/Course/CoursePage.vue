<template>
  <q-page padding>
    <PageHeader
      v-model:searchText="filterCourse"
      @open-dialog="handleOpenDialog"
    />
    {{ filterCourse }}
    <q-dialog v-model="isDialogAdd" full-width>
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
          <q-btn label="cancel" @click="isDialogAdd = false"></q-btn>
          <q-btn
            color="primary"
            :disable="!formCourse.subject"
            label="save"
            @click="handleImport"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-separator class="q-my-md" />
    <section class="q-gutter-lg row">
      <q-card
        class="col-grow col-md-auto"
        v-for="data in mockCourse"
        :key="data.id"
        style="width: 300px; max-height: 400px"
      >
        <q-card-section>
          <div class="row justify-between">
            <span class="text-h6"
              >{{ data.subject.name ?? data.subject.engName }}
            </span>
            <q-btn icon="more_vert" flat padding="none" />
          </div>
          <div style="text-indent: 1rem" class="q-py-sm text-body2">
            {{ data.subject.description }}
          </div>
        </q-card-section>
        <q-card-actions class="text-body1 q-pa-md" align="between">
          <div>{{ new Date().toLocaleDateString() }}</div>
          <q-btn
            label="View"
            unelevated
            color="primary"
            @click="handleViewCourse(data.id)"
          >
          </q-btn>
        </q-card-actions>
      </q-card>
    </section>
  </q-page>
</template>

<script lang="ts" setup>
import { useMeta } from 'quasar';
import PageHeader from 'src/components/PageHeader.vue';
import TableSheetJS from 'src/components/TableSheetJS.vue';
import { mockCourse } from 'src/mock/course';
import { SubjectService } from 'src/services/subject';
import { Course } from 'src/types/course';
import { SkillCollection } from 'src/types/skill-collection';
import { Subject } from 'src/types/subject';
import { groupBy } from 'src/utils/sheet2object';
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const sheet = ref();
const isDialogAdd = ref(false);
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const optionSubjects = ref<Subject[]>([]);
const sheetItems = computed(() => sheet.value?.items);
const router = useRouter();
const filterCourse = ref('');

const handleViewCourse = (id: number | undefined) => {
  if (id) {
    router.push({ name: 'course-detail', params: { id } });
  }
};

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
            score: 0,
            passed: item.result === 1 ? true : false,
          } as SkillCollection)
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
  //push to array & post api
  mockCourse.value.push(formCourse);
  isDialogAdd.value = false;
};
const handleOpenDialog = async () => {
  isDialogAdd.value = true;
  optionSubjects.value = await SubjectService.fetchAll();
};

const formCourse = reactive<Course>({
  subject: {},
  curriculum: {},
  teachers: [],
  courseEnrollments: [],
  description: '',
  active: true,
});

useMeta({
  title: title.value,
});
</script>
