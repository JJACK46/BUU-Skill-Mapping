<template>
  <div class="text-h4 text-primary">
    {{ t('subjects') }}
  </div>

  <MainHeader
    v-model:search-text="store.search"
    v-model:filter-model="store.filterModel"
    @open-dialog="coursespec.handleOpenDialog"
    hide-filter
  />
  <!-- Add & Edit Dialog -->
  <DialogForm
    v-model="coursespec.dialogState"
    :title="coursespec.getDialogTitle"
    v-model:form-valid="formValid"
    ref="formRef"
    @save="handleSave"
  >
    <q-select
      filled
      outlined
      dense
      v-model="coursespec.form.subjectCode"
      @update:model-value="updateSubjectCode"
      use-input
      hide-selected
      label="Search ID"
      :options="store.getSubjects"
      option-value="subjectCode"
      :option-label="computedLabel"
      @filter="filterFn"
      :popup-offset="[0, 5]"
    />
    <q-input
      v-model="coursespec.form.subjectCode"
      outlined
      dense
      label="ID *"
      mask="########"
      :rules="[(val) => !!val || 'Required']"
    />
    <q-select
      v-model="coursespec.form.type"
      outlined
      dense
      label="Type *"
      :options="Object.values(SubjectType)"
      :rules="[requireField]"
    >
      <template #before-options></template>
    </q-select>
    <q-input
      v-model="coursespec.form.thaiName"
      outlined
      dense
      label="Name *"
      :rules="[requireField, onlyThai]"
    />
    <q-input
      v-model="coursespec.form.engName"
      outlined
      dense
      label="Eng Name *"
      :rules="[requireField, onlyEnglish]"
    />
    <q-input
      v-model="coursespec.form.thaiDescription"
      outlined
      dense
      type="textarea"
      label="Description *"
      :rules="[requireField, onlyThai]"
    />
    <q-input
      v-model="coursespec.form.engDescription"
      outlined
      dense
      type="textarea"
      label="Description *"
      :rules="[requireField, onlyEnglish]"
    />
    <q-input
      v-model="coursespec.form.credit"
      outlined
      dense
      label="Credit *"
      mask="# (#-#-#)"
      :rules="[requireField]"
    />
  </DialogForm>
  <!--Table-->
  <q-table
    flat
    bordered
    class="q-animate--fade q-mt-lg"
    separator="cell"
    :rows="curr.form.courseSpecs || coursespec.getSubjects"
    row-key="id"
    :pagination="store.pagination"
    :loading="global.getLoadingState"
    :columns="subjectColumns"
    @update:pagination="coursespec.fetchData()"
  >
    <template #body-cell-number="props">
      <q-td>
        {{ props.rowIndex + 1 }}
      </q-td>
    </template>
    <template #body-cell-actions="props">
      <q-td class="q-gutter-x-sm" style="min-width: 100px">
        <q-btn
          label="Clos"
          padding="none"
          color="blue"
          style="width: 50px"
          @click="handleClo(props.row)"
        ></q-btn>
        <q-btn
          icon="edit"
          padding="none"
          flat
          @click="handleOpenDialog(props.row)"
        ></q-btn>
        <q-btn
          icon="delete"
          padding="none"
          flat
          @click="handleRemove(props.row)"
        ></q-btn>
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
import { useQuasar, type QTableColumn } from 'quasar';
import MainHeader from 'src/components/PageHeader.vue';

import { useCurriculumStore } from 'src/stores/curriculum';
import { useGlobalStore } from 'src/stores/global';
import { useSubjectStore } from 'src/stores/subject';
import { onlyEnglish, onlyThai, requireField } from 'src/utils/field-rules';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import DialogForm from 'src/components/DialogForm.vue';
import { SubjectType } from 'src/types/subjectType.enum';
// import type { Subject } from 'src/types/subject';
import { useRouter } from 'vue-router';

