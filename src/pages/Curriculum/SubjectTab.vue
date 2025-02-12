<template>
  <div class="text-h4 text-primary">
    {{ t('subjects') }}
  </div>
  <div class="justify-end flex q-mt-sm">
    <q-btn
      color="primary"
      unelevated
      style="width: 100px"
      :label="t('add')"
      @click="store.handleOpenDialog()"
    ></q-btn>
  </div>
  <!-- Add & Edit Dialog Subject -->
  <DialogForm
    v-model="store.dialogState"
    :title="store.titleForm"
    ref="formRef"
    width="60%"
    @save="
      store.handleSave({
        form: store.form,
      })
    "
  >
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
        v-model="store.form.subject.code"
        outlined
        dense
        label="Code *"
        mask="########"
        :rules="[(val) => !!val || 'Required']"
      />
      <q-select
        style="min-width: 200px"
        class="col"
        v-model="store.form.type"
        outlined
        dense
        label="Type *"
        :options="OptionSubjectType"
        :rules="[requireField]"
      >
      </q-select>
      <q-input
        v-model="store.form.credit"
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
          v-model="store.form.thaiName"
          outlined
          dense
          label="Thai Name *"
          :rules="[requireField, onlyThai]"
        />
        <q-input
          class="col"
          style="min-width: 200px"
          v-model="store.form.engName"
          outlined
          dense
          label="Eng Name *"
          :rules="[requireField, onlyEnglish]"
        />
      </div>

      <q-input
        class="col-12"
        v-model="store.form.thaiDescription"
        outlined
        dense
        type="textarea"
        label="Description *"
        :rules="[requireField]"
      />
      <q-input
        class="col-12"
        v-model="store.form.engDescription"
        outlined
        dense
        type="textarea"
        label="English Description *"
        :rules="[requireField]"
      />
    </div>
  </DialogForm>
  <!--Table-->
  <q-table
    flat
    bordered
    class="q-animate--fade q-mt-md"
    separator="cell"
    :rows="store.getListSubjects"
    row-key="code"
    :loading="global.getLoadingState"
    :columns="store.subjectColumns"
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
          @click="
            store.handleOpenDialog({
              form: props.row,
              rowIndex: props.rowIndex,
            })
          "
        ></q-btn>
        <q-btn
          icon="delete"
          padding="none"
          color="grey-8"
          flat
          @click="store.handleRemove(props.row.id)"
        ></q-btn>
      </q-td>
    </template>
  </q-table>
  <!-- CLOs Dialog -->
  <q-dialog v-model="dialogCloTable" maximized>
    <CloDialog
      v-model="dialogCloTable"
      :curr-id="curr.form.id"
      :subject="curr.form.courseSpecs[store.rowIndex].subject"
    />
  </q-dialog>
  <!-- CLOs Form -->
</template>

<script lang="ts" setup>
import { useGlobalStore } from 'src/stores/global';
import { onlyEnglish, onlyThai, requireField } from 'src/utils/field-rules';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import DialogForm from 'src/components/DialogForm.vue';
import { OptionSubjectType } from 'src/data/subject_type';
import CloDialog from './CloDialog.vue';
import { useCurriculumStore } from 'src/stores/curriculum';
import { useCourseSpecStore } from 'src/stores/course-spec';

const curr = useCurriculumStore();
const dialogCloTable = ref<boolean>(false);
const { t } = useI18n();
const global = useGlobalStore();
const store = useCourseSpecStore();
const handleOpenCloDialogTable = (indexCS: number) => {
  store.rowIndex = indexCS;
  dialogCloTable.value = true;
};
</script>
