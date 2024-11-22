<template>
  <q-btn
    icon="filter_list"
    flat
    :label="t('filter')"
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
        <q-tab name="faculty" :label="t('faculty')" />
        <q-tab name="branch" :label="t('branch')" />
      </q-tabs>
      <q-tab-panels v-model="filterMenu" animated>
        <q-tab-panel name="faculty">
          <q-select
            :model-value="selectedFaculty"
            label="Select Faculty"
            filled
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            @filter="filterFaculty"
            @input-value="setModelFaculty"
            :options="facultyOptions"
            hint="Type to search"
            @update:model-value="handleChangeFaculty"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  {{ t('noFaculty') }}
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-tab-panel>
        <q-tab-panel name="branch">
          <q-select
            :model-value="selectedBranch"
            label="Select Branch"
            filled
            fill-input
            use-input
            hide-selected
            input-debounce="0"
            @filter="filterBranch"
            :options="branchOptions"
            hint="Type to search"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  {{ t('noBranch') }}
                </q-item-section>
              </q-item>
            </template>
            <template #after></template>
          </q-select>
        </q-tab-panel>
      </q-tab-panels>
    </q-popup-edit>
  </q-btn>
</template>

<script lang="ts" setup>
import { api } from 'src/boot/axios';
import { Faculty } from 'src/types/faculty';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const faculties = ref<Faculty[]>();
const { t } = useI18n();
const filterDialog = ref<boolean>();
const filterMenu = ref();
const strFacultyOptions = ref<string[]>([]);
const strBranchOptions = ref<string[]>([]);
const facultyOptions = ref(strFacultyOptions.value);
const branchOptions = ref(strBranchOptions.value);
const initOptions = async () => {
  const { data } = await api.get<Faculty[]>('/faculties');
  if (data) {
    faculties.value = data;
    // convert data to string[] for options
    strFacultyOptions.value = data.map((f) => f.name);
    strBranchOptions.value = data
      .map((b) => b.branches)
      .flat()
      .map((b) => b?.name || '');
  }
};
const handleChangeFaculty = (val: string) => {
  const index = faculties.value?.findIndex((f) => f.name === val);
  if (index && index > -1) {
    branchOptions.value =
      faculties.value?.[index].branches?.map((b) => b.name || '') || [];
  }
};

function filterFaculty(
  val: string,
  callback: (updateFn: () => void) => void
  // abort: () => void
): void {
  callback(() => {
    const needle = val.toLowerCase();
    facultyOptions.value = strFacultyOptions.value.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
}

function setModelFaculty(val: string) {
  selectedFaculty.value = val;
}
function filterBranch(
  val: string,
  callback: (updateFn: () => void) => void
  // abort: () => void
): void {
  callback(() => {
    const needle = val.toLowerCase();
    branchOptions.value = strBranchOptions.value.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
}

// function setModelBranch(val: string) {
//   selectedBranch.value = val;
// }

// defineProps<{
//   selectedFaculty: string;
//   selectedBranch: string;
// }>();

const selectedFaculty = defineModel('selectedFaculty', { default: '' });
const selectedBranch = defineModel('selectedBranch', { default: '' });
</script>
