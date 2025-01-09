<template>
  <q-btn icon="filter_list" flat :label="t('filter')" color="primary" dense>
    <q-popup-proxy v-model="proxyModel" style="width: 400px">
      <q-tabs v-model="filterMenu">
        <q-tab name="faculty" :label="t('faculty')" />
        <q-tab name="branch" :label="t('branch')" />
      </q-tabs>
      <q-tab-panels v-model="filterMenu" animated>
        <q-tab-panel name="faculty">
          <q-select
            :model-value="filterModel.facultyName"
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
            :model-value="filterModel.branchName"
            label="Select Branch"
            filled
            fill-input
            use-input
            hide-selected
            input-debounce="0"
            @filter="filterBranch"
            @input-value="setModelBranch"
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
          </q-select>
        </q-tab-panel>
      </q-tab-panels>
      <div class="q-mx-auto q-pa-sm flex justify-end q-gutter-x-sm">
        <q-btn
          :label="t('clear')"
          flat
          color="negative"
          @click="handleCloseMenu()"
        ></q-btn>
        <q-btn
          :label="t('search')"
          flat
          color="primary"
          @click="handleConfirm()"
        ></q-btn>
      </div>
    </q-popup-proxy>
  </q-btn>
</template>

<script lang="ts" setup>
import { api } from 'src/boot/axios';
import type { Faculty } from 'src/types/faculty';
import type { FilterModel } from 'src/types/filter';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const faculties = ref<Faculty[]>();
const { t } = useI18n();
const proxyModel = ref<boolean>(false);
const filterMenu = ref();
const strFacultyOptions = ref<string[]>([]);
const strBranchOptions = ref<string[]>([]);
const facultyOptions = ref(strFacultyOptions.value);
const branchOptions = ref(strBranchOptions.value);
const initOptions = async () => {
  const { data } = await api.get<Faculty[]>('/faculties/filters');
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

onMounted(() => initOptions());

const emit = defineEmits<{
  (e: 'confirmFilter'): void;
}>();

const handleChangeFaculty = (val: string) => {
  const index = faculties.value?.findIndex((f) => f.name === val);
  if (index && index > -1) {
    strBranchOptions.value =
      faculties.value?.[index].branches?.map((b) => b.name || '') || [];
  } else {
    strBranchOptions.value = [];
  }
};

function filterFaculty(
  val: string,
  callback: (updateFn: () => void) => void,
  // abort: () => void
): void {
  callback(() => {
    const needle = val.toLowerCase();
    facultyOptions.value = strFacultyOptions.value.filter(
      (v) => v?.toLowerCase().indexOf(needle) > -1,
    );
  });
}

function setModelFaculty(val: string) {
  filterModel.value.facultyName = val;
}

function setModelBranch(val: string) {
  filterModel.value.branchName = val;
}
function filterBranch(
  val: string,
  callback: (updateFn: () => void) => void,
  // abort: () => void
): void {
  callback(() => {
    const needle = val.toLowerCase();
    branchOptions.value = strBranchOptions.value.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1,
    );
  });
}

const filterModel = defineModel<Partial<FilterModel>>({
  default: {} as FilterModel,
});

const handleCloseMenu = () => {
  proxyModel.value = false;
  filterModel.value = {} as FilterModel;
};

const handleConfirm = () => {
  proxyModel.value = false;
  emit('confirmFilter');
};
</script>
