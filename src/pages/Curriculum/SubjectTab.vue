<template>
  <div class="text-h4 text-primary">
    {{ t('subjects') }}
  </div>

  <MainHeader
    v-model:search-text="courseSpecStore.search"
    v-model:filter-model="courseSpecStore.filterModel"
    @open-dialog="courseSpecStore.handleOpenDialog"
    hide-filter
  />
  <!-- Add & Edit Dialog Subject -->
  <DialogForm
    v-model="courseSpecStore.dialogState"
    :title="courseSpecStore.getDialogTitle"
    v-model:form-valid="formValid"
    ref="formRef"
    width="60%"
    @save="handleAdd(courseSpecStore.formSubject as Subject)"
  >
    <div class="row q-gutter-x-sm">
      <div class="row q-gutter-sm">
        <!-- <q-select
          filled
          outlined
          dense
          v-model="courseSpecStore.formSubject"
          @update:model-value="updateSubjectCode"
          use-input
          hide-selected
          label="Search ID"
          :options="[]"
          option-value="subjectCode"
          :option-label="computedLabel"
          :popup-offset="[0, 5]"
        /> -->
        <q-input
          class="col"
          style="min-width: 200px"
          v-model="courseSpecStore.formSubject.code"
          outlined
          dense
          label="Code *"
          mask="########"
          :rules="[(val) => !!val || 'Required']"
        />
        <q-select
          style="min-width: 200px"
          class="col"
          v-model="courseSpecStore.formSubject.type"
          outlined
          dense
          label="Type *"
          :options="OptionSubjectType"
          :rules="[requireField]"
        >
        </q-select>
        <q-input
          v-model="courseSpecStore.formSubject.credit"
          outlined
          dense
          style="max-width: 200px"
          class="col"
          label="Credit *"
          mask="# (#-#-#)"
          :rules="[requireField]"
        />
        <div class="row col-12">
          <q-input
            class="col q-mr-sm"
            style="min-width: 200px"
            v-model="courseSpecStore.formSubject.thaiName"
            outlined
            dense
            label="Thai Name *"
            :rules="[requireField, onlyThai]"
          />
          <q-input
            class="col"
            style="min-width: 200px"
            v-model="courseSpecStore.formSubject.engName"
            outlined
            dense
            label="Eng Name *"
            :rules="[requireField, onlyEnglish]"
          />
        </div>

        <q-input
          class="col-12"
          v-model="courseSpecStore.formSubject.thaiDescription"
          outlined
          dense
          type="textarea"
          label="Description *"
          :rules="[requireField]"
        />
        <q-input
          class="col-12"
          v-model="courseSpecStore.formSubject.engDescription"
          outlined
          dense
          type="textarea"
          label="English Description *"
          :rules="[requireField]"
        />
      </div>
    </div>
  </DialogForm>
  <!--Table-->
  <q-table
    flat
    bordered
    class="q-animate--fade q-mt-lg"
    separator="cell"
    :rows="courseSpecStore.getData || []"
    row-key="code"
    :loading="global.getLoadingState"
    :columns="subjectColumns"
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
          unelevated
          style="width: 50px"
          @click="handleClo(props.row)"
        ></q-btn>
        <q-btn
          icon="edit"
          padding="none"
          flat
          color="grey-8"
          @click="handleOpenDialog(props.row)"
        ></q-btn>
        <q-btn
          icon="delete"
          padding="none"
          color="grey-8"
          flat
          @click="handleRemove(props.row)"
        ></q-btn>
      </q-td>
    </template>
  </q-table>
  <DialogForm v-model="dialogClo" @save="saveClo" title="CLO" ref="formRefCLO">
    <!-- Main Clo -->
    <div class="row q-gutter-x-md">
      <div class="col">
        <q-input v-model="formCLO.name" outlined dense :label="t('Name')" />
      </div>
      <div class="col">
        <q-select
          v-model="formCLO.expectedLevel"
          :options="[1, 2, 3, 4, 5]"
          outlined
          dense
          :label="t('Expected Level')"
          behavior="menu"
        >
        </q-select>
      </div>
      <div class="col-12 q-mt-md">
        <q-input
          v-model="formCLO.description"
          dense
          type="textarea"
          outlined
          :label="t('description') + ' *'"
        />
      </div>
    </div>

    <div class="row justify-between">
      <div class="col-12">
        <q-select v-model="formCLO.plos" outlined dense :label="t('PLO')" />
      </div>
    </div>
    <!-- Skill Section ? -->
    <!-- <div class="row justify-between">
      <div class="col-6">
        <div class="q-mt-md">
          <q-chip
            v-for="(skill, index) in selectedSkills"
            :key="index"
            removable
            @remove="removeSkill(skill)"
            class="q-mr-sm"
          >
            {{ skill.name }}
          </q-chip>
        </div>
      </div>
      <div class="col-5">
        <q-select
          v-model="selectedSkills"
          :options="filteredSkills"
          outlined
          dense
          multiple
          use-input
          hide-selected
          fill-input
          input-debounce="300"
          @filter="filterSkills"
          :label="t('Search Skill')"
          option-value="id"
          option-label="name"
          clearable
          behavior="menu"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-select>
      </div>
    </div> -->
  </DialogForm>
