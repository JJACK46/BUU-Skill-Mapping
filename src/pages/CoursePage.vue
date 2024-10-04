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
        <q-dialog v-model="isDialogOpen">
          <q-card style="width: 500px">
            <q-card-section class="q-gutter-y-md">
              <div class="text-h6">New Course</div>
              <q-select
                outlined
                v-model="formCourse.subject"
                :options="optionSubjects"
                option-label="thaiName"
                options-dense
              ></q-select>
              <q-btn
                flat
                color="cyan"
                class="full-width"
                icon="file_upload"
                label="import students"
              ></q-btn>
            </q-card-section>
            <q-card-actions class="justify-end q-pa-md">
              <q-btn label="cancel" @click="isDialogOpen = false"></q-btn>
              <q-btn
                color="primary"
                :disable="!formCourse.subject"
                label="save"
              ></q-btn>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-btn>
    </div>
    <section class="q-mt-md">
      <q-card class="q-pa-md" v-for="data in mockCourse" :key="data.id">
        <div class="row justify-between">
          <span class="text-h6"
            >{{ data.subject.name }}
            <p class="text-caption">{{ data.subject.engName }}</p>
          </span>
          <q-btn icon="edit" flat></q-btn>
        </div>
        <div style="text-indent: 1rem" class="q-py-sm">
          {{ data.subject.description }}
        </div>
        <q-card-section class="text-body1">
          <q-expansion-item label="Enrolled students">
            <q-table
              :columns="columnsTable"
              :rows="data.students"
              row-key="name"
              hide-bottom
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
import { mockCourse } from 'src/mock/course';
import { SubjectService } from 'src/services/subject';
import { Course } from 'src/types/course';
import { SkillCollection } from 'src/types/student';
import { Subject } from 'src/types/subject';
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const isDialogOpen = ref(false);
const search = ref();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);

const optionSubjects = ref<Subject[]>([]);

const handleOpenDialog = async () => {
  isDialogOpen.value = true;
  optionSubjects.value = await SubjectService.fetchAll();
};

const columnsTable: QTableColumn[] = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
  },
  {
    name: 'engName',
    label: 'Eng Name',
    field: 'engName',
  },
  {
    name: 'phone',
    label: 'Phone',
    field: 'phone',
  },
  {
    name: 'skillCollection',
    label: 'Skills',
    field: 'skillCollection',
    format(val) {
      return val
        .map((skill: SkillCollection) => {
          return skill.skillMapping.skillId;
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
