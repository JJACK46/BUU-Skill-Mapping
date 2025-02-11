<template>
  <div class="text-h4 text-primary">
    {{ t('subjects') }}
  </div>

  <!-- <MainHeader
    v-model:search-text="courseSpecStore.search"
    v-model:filter-model="courseSpecStore.filterModel"
    @open-dialog="courseSpecStore.handleOpenDialog"
    hide-filter
  /> -->
  <div class="justify-end flex q-mt-sm">
    <q-btn
      color="primary"
      unelevated
      :label="t('add')"
      @click="handleOpenDialog(null, -1)"
    ></q-btn>
  </div>
  <!-- Add & Edit Dialog Subject -->
  <DialogForm
    v-model="dialogCS"
    :title="titleForm"
    ref="formRef"
    width="60%"
    @save="handleAdd(formCourseSpec.subject, rowIndexCS)"
  >
    <div class="row q-gutter-x-sm">
      <div class="row q-gutter-sm">
        <!-- <q-select
          filled
          outlined
          dense
          v-model="formCourseSpec.subject"
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
          v-model="formCourseSpec.subject.code"
          outlined
          dense
          label="Code *"
          mask="########"
          :rules="[(val) => !!val || 'Required']"
        />
        <q-select
          style="min-width: 200px"
          class="col"
          v-model="formCourseSpec.subject.type"
          outlined
          dense
          label="Type *"
          :options="OptionSubjectType"
          :rules="[requireField]"
        >
        </q-select>
        <q-input
          v-model="formCourseSpec.subject.credit"
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
            v-model="formCourseSpec.subject.thaiName"
            outlined
            dense
            label="Thai Name *"
            :rules="[requireField, onlyThai]"
          />
          <q-input
            class="col"
            style="min-width: 200px"
            v-model="formCourseSpec.subject.engName"
            outlined
            dense
            label="Eng Name *"
            :rules="[requireField, onlyEnglish]"
          />
        </div>

        <q-input
          class="col-12"
          v-model="formCourseSpec.subject.thaiDescription"
          outlined
          dense
          type="textarea"
          label="Description *"
          :rules="[requireField]"
        />
        <q-input
          class="col-12"
          v-model="formCourseSpec.subject.engDescription"
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
    class="q-animate--fade q-mt-md"
    separator="cell"
    :rows="curr.form.courseSpecs || []"
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
          label="CLOs"
          padding="none"
          color="blue"
          unelevated
          style="width: 50px"
          @click="handleOpenCloDialogTable(props.rowIndex)"
        ></q-btn>
        <q-btn
          icon="edit"
          padding="none"
          flat
          color="grey-8"
          @click="handleOpenDialog(props.row, props.rowIndex)"
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
  <!-- CLOs Dialog -->
  <q-dialog v-model="dialogCloTable">
    <q-card style="min-width: 1000px; min-height: 500px">
      <!-- CLOs Table -->
      <q-table
        id="clo-table"
        :rows="computedListCLO"
        :columns="cloColumns"
        row-key="name"
        hide-pagination
        bordered
        separator="cell"
        class="q-pa-md"
      >
        <template #top-left>
          <div class="text-h6">CLOs</div>
        </template>
        <template #top-right>
          <q-btn
            :label="t('add')"
            unelevated
            color="primary"
            @click="handleOpenCloDialogForm()"
          ></q-btn>
        </template>
      </q-table>
      <!-- CLOs Form -->
    </q-card>
  </q-dialog>
  <DialogForm
    v-model="dialogCloForm"
    @save="
      saveClo({
        rowIndexCS: rowIndexCS,
        rowIndexCLO: rowIndexCLO,
        formCLO: formCLO,
      })
    "
    title="CLOs"
    ref="formRefCLO"
  >
    <!-- Main Clo -->
    <div class="row">
      <div class="col-6 q-mr-md">
        <q-input v-model="formCLO.name" outlined dense :label="t('name')" />
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
        <q-select v-model="formCLO.plos" outlined dense label="PLOs" />
      </div>
    </div>
  </DialogForm>