// const subjects = ref<CourseSpec[]>();
const store = useSubjectStore();
const curriculumStore = useCurriculumStore();
const { t } = useI18n();
const global = useGlobalStore();
const curr = useCurriculumStore();
const q = useQuasar();
const formRef = ref();
const coursespec = useCourseSpecStore();
const subjectColumns: QTableColumn[] = [
  {
    name: 'number',
    label: 'No.',
    field: () => {},
    align: 'left',
    sortable: true,
  },
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'left',
    sortable: true,
  },
  {
    name: 'thaiName',
    label: 'Name',
    field: 'thaiName',
    align: 'left',
  },
  {
    name: 'engName',
    label: 'English Name',
    field: 'engName',
    align: 'left',
  },
  {
    name: 'credit',
    label: 'Credit',
    field: 'credit',
    align: 'left',
  },
  {
    name: 'type',
    label: 'Type',
    field: 'type',
    align: 'left',
  },
  // {
  //   name: 'clos',
  //   label: 'Clos',
  //   field: 'clos',
  //   align: 'left',
  // },
  {
    name: 'actions',
    label: 'Actions',
    field: '',
    align: 'left',
  },
];

const formValid = computed(() => {
  return !!(
    coursespec.form.subjectCode &&
    coursespec.form.type &&
    coursespec.form.thaiName &&
    coursespec.form.engName &&
    coursespec.form.thaiDescription &&
    coursespec.form.engDescription &&
    coursespec.form.credit
  );
});
onMounted(async () => {
  await store.fetchData();
  await coursespec.fetchData();
  await curriculumStore.fetchData();
  await curriculumStore.fetchSubjectsData();
  const curriculumId = curriculumStore.getInsertId;
  console.log(curriculumId);
  store.curriculumId = curriculumId;
  // console.log(a);
  // if (auth.isAdmin) {
  //   columns.value.push({
  //     name: 'actions',
  //     label: 'Actions',
  //     field: 'actions',
  //     align: 'left',
  //   });
  // }
});
import { watchEffect } from 'vue';
import { useCourseSpecStore } from 'src/stores/couse-spec';
import type { CourseSpec } from 'src/types/course-spec';

watchEffect(() => {
  console.log('Updated curriculumId:', curriculumStore.getInsertId);
  store.curriculumId = curriculumStore.getInsertId;
});
const handleSave = () => {
  if (coursespec.getSubjects) {
    curr.form.courseSpecs = [...coursespec.getSubjects];
  } else if (!curr.form.courseSpecs) {
    curr.form.courseSpecs = [];
  }
  const existingSubjectIndex = curr.form.courseSpecs.findIndex(
    (subject) => subject.subjectCode === coursespec.form.subjectCode,
  );
  console.log(existingSubjectIndex);
  if (existingSubjectIndex !== -1) {
    curr.form.courseSpecs[existingSubjectIndex] = coursespec.form as CourseSpec;
  } else {
    curr.form.courseSpecs.push(coursespec.form as CourseSpec);
  }

  coursespec.dialogState = false;
};
const handleOpenDialog = (item: CourseSpec) => {
  coursespec.form = JSON.parse(JSON.stringify(item));
  coursespec.dialogState = true;
};
const handleRemove = (item: CourseSpec) => {
  q.dialog({
    title: 'Confirm',
    message: 'Are you sure?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    curr.form.courseSpecs = curr.form.courseSpecs.filter(
      (c) => c.subjectCode !== item.subjectCode,
    );
  });
};
const filteredOptions = ref(store.getSubjects);
// const selectedSubject = ref('');

const updateSubjectCode = (val) => {
  if (val) {
    coursespec.form.subjectCode = val.id;
    // ใช้ id ของ option ที่เลือก
  } else {
    coursespec.form.subjectCode = ''; // ถ้าเป็น null ให้เคลียร์ค่า
  }
  console.log('Selected subjectCode:', coursespec.form.subjectCode);
};

const computedLabel = (option) => {
  return `${option.id} - ${option.name}`;
};

const filterFn = (val, update) => {
  if (val === '') {
    update(() => {
      filteredOptions.value = store.getSubjects;
    });
    return;
  }

  const needle = val.toLowerCase();
  update(() => {
    filteredOptions.value = store.getSubjects.filter((subject) =>
      subject.name.toLowerCase().includes(needle),
    );
  });
};
const router = useRouter();
const handleClo = (row) => {
  console.log(
    'Navigating to:',
    `/curriculums/${store.curriculumId}/subjects/${1}/clos`,
  );
  router
    .push(`/curriculums/${store.curriculumId}/subjects/${row.subjectCode}/clos`)
    .then(() => {
      console.log('Navigation succeeded');
    })
    .catch((error) => {
      console.log('Navigation error:', error);
    });
};
</script>
