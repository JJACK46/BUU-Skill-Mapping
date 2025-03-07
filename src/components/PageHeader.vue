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
      <FilterBtn
        v-show="!hideFilter"
        v-model="filterModel"
        @confirm-filter="$emit('enterSearch')"
      />
      <q-input
        outlined
        clearable
        v-model="searchText"
        @keyup.enter="$emit('enterSearch')"
        :label="labelSearch ?? t('search')"
        class="col"
        bg-color="white"
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
        :label="computedLabelAdd"
        style="min-width: 80px"
        unelevated
      >
      </q-btn>
    </div>
  </div>
  <div
    v-show="Object.keys(filterModel ?? {}).length > 0"
    class="q-animate--fade q-mt-sm"
  >
    <span>{{ t('filter') }}: </span>
    <q-chip
      v-show="filterModel?.facultyName"
      :label="filterModel?.facultyName"
      removable
      @remove="delete filterModel!.facultyName"
    />
    <q-chip
      v-show="filterModel?.branchName"
      :label="filterModel?.branchName"
      removable
      @remove="delete filterModel!.branchName"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import FilterBtn from './FilterButton.vue';
import type { FilterModel } from 'src/types/filter';

const { t } = useI18n();

const props = defineProps<{
  importBtn?: true;
  exportBtn?: true;
  labelSearch?: string;
  hideFilter?: true;
  labelAdd?: string;
}>();

const emit = defineEmits<{
  (e: 'openDialog'): void;
  (e: 'enterSearch'): void;
  (e: 'openDialogImport'): void;
  (e: 'openDialogExport'): void;
}>();

const searchText = defineModel('searchText', { default: '' });
const filterModel = defineModel<Partial<FilterModel>>('filterModel', {
  default: {} as FilterModel,
});

const computedLabelAdd = computed(() => props.labelAdd || t('add'));

// auto fetch data again after search empty
watch(
  () => searchText.value,
  (v) => {
    if (!v || v.length === 0) {
      emit('enterSearch');
    }
  },
);

watch(
  () => filterModel.value,
  (v) => {
    if (Object.keys(v ?? {}).length === 0 || !v) {
      emit('enterSearch');
    }
  },
  { deep: true },
);
</script>