</template>

<script lang="ts" setup>
import { useQuasar, type QTableColumn } from 'quasar';
import MainHeader from 'src/components/PageHeader.vue';

import { useCurriculumStore } from 'src/stores/curriculum';
import { useGlobalStore } from 'src/stores/global';
import { onlyEnglish, onlyThai, requireField } from 'src/utils/field-rules';
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import DialogForm from 'src/components/DialogForm.vue';

const route = useRoute();
const code = route.params.id;
const dialogClo = ref<boolean>(false);
const { t } = useI18n();
const global = useGlobalStore();
const q = useQuasar();
const courseSpecStore = useCourseSpecStore();
const formCLO = ref<Clo>({} as Clo);
const subjectColumns: QTableColumn[] = [
  {
    name: 'number',
    label: 'No.',
    field: () => {},
    align: 'left',
    sortable: true,
  },
  {
    name: 'code',
    label: 'Code',
    field: (row) => row.subject?.code,
    align: 'left',
    sortable: true,
  },
  {
    name: 'thaiName',
    label: 'Name',
    field: (row) => row.subject?.thaiName,
    align: 'left',
  },
  {
    name: 'engName',
    label: 'English Name',
    field: (row) => row.subject?.engName,
    align: 'left',
  },
  {
    name: 'credit',
    label: 'Credit',
    field: (row) => row.subject?.credit,
    align: 'left',
  },
  {
    name: 'type',
    label: 'Type',
    field: (row) => row.subject?.type,
    align: 'left',
  },
  {
    name: 'actions',
    label: 'Actions',
    field: '',
    align: 'left',
  },
];
watchEffect(() => {
  console.log('Updated formSubject:', courseSpecStore.formSubject);
});
const formValid = computed(() => {
  return !!(
    courseSpecStore.formSubject &&
    courseSpecStore.formSubject &&
    courseSpecStore.formSubject
  );
});
onMounted(async () => {
  curr.fetchOne(String(code));
  courseSpecStore.fetchData();
});
import { useCourseSpecStore } from 'src/stores/couse-spec';
import type { CourseSpec } from 'src/types/course-spec';
import type { Clo } from 'src/types/clo';
import { OptionSubjectType } from 'src/data/subject_type';
import { useRoute, useRouter } from 'vue-router';
import type { Subject } from 'src/types/subject';
const curr = useCurriculumStore();
// watch(
//   () => courseSpecStore.formSubject.code,
//   (newVal) => {
//     if (courseSpecStore.formCourseSpec.subject) {
//       courseSpecStore.formCourseSpec.subject.code = newVal;
//     }
//   },
// );
// subject add into course spec
const handleAdd = (subject: Subject) => {
  // if no array course specs, create empty array (prevent error)
  if (!curr.form.courseSpecs) {
    curr.form.courseSpecs = [];
  }
  // create object
  const courseSpec = {
    subject,
    subjectCode: subject.code,
    curriculumId: curr.form.id,
  } as CourseSpec;
  // handle duplicate subject in course specs
  const existIndex = curr.form.courseSpecs.findIndex(
    (subject) =>
      subject.subjectCode === courseSpecStore.formCourseSpec.subjectCode,
  );
  // if exist, update
  if (existIndex !== -1) {
    curr.form.courseSpecs.splice(existIndex, 1, courseSpec);
  } else {
    // if not exist, push
    curr.form.courseSpecs.push(courseSpec);
  }
  // insert subject into course specs array
  // close dialog
  courseSpecStore.dialogState = false;
  courseSpecStore.formSubject = {} as Subject;
};
const handleOpenDialog = (item?: CourseSpec) => {
  if (item) {
    // Edit Mode: ใช้ค่าของ item ที่ถูกส่งเข้ามา
    courseSpecStore.titleForm = 'Edit Subject';
    courseSpecStore.formSubject = JSON.parse(JSON.stringify(item.subject));
  } else {
    // Add Mode: รีเซ็ตค่าให้เป็น object เปล่า
    courseSpecStore.titleForm = 'Edit Subject';
  }
  courseSpecStore.dialogState = true; // เปิด dialog
};

