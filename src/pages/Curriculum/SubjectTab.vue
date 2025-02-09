<template>
  <div class="text-h4 text-primary">
    {{ t('subjects') }}
  </div>

  <MainHeader
    v-model:search-text="store.search"
    v-model:filter-model="store.filterModel"
    @open-dialog="store.handleOpenDialog"
    hide-filter
  />

  <!-- <q-select
    dense
    outlined
    v-model="store.form.subjects"
    :options="subjects"
    :label="t('subjects') + ' *'"
    use-chips
    option-label="name"
    multiple
    :rules="[requireField]"
  ></q-select>
  <q-card
    v-for="(subject, index) in store.form.subjects"
    :key="index"
    class="q-mb-md shadow-3 rounded-card relative"
  >
    <q-card-section>
      <div class="row items-center">
        <div>
          <div class="text-h6 text-primary font-bold">
            {{ subject.name }}
          </div>
          <div class="text-subtitle2 text-grey-6">
            {{ t('credit : ') }}{{ subject.credit || 'No credit provided' }}
          </div>
        </div>

        <q-col class="q-ml-auto">
          <q-card-actions align="right">
            <q-btn
              align="right"
              flat
              color="negative"
              icon="close"
              @click="deleteSubject(index)"
              class="q-py-sm"
            /> </q-card-actions
        ></q-col>
      </div>
    </q-card-section>

    <q-card-section>
      <q-separator class="q-mb-md" />
      <div class="text-body1 q-pb-sm">
        <div class="text-subtitle2 text-grey-6 row items-center q-gutter-sm">
          <div v-for="(item, idx) in subject.skillExpectedLevels" :key="idx">
            <q-chip clickable color="primary" text-color="white">
              {{ item.skill?.name || 'No skill provided' }}
            </q-chip>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card> -->
  <!-- Add & Edit Dialog -->

  <DialogForm
    v-model="store.dialogState"
    :title="store.getDialogTitle"
    v-model:form-valid="formValid"
    ref="formRef"
    @save="handleSave"
  >
    <q-select
      filled
      outlined
      dense
      v-model="store.form.id"
      @update:model-value="(val) => (store.form.id = val?.id ?? null)"
      use-input
      hide-selected
      label="Search ID"
      :options="filteredOptions"
      option-value="id"
      :option-label="computedLabel"
      @filter="filterFn"
      :popup-offset="[0, 5]"
    />
    <q-input
      v-model="store.form.id"
      outlined
      dense
      label="ID *"
      mask="########"
      :rules="[requireField]"
    />
    <q-select
      v-model="store.form.type"
      outlined
      dense
      label="Type *"
      :options="Object.values(SubjectType)"
      :rules="[requireField]"
    />
    <q-input
      v-model="store.form.name"
      outlined
      dense
      label="Name *"
      :rules="[requireField, onlyThai]"
    />
    <q-input
      v-model="store.form.engName"
      outlined
      dense
      label="Eng Name *"
      :rules="[requireField, onlyEnglish]"
    />
    <q-input
      v-model="store.form.description"
      outlined
      dense
      type="textarea"
      label="Description *"
      :rules="[requireField]"
    />
    <q-input
      v-model="store.form.credit"
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
    :rows="curr.form.subjects || store.getSubjectsByCu"
    row-key="id"
    :pagination="store.pagination"
    :loading="global.getLoadingState"
    :columns="subjectColumns"
    @update:pagination="store.fetchSubjectsByCurriculum(store.curriculumId)"
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
import type { Subject } from 'src/types/subject';
import { useRouter } from 'vue-router';

// const subjects = ref<Subject[]>();
const store = useSubjectStore();
const curriculumStore = useCurriculumStore();
const { t } = useI18n();
const global = useGlobalStore();
const curr = useCurriculumStore();
const q = useQuasar();
const formRef = ref();
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
    name: 'name',
    label: 'Name',
    field: 'name',
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
    store.form.id &&
    store.form.type &&
    store.form.name &&
    store.form.engName &&
    store.form.description &&
    store.form.credit
  );
});
onMounted(async () => {
  await store.fetchData();
  await curriculumStore.fetchData();
  await curriculumStore.fetchSubjectsData();
  const curriculumId = curriculumStore.getInsertId;
  console.log(curriculumId);
  store.curriculumId = curriculumId;
  // await store.fetchSubjectsByCurriculum(curriculumId);
  console.log(store.getSubjectsByCu);

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

watchEffect(() => {
  console.log('Updated curriculumId:', curriculumStore.getInsertId);
  store.curriculumId = curriculumStore.getInsertId;
});
const handleSave = () => {
  if (!curr.form.subjects) {
    curr.form.subjects = [];
  }
  const existingSubjectIndex = curr.form.subjects.findIndex(
    (subject) => subject.id === store.form.id,
  );
  console.log(existingSubjectIndex);
  if (existingSubjectIndex !== -1) {
    curr.form.subjects[existingSubjectIndex] = store.form as Subject;
  } else {
    curr.form.subjects.push(store.form as Subject);
  }

  store.dialogState = false;
};
const handleOpenDialog = (item: Subject) => {
  store.form = JSON.parse(JSON.stringify(item));
  store.dialogState = true;
};
const handleRemove = (item: Subject) => {
  q.dialog({
    title: 'Confirm',
    message: 'Are you sure?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    curr.form.subjects = curr.form.subjects.filter((c) => c.id !== item.id);
  });
};
const filteredOptions = ref(store.getSubjects);

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
const computedLabel = computed(() => {
  return (option: any) => `${option.id} - ${option.name}`;
});
const router = useRouter();
const handleClo = (row) => {
  console.log(
    'Navigating to:',
    `/curriculums/${store.curriculumId}/subjects/${1}/clos`,
  );
  router
    .push(`/curriculums/${store.curriculumId}/subjects/${row.id}/clos`)
    .then(() => {
      console.log('Navigation succeeded');
    })
    .catch((error) => {
      console.log('Navigation error:', error);
    });
};
</script>
