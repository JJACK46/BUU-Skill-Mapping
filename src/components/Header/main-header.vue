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
        v-model:selected-branch="selectedBranch"
        v-model:selected-faculty="selectedFaculty"
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
        :label="t('add')"
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
    <span>{{ t('filter') }}: </span>
    <q-chip
      v-show="selectedFaculty"
      :label="selectedFaculty"
      removable
      @remove="selectedFaculty = ''"
    />
    <q-chip
      v-show="selectedBranch"
      :label="selectedBranch"
      removable
      @remove="selectedBranch = ''"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import FilterBtn from './filter-btn.vue';

const { t } = useI18n();
const selectedFaculty = ref<string>('');
const selectedBranch = ref<string>('');

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