</template>

<script lang="ts" setup>
import { useQuasar, type QTableColumn } from 'quasar';
import { useCurriculumStore } from 'src/stores/curriculum';
import { useGlobalStore } from 'src/stores/global';
import { onlyEnglish, onlyThai, requireField } from 'src/utils/field-rules';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import DialogForm from 'src/components/DialogForm.vue';
import type { CourseSpec } from 'src/types/course-spec';
import type { Clo } from 'src/types/clo';
import { OptionSubjectType } from 'src/data/subject_type';
import type { Subject } from 'src/types/subject';

const dialogCloTable = ref<boolean>(false);
const dialogCloForm = ref<boolean>(false);
const { t } = useI18n();
const global = useGlobalStore();
const q = useQuasar();
const dialogCS = ref(false);
const formCourseSpec = ref<CourseSpec>({} as CourseSpec);
const formCLO = ref<Clo>({} as Clo);
const rowIndexCS = ref(-1);
const rowIndexCLO = ref(-1);
const curr = useCurriculumStore();
const titleForm = ref('');
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
const cloColumns: QTableColumn[] = [
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left',
  },
  {
    name: 'expectedLevel',
    label: 'Expected Level',
    field: 'expectedLevel',
    align: 'left',
  },
  {
    name: 'description',
    label: 'Description',
    field: 'description',
    align: 'left',
  },
];

const computedListCLO = computed(() => {
  if (rowIndexCS.value > -1) {
    return curr.form.courseSpecs[rowIndexCS.value].clos;
  }
  return [];
});

// subject add into course spec
const handleAdd = (subject: Subject, rowIndex: number) => {
  // pre-object
  const cs = {
    subject,
    curriculumId: curr.form.id,
    clos: [],
  } as CourseSpec;
  // if exist, update
  if (rowIndex !== -1) {
    curr.form.courseSpecs[rowIndex] = cs;
  } else {
    // if not exist, push
    curr.form.courseSpecs = curr.form.courseSpecs || [];
    curr.form.courseSpecs.push(cs);
  }
  // close dialog
  dialogCS.value = false;
};
const handleOpenDialog = (subject: Subject, rowIndex: number) => {
  if (subject) {
    titleForm.value = 'Edit Subject';
    formCourseSpec.value = {
      subject: JSON.parse(JSON.stringify(subject)),
      curriculumId: curr.form.id,
    };
    rowIndexCS.value = rowIndex;
  } else {
    titleForm.value = 'New Subject';
    formCourseSpec.value = {} as CourseSpec;
  }
  dialogCS.value = true;
};
const handleRemove = (item: Subject) => {
  q.dialog({
    title: 'Confirm',
    message: 'Are you sure?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    curr.form.courseSpecs = curr.form.courseSpecs.filter(
      (c) => c.subject.code !== item.code,
    );
    console.log('Deleted:', item.code);
  });
};
const handleOpenCloDialogForm = () => {
  dialogCloForm.value = true;
};
const handleOpenCloDialogTable = (rowIndex: number) => {
  // ensure they must have array
  curr.form.courseSpecs.forEach((cs) => {
    cs.clos = cs.clos || [];
  });

  rowIndexCS.value = rowIndex;
  dialogCloTable.value = true;
};

function saveClo({
  rowIndexCS,
  rowIndexCLO,
  formCLO,
}: {
  rowIndexCS: number;
  rowIndexCLO?: number;
  formCLO: Clo;
}) {
  dialogCloForm.value = false;

  const courseSpec = curr.form.courseSpecs[rowIndexCS];

  // Initialize clos array if it doesn't exist
  if (!courseSpec.clos) {
    courseSpec.clos = [];
  }

  // Update or add the formCLO
  if (rowIndexCLO === undefined || rowIndexCLO === -1) {
    // Add new CLO
    courseSpec.clos.push(formCLO);
  } else {
    // Update existing CLO
    courseSpec.clos[rowIndexCLO] = formCLO;
  }
}
</script>
