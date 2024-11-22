<template>
  <div class="row justify-between">
    <div class="row q-gutter-sm">
      <q-btn
        v-if="importBtn"
        label="import"
        icon="upload"
        outline
        color="primary"
        @click="$emit('openDialogImport')"
      />
      <q-btn
        v-if="exportBtn"
        label="export"
        icon="cloud_download"
        outline
        @click="$emit('openDialogExport')"
      />
    </div>
    <div class="row q-gutter-sm">
      <q-btn
        v-show="!hideFilter"
        icon="filter_list"
        flat
        label="Filter"
        color="primary"
        dense
        @click="filterDialog = !filterDialog"
      >
        <q-popup-edit
          v-model="filterDialog"
          :cover="false"
          :offset="[0, 10]"
          style="width: 400px"
          @vue:mounted="initOptions"
        >
          <q-tabs v-model="filterMenu">
            <q-tab name="faculty" label="Faculty" />
            <q-tab name="branch" label="Branch" />
          </q-tabs>
          <q-tab-panels v-model="filterMenu" animated>
            <q-tab-panel name="faculty">
              <q-select
                v-model="selectedFaculty"
                label="Select Faculty"
                filled
                fill-input
                option-label="name"
                :options="facultyOptions"
                @update:model-value="handleChangeFaculty"
              >
              </q-select>
            </q-tab-panel>
            <q-tab-panel name="branch">
              <q-select
                v-model="selectedBranch"
                label="Select Branch"
                filled
                fill-input
                option-label="name"
                :options="branchOptions"
              >
              </q-select
            ></q-tab-panel>
          </q-tab-panels>
        </q-popup-edit>
      </q-btn>

      <q-input
        outlined
        clearable
        v-model="searchText"
        @keyup.enter="$emit('enterSearch')"
        :label="labelSearch ?? 'Search'"
        class="col"
        dense
        debounce="500"
        style="width: 300px"
      >
        <template #prepend>
          <q-icon name="search"></q-icon>
        </template>
      </q-input>
      <q-btn
        @click="$emit('openDialog')"
        color="primary"
        label="add"
        style="width: 80px"
        unelevated
      >
      </q-btn>
    </div>
  </div>
  <div
    v-show="selectedBranch || selectedFaculty"
    class="q-animate--fade q-mt-sm"
  >
    <span>Filter: </span>
    <q-chip
      v-if="selectedFaculty"
      :label="selectedFaculty.name"
      removable
      @remove="selectedFaculty = null"
    />
    <q-chip
      v-if="selectedBranch"
      :label="selectedBranch.name"
      removable
      @remove="selectedBranch = null"
    />
  </div>
</template>

<script lang="ts" setup>
import { api } from 'src/boot/axios';
import { Branch } from 'src/types/branch';
import { Faculty } from 'src/types/faculty';
import { ref } from 'vue';

const filterDialog = ref(false);
const filterMenu = ref();
const facultyOptions = ref<Partial<Faculty>[]>([]);
const branchOptions = ref<Partial<Branch>[]>([]);

const selectedFaculty = ref();
const selectedBranch = ref();

const initOptions = async () => {
  const res = await api.get('/faculties'); //filters/1, filters/2
  if (res.data) {
    facultyOptions.value = res.data;
  }
};
const handleChangeFaculty = (v: Faculty) => {
  branchOptions.value = v.branches || [];
};

defineProps<{
  importBtn?: true;
  exportBtn?: true;
  labelSearch?: string;
  hideFilter?: true;
}>();

defineEmits<{
  (e: 'openDialog'): void;
  (e: 'enterSearch'): void;
  (e: 'openDialogImport'): void;
  (e: 'openDialogExport'): void;
}>();

const searchText = defineModel('searchText', { default: '' });
</script>
