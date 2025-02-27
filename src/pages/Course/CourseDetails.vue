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
          <div class="text-h6">
            {{ t('subjectId') }} {{ store.getCourse.subject?.id }}
          </div>
          <div class="text-h5">
            {{ store.getCourse.subject?.thaiName }}
          </div>
          <div class="text-body2 q-mt-sm">
            {{ store.getCourse.subject }}
          </div>
        </q-card-section>
      </q-card>
    </section>
    <!-- Table clo + skill -->
    <q-card flat bordered class="q-my-md q-animate--fade">
      <q-table :rows="[]" :columns></q-table>
    </q-card>
    <!-- open dialog clo -->
    <q-card flat bordered class="q-my-md q-animate--fade">
      <q-table :rows="[]" :columns="columnsScores"></q-table>
    </q-card>
    <!-- Table -->
  </q-page>
</template>

<script lang="ts" setup>
// import DialogForm from 'src/components/DialogForm.vue';
// import TableSheetJS from 'src/components/TableSheetJS.vue';
import type { QTableColumn } from 'quasar';
import { useCourseStore } from 'src/stores/course';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const store = useCourseStore();
// const sheet = ref();
// const filterStudent = ref();
// const route = useRoute();
// const dialogImport = ref(false);
// const expanded = ref<number[]>([]);
// const evaluationMode = ref(false);
const { t } = useI18n();

const columns: QTableColumn[] = [
  {
    name: 'number',
    label: 'No.',
    field: '',
    align: 'left',
  },
  {
    name: 'clo',
    label: 'CLO',
    field: '',
    align: 'left',
  },
  {
    name: 'skill',
    label: 'Skill',
    field: '',
    align: 'left',
  },
  {
    name: 'actions',
    label: 'Actions',
    field: '',
    align: 'left',
  },
];
const columnsScores: QTableColumn[] = [
  {
    name: 'number',
    label: 'No.',
    field: '',
    align: 'left',
  },
  {
    name: 'studentCode',
    label: 'Student code',
    field: 'code',
    align: 'left',
  },
  {
    name: 'gained',
    label: 'Gained Level',
    field: 'gained',
    align: 'left',
  },
];

// function makeSkillTree(skills: Partial<SkillExpectedLevel>[]) {
//   return skills.map((s) => ({ ...s.skill, level: s.expectedLevel }));
// }

onMounted(() => {
  store.fetchData();
  // skillTree.value = makeSkillTree(
  //   store.course.subject?.skillExpectedLevels || [],
  // );
});

// const handleImport = async () => {
//   const sheetItems = sheet.value.items;

//   const studentListId = sheetItems.map((args: { id: string }) => {
//     return String(args.id);
//   });

//   await CourseService.importStudents(store.getCourseId, studentListId);
//   dialogImport.value = false;
//   window.location.reload();
// };
</script>
