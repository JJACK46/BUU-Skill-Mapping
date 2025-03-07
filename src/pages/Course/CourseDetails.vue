<template>
  <q-page>
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
        </q-card-section>
      </q-card>
    </section>
    <!-- Table clo + skill -->
    <q-card flat bordered class="q-my-md q-animate--fade">
      <q-table :rows="mockCloRow" :columns>
        <template #body-cell-number="props">
          <q-td>{{ props.rowIndex + 1 }}</q-td>
        </template>
        <template #body-cell-actions>
          <ActionsCell
            @handle-edit="toggleDialogClo()"
            @handle-delete="() => {}"
          />
        </template>
      </q-table>
    </q-card>
    <!-- open dialog clo -->
    <DialogForm
      v-model:model-value="dialogClo"
      title="Update Score"
      @save="() => {}"
      width="60%"
      @vue:unmounted="store.$reset"
    >
      <q-table :rows="mockStudents" :columns="columnsScores" flat>
        <template #top>
          <div class="text-primary text-weight-medium text-h5 q-pb-lg">
            CLO / Skill
          </div>
        </template>
        <template #body-cell-number="props">
          <q-td>{{ props.rowIndex + 1 }}</q-td>
        </template>
        <template #body-cell-gained="props">
          <q-td :props="props">
            <q-input
              v-model.number="props.row[props.col.name]"
              type="number"
              dense
              borderless
            />
          </q-td>
        </template>
        <template #body-cell-actions>
          <ActionsCell
            @handle-edit="() => {}"
            @handle-delete="() => {}"
          /> </template
      ></q-table>
    </DialogForm>
    <!-- Table -->
  </q-page>
</template>

<script lang="ts" setup>
// import DialogForm from 'src/components/DialogForm.vue';
// import TableSheetJS from 'src/components/TableSheetJS.vue';
import { useMeta, type QTableColumn } from 'quasar';
import ActionsCell from 'src/components/ActionsCell.vue';
import DialogForm from 'src/components/DialogForm.vue';
import { useCourseStore } from 'src/stores/course';
import type { Clo } from 'src/types/clo';
import type { Skill } from 'src/types/skill';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const store = useCourseStore();
const dialogClo = ref(false);
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
    field: (r) => r.clo.name,
    align: 'left',
  },
  {
    name: 'skill',
    label: 'Skill',
    field: (r) => r.skill.thaiName || r.skill.engName,
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

type CloRow = {
  clo: Partial<Clo>;
  skill: Partial<Skill>;
};

const mockCloRow: CloRow[] = [
  {
    clo: {
      id: 1,
      name: 'CLO 1',
    },
    skill: {
      id: 1,
      thaiName: '',
      engName: 'Programming',
    },
  },
  {
    clo: {
      id: 1,
      name: 'CLO 1',
    },
    skill: {
      id: 1,
      thaiName: 'ออกแบบ UI',
      engName: 'UI Design',
    },
  },
  {
    clo: {
      id: 1,
      name: 'CLO 1',
    },
    skill: {
      id: 1,
      thaiName: 'SQL',
      engName: 'SQL',
    },
  },
];

type ScoreRow = {
  code: string;
  gained: number;
};

const mockStudents = ref<ScoreRow[]>([
  {
    code: '67100001',
    gained: 0,
  },
  {
    code: '67100002',
    gained: 0,
  },
  {
    code: '67100003',
    gained: 0,
  },
]);

// function makeSkillTree(skills: Partial<SkillExpectedLevel>[]) {
//   return skills.map((s) => ({ ...s.skill, level: s.expectedLevel }));
// }

const toggleDialogClo = () => {
  dialogClo.value = !dialogClo.value;
};

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

useMeta({
  title: store.getCourse.subject?.thaiName,
});
</script>
