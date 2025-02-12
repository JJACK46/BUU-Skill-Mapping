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
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>
            {{ props.rowIndex + 1 }}
          </q-td>
          <q-td key="code" :props="props">
            {{ props.row.code }}
          </q-td>
          <q-td key="name" :props="props" width="400px">
            {{ props.row.thaiName }}
          </q-td>
          <q-td key="degree" :props="props">
            {{ props.row.thaiDegree }}
          </q-td>
          <q-td key="period" :props="props">
            {{ props.row.period }} &nbsp; ปี
          </q-td>
          <q-td key="branch" :props="props">
            {{ props.row.branch?.name }}
          </q-td>
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
        </q-tr>
      </template>
    </q-table>
    <!-- Dialog -->
    <DialogForm
      v-model="store.dialogState"
      :title="t('newCurriculum')"
      :cta-text="'createCurriculum'"
      @save="store.handleCreateOne()"
      width="50%"
    >
      <div class="row q-gutter-y-md">
        <FieldChecker
          v-model="store.form.code"
          :func-update="store.checkUpdateCode"
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
            :rules="[requireField, onlyThai]"
            class="col"
          />
          <q-input
            dense
            outlined
            v-model="store.form.engName"
            :label="t('engName') + ' *'"
            :rules="[requireField, onlyEnglish]"
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
            :rules="[requireField, onlyAlphabet]"
            class="col"
          />
          <q-select
            dense
            outlined
            v-model="store.form.engDegree"
            :options="OptionEducationLevelEN"
            :label="t('engDegree') + ' *'"
            :rules="[requireField, onlyAlphabet]"
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
          v-model.number="store.form.minimumGrade"
          :label="t('minimumGrade') + ' *'"
          :rules="[requireField, ruleGradeFormat]"
          class="col-2 q-mr-md"
        />
        <q-select
          dense
          outlined
          v-model="store.form.branch"
          :options="branches"
          :label="t('branches') + ' *'"
          option-label="name"
          :rules="[requireField]"
          @vue:mounted="fetchBranches"
          class="col"
        ></q-select>
        <q-input
          dense
          type="textarea"
          outlined
          v-model="store.form.thaiDescription"
          :label="t('description') + ' *'"
          :rules="[requireField]"
          class="col-12"
          counter
          maxlength="500"
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
          maxlength="500"
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
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGlobalStore } from 'src/stores/global';
import DialogForm from 'src/components/DialogForm.vue';
import {
  onlyAlphabet,
  onlyEnglish,
  onlyThai,
  requireField,
  ruleGradeFormat,
} from 'src/utils/field-rules';
import { useI18n } from 'vue-i18n';
import { BranchService } from 'src/services/branches';
import type { Branch } from 'src/types/branch';
import type { Curriculum } from 'src/types/curriculum';
import {
  OptionEducationLevelEN,
  OptionEducationLevelTH,
} from 'src/data/education_level';
import FieldChecker from 'src/components/FieldChecker.vue';
const global = useGlobalStore();
const route = useRoute();
const router = useRouter();
const title = computed(() => route.matched[1].name as string);
const store = useCurriculumStore();
const columns = ref<QTableColumn[]>([
  { name: 'no', label: 'No.', field: 'no', align: 'left' },
  { name: 'code', label: 'Code', field: 'code', align: 'left' },
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'degree', label: 'Degree', field: 'thaiDegree', align: 'left' },
  { name: 'period', label: 'Period', field: 'period', align: 'left' },
  { name: 'branch', label: 'Branch', field: 'branch', align: 'left' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'left' },
]);
const { t } = useI18n();
const branches = ref<Branch[]>([]);

function fetchBranches() {
  BranchService.getAll().then((res) => {
    branches.value = res.data;
  });
}

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
        store.form.engDegree = OptionEducationLevelEN[indexTH];
      }
    } else if (newEngDegree !== oldEngDegree) {
      const indexEN = OptionEducationLevelEN.indexOf(newEngDegree);
      if (indexEN !== -1) {
        store.form.thaiDegree = OptionEducationLevelTH[indexEN];
      }
    }
  },
  { deep: true },
);

const handleEditBtn = (row: Curriculum) => {
  router.push(`/curriculums/${row.code}`);
};

useMeta({
  title: title.value,
});
</script>
