<template>
  <q-page padding>
    <MainHeader
      v-model:search-text="store.search"
      @open-dialog="store.handleCreate"
    />
    <q-separator class="q-my-md" />
    <q-table
      flat
      bordered
      :pagination="store.pagination"
      class="q-animate--fade"
      separator="cell"
      :rows="store.getInstructors"
      row-key="id"
      :loading="global.getLoadingState"
      :columns="columns"
      :filter="store.search"
      @update:pagination="store.fetchAll"
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
            @click="store.handleEdit(props.row)"
          />
          <q-btn
            flat
            dense
            round
            color="grey-8"
            icon="delete"
            class="q-ml-sm"
            @click="store.handleDelete(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
    <DialogForm
      :title="store.getTitleForm"
      v-model="store.dialogState"
      @save="store.handleSave()"
      width="50%"
      :cta-text="'createInstructor'"
      :json="store.form"
    >
      <div class="row q-gutter-y-md">
        <q-input
          outlined
          dense
          v-model="store.form.code"
          label="Code"
          clearable
          mask="########"
          class="col-12"
          :rules="[requireField, ruleCodeFormat]"
        />

        <q-input
          outlined
          dense
          v-model="store.form.email"
          label="Email"
          type="email"
          clearable
          class="col-12"
          :rules="[requireField]"
        />

        <q-input
          outlined
          v-model="store.form.thaiName"
          label="Thai Name"
          clearable
          class="col-12"
          :rules="[requireField]"
          dense
        />
        <q-input
          outlined
          dense
          v-model="store.form.engName"
          label="English Name"
          class="col-12"
          :rules="[requireField]"
          clearable
        />
        <q-select
          outlined
          dense
          v-model="store.form.position"
          :options="[...Object.values(AcademicRank)]"
          label="Position"
          class="col-12"
          :rules="[requireField]"
          options-dense
        />
        <q-select
          outlined
          dense
          v-model="store.form.branchId"
          :options="branches"
          option-label="name"
          :option-value="optionBranchValue"
          map-options
          emit-value
          label="Branch"
          class="col-12"
          options-dense
          @vue:mounted="fetchBranches"
          :rules="[requireField]"
        />
        <q-select
          outlined
          dense
          v-model="store.form.specialists"
          label="Specialists"
          options-dense
          class="col-12"
          :options="['IT Expert']"
          clearable
          :rules="[requireField]"
          multiple
        />
        <q-input
          outlined
          dense
          v-model="store.form.tel"
          label="Telephone"
          clearable
          class="col-12"
          mask="###-###-####"
          unmasked-value
          :rules="[requireField]"
        />
        <q-input
          outlined
          dense
          v-model="store.form.officeRoom"
          label="Office Room"
          class="col-12"
          :rules="[requireField]"
          clearable
        />
        <q-input
          outlined
          dense
          v-model="store.form.bio"
          label="Bio"
          class="col-12"
          type="textarea"
          hint="optional"
          counter
          maxlength="500"
        />
      </div>
    </DialogForm>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { QTableColumn } from 'quasar';
import { useMeta } from 'quasar';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useInstructorStore } from 'src/stores/instructor';
import DialogForm from 'src/components/DialogForm.vue';
import { requireField, ruleCodeFormat } from 'src/utils/field-rules';
import type { Branch } from 'src/types/branch';
import { AcademicRank } from 'src/data/academic_rank';
import { useGlobalStore } from 'src/stores/global';
import { BranchService } from 'src/services/branches';
import MainHeader from 'src/components/PageHeader.vue';

const global = useGlobalStore();
const branches = ref<Branch[]>([]);
const store = useInstructorStore();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const columns: QTableColumn[] = [
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
    field: 'code',
    align: 'left',
    sortable: true,
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    align: 'left',
    sortable: true,
  },
  {
    name: 'name',
    label: 'Name',
    field: 'thaiName',
    align: 'left',
  },
  {
    name: 'engName',
    label: 'EngName',
    field: 'engName',
    align: 'left',
  },
  {
    name: 'tel',
    label: 'Tel',
    field: 'tel',
    align: 'left',
  },
  {
    name: 'position',
    label: 'Position',
    field: (c) => c.position || 'Unknown',
    align: 'left',
  },
  {
    name: 'actions',
    label: 'Actions',
    field: () => {},
    align: 'left',
  },
];
function fetchBranches() {
  BranchService.getAll().then((res) => {
    branches.value = res.data;
  });
}

const optionBranchValue = (v: Branch) => v.id;

useMeta({
  title: title.value,
});
</script>