const handleRemove = (item: CourseSpec) => {
  if (!item.subject.code) {
    console.error('Cannot delete: subjectCode is undefined');
    return;
  }

  q.dialog({
    title: 'Confirm',
    message: 'Are you sure?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    curr.form.courseSpecs = curr.form.courseSpecs.filter(
      (c) => c.subject.code !== item.subject.code,
    );
    console.log('Deleted:', item.subject.code);
  });
};

// const filteredOptions = ref(store.getSubjects);
// const selectedSubject = ref('');

// const updateSubjectCode = (val) => {
//   if (val) {
//     courseSpecStore.formCourseSpec.subjectCode = val.id;
//     // ใช้ id ของ option ที่เลือก
//   } else {
//     courseSpecStore.formCourseSpec.subjectCode = ''; // ถ้าเป็น null ให้เคลียร์ค่า
//   }
//   console.log(
//     'Selected subjectCode:',
//     courseSpecStore.formCourseSpec.subjectCode,
//   );
// };

// const computedLabel = (option) => {
//   return `${option.id} - ${option.name}`;
// };

// const filterFn = (val, update) => {
//   if (val === '') {
//     update(() => {
//       filteredOptions.value = store.getSubjects;
//     });
//     return;
//   }

//   const needle = val.toLowerCase();
//   update(() => {
//     filteredOptions.value = store.getSubjects.filter((subject) =>
//       subject.thaiName.toLowerCase().includes(needle),
//     );
//   });
// };

// const openCloDialog = (clo: Clo) => {
//   formCLO.value = { ...clo };
//   courseSpecStore.dialogState = false;
//   dialogClo.value = true;
// };

const saveClo = () => {
  dialogClo.value = false;
  if (!formCLO.value) return;
  if (!courseSpecStore.formCourseSpec.clos)
    courseSpecStore.formCourseSpec.clos = [];
  courseSpecStore.formCourseSpec.clos.push(formCLO.value);
};
const router = useRouter();
const handleClo = (row) => {
  router
    .push(`/curriculums/${curr.form.code}/subjects/${row.subject.code}/clos`)
    .then(() => {
      console.log('Navigation succeeded');
    })
    .catch((error) => {
      console.log('Navigation error:', error);
    });
};
</script>
