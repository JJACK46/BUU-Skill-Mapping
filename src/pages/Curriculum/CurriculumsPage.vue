<template>
  <q-page padding>
    <MainHeader
      v-model:search-text="store.search"
      v-model:filter-model="store.filterModel"
      @open-dialog="store.toggleDialogForm()"
      @enter-search="store.fetchAll"
    />
    <q-table
      flat
      bordered
      :loading="global.getLoadingState"
      class="q-mt-md q-animate--fade"
      :rows="store.getCurriculums"
      :pagination="store.pagination"
      :columns="columns"
      row-key="code"
      wrap-cells
      separator="cell"
    >
      <template #body-cell-number="props">
        <q-td>
          {{ props.rowIndex + 1 }}
        </q-td>
      </template>
      <template #body-cell-actions="props">
        <q-td>
          <q-btn
            flat
            dense
            round
            color="grey-8"
            icon="edit"
            @click="handleEditBtn(props.row)" />
          <q-btn
            flat
            dense
            round
            color="grey-8"
            icon="delete"
            @click="store.handleDelete(props.row.id)"
        /></q-td>
      </template>
    </q-table>
    <!-- Dialog -->
    <DialogForm
      v-model="store.dialogState"
      :title="t('newCurriculum')"
      :cta-text="'createCurriculum'"
      @save="store.handleCreateOne()"
      :json="store.form"
      width="50%"
    >
      <div class="row q-gutter-y-md">
        <FieldChecker
          :label="t('curriculumCode')"
          v-model="store.form.code"
          :func-update="(s) => store.checkUpdateCode(String(s))"
          :found-hint="store.getCurriculumCodeLabel"
          :is-found="store.foundExistCurriculum"
          mask="##############"
          :rules="[
            (val) => val.length == 14 || 'Field not correct format (14 digits)',
          ]"
        />
        <div class="row col-12">
          <q-input
            dense
            outlined
            v-model="store.form.thaiName"
            :label="t('name') + ' *'"
            class="col"
          />
          <q-input
            dense
            outlined
            v-model="store.form.engName"
            :label="t('engName') + ' *'"
            :rules="[requireField]"
            class="col q-ml-md"
          />
        </div>
        <div class="row col-12">
          <q-select
            dense
            outlined
            :options="OptionEducationLevelTH"
            v-model="store.form.thaiDegree"
            :label="t('degree') + ' *'"
            :rules="[requireField]"
            class="col"
          />
          <q-select
            dense
            outlined
            v-model="store.form.engDegree"
            :options="OptionEducationLevelEN"
            :label="t('engDegree') + ' *'"
            :rules="[requireField]"
            class="col q-ml-md"
          />
        </div>
        <q-input
          dense
          outlined
          v-model.number="store.form.period"
          :label="t('period') + ' *'"
          mask="#"
          :rules="[requireField]"
          class="col-2 q-mr-md"
        >
        </q-input>
        <q-input
          dense
          outlined
          mask="#.##"
          v-model="store.form.minimumGrade"
          :label="t('minimumGrade') + ' *'"
          :rules="[requireField, ruleGradeFormat]"
          class="col-2 q-mr-md"
        />
        <div class="col">
          <FieldBranchOptions v-model="store.form.branchId" />
        </div>
        <q-input
          dense
          type="textarea"
          outlined
          v-model="store.form.thaiDescription"
          :label="t('description') + ' *'"
          :rules="[requireField]"
          class="col-12"
          counter
          maxlength="1000"
        />
        <q-input
          dense
          type="textarea"
          outlined
          v-model="store.form.engDescription"
          :label="t('englishDescription') + ' *'"
          :rules="[requireField]"
          class="col-12"
          counter
          maxlength="1000"
        >
        </q-input>
      </div>
    </DialogForm>
  </q-page>
</template>

<script lang="ts" setup>
import type { QTableColumn } from 'quasar';
import { useMeta } from 'quasar';
import MainHeader from 'src/components/PageHeader.vue';
import { useCurriculumStore } from 'src/stores/curriculum';
import { computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGlobalStore } from 'src/stores/global';
import DialogForm from 'src/components/DialogForm.vue';
import { requireField, ruleGradeFormat } from 'src/utils/field-rules';
import { useI18n } from 'vue-i18n';
import type { Branch } from 'src/types/branch';
import type { Curriculum } from 'src/types/curriculum';
import {
  OptionEducationLevelEN,
  OptionEducationLevelTH,
} from 'src/data/education_level';
import FieldChecker from 'src/components/FieldChecker.vue';
import FieldBranchOptions from 'src/components/FieldBranchOptions.vue';

const { t } = useI18n();
const global = useGlobalStore();
const route = useRoute();
const router = useRouter();
const title = computed(() => route.matched[1]?.name as string);
const store = useCurriculumStore();
const columns = computed(
  () =>
    <QTableColumn[]>[
      { name: 'number', label: t('no.'), field: 'no', align: 'left' },
      {
        name: 'code',
        label: t('curriculumCode'),
        field: 'code',
        align: 'left',
      },
      { name: 'name', label: t('name'), field: 'thaiName', align: 'left' },
      { name: 'engName', label: t('engName'), field: 'engName', align: 'left' },
      {
        name: 'degree',
        label: t('degree'),
        field: 'thaiDegree',
        align: 'left',
      },
      {
        name: 'branch',
        label: t('branch'),
        field: (b: Branch) => b.thaiName,
        align: 'left',
      },
      { name: 'actions', label: t('actions'), field: 'actions', align: 'left' },
    ],
);

onMounted(async () => {
  await store.fetchAll();
});

watch(
  () => [store.form.thaiDegree, store.form.engDegree],
  ([newThaiDegree, newEngDegree], [oldThaiDegree, oldEngDegree]) => {
    // Avoid infinite loops by checking if the value has actually changed
    if (newThaiDegree !== oldThaiDegree) {
      const indexTH = OptionEducationLevelTH.indexOf(newThaiDegree);
      if (indexTH !== -1) {
        store.form.engDegree = OptionEducationLevelEN[indexTH]!;
      }
    } else if (newEngDegree !== oldEngDegree) {
      const indexEN = OptionEducationLevelEN.indexOf(newEngDegree);
      if (indexEN !== -1) {
        store.form.thaiDegree = OptionEducationLevelTH[indexEN]!;
      }
    }
  },
  { deep: true },
);

const handleEditBtn = async (row: Curriculum) => {
  await router.push(`/curriculums/${row.code}`);
};

useMeta({
  title: title.value,
});
</script>
