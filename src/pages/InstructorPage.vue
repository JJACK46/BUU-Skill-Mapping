<template>
  <q-page padding>
    <MainHeader
      v-model:search-text="store.search"
      @open-dialog="store.toggleDialog"
    />
    <q-separator class="q-my-md" />
    <q-table
      flat
      bordered
      :pagination="store.pagination"
      class="q-animate--fade"
      separator="cell"
      :rows="store.teachers"
      row-key="id"
      :loading="global.getLoadingState"
      :columns="columns"
      :filter="store.search"
      @update:pagination="store.fetchData"
    >
    </q-table>
    <DialogForm
      title="New Instructor"
      v-model="store.dialogState"
      @save="store.handleSave"
    >
      <template #body>
        <q-select
          outlined
          dense
          v-model="store.form.branch"
          :options="branches"
          option-label="name"
          label="Branch *"
          options-dense
          :rules="[requireField]"
          @vue:mounted="fetchBranches"
        >
        </q-select>
        <q-input
          outlined
          dense
          v-model="store.form.email"
          label="Email *"
          type="email"
          clearable
          :rules="[requireField]"
        />
        <q-input
          outlined
          v-model="store.form.name"
          label="Name *"
          clearable
          dense
          :rules="[requireField]"
        />
        <q-input
          outlined
          dense
          v-model="store.form.engName"
          label="English Name *"
          clearable
          :rules="[requireField]"
        />
        <q-select
          outlined
          dense
          v-model="store.form.position"
          :options="[...Object.values(AcademicRank)]"
          label="Position *"
          options-dense
          :rules="[requireField]"
        />
        <q-select
          outlined
          dense
          v-model="store.form.specialists"
          :options="[
            'Machine Learning',
            'Deep Learning',
            'Software Engineering',
          ]"
          label="Specialists"
          hint="Optional"
          options-dense
          clearable
          multiple
        />
        <q-input
          outlined
          dense
          v-model="store.form.tel"
          label="Telephone *"
          clearable
          :rules="[(val) => val.length == 10 || 'Field not correct format']"
          mask="###-###-####"
          unmasked-value
        />
        <q-input
          outlined
          dense
          v-model="store.form.officeRoom"
          label="Office Room *"
          :rules="[requireField]"
          clearable
        />
        <q-input
          outlined
          dense
          v-model="store.form.bio"
          label="Bio"
          hint="Optional"
          type="textarea"
        />
      </template>
    </DialogForm>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { QTableColumn, useMeta } from 'quasar';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTeacherStore } from 'src/stores/instructor';
import DialogForm from 'src/components/DialogForm.vue';
import { requireField } from 'src/utils/field-rules';
import { Branch } from 'src/types/branch';
import { AcademicRank } from 'src/types/position.enum';
import { useGlobalStore } from 'src/stores/global';
import { BranchService } from 'src/services/branches';
import MainHeader from 'src/components/Header/main-header.vue';

const global = useGlobalStore();
const branches = ref<Branch[]>([]);
const store = useTeacherStore();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const columns: QTableColumn[] = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'center',
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
    field: 'name',
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
];
function fetchBranches() {
  BranchService.getAll().then((res) => {
    branches.value = res.data;
  });
}

useMeta({
  title: title.value,
});
</script>
