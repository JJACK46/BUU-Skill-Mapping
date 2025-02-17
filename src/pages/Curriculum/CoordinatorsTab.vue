<template>
  <div class="text-h4 text-primary">{{ t('coordinatorsManagement') }}</div>
  <MainHeader
    v-model:search-text="store.search"
    @open-dialog="store.toggleDialog"
    hide-filter
  />

  <!-- Main Table -->
  <q-table
    flat
    bordered
    :pagination="store.pagination"
    class="q-animate--fade q-mt-lg"
    separator="cell"
    :rows="store.getInstructors"
    row-key="thaiName"
    :loading="global.getLoadingState"
    :columns="columns"
    :filter="store.search"
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
          icon="delete"
          class="q-ml-sm"
          @click="
            store.removeAssignedInstructor({
              curriculumId: curr.getInsertId,
              instructorId: props.row.id,
            })
          "
        />
      </q-td>
    </template>
  </q-table>
  <!-- Dialog Assign Instructor -->
  <q-dialog v-model="store.dialogState">
    <q-card class="q-pa-lg" style="min-width: 60%">
      <div class="text-h5 text-weight-medium q-py-md text-primary">
        Instructors from current branch
      </div>
      <q-separator class="full-width bg-primary q-mb-md" style="height: 2px" />
      <q-table
        flat
        bordered
        row-key="thaiName"
        separator="cell"
        :rows="store.getAvailableInstructors"
        :columns
        :pagination
        @update:pagination="store.fetchAvailableInstructors"
      >
        <template #body-cell-number="props">
          <q-td>
            {{ props.rowIndex + 1 }}
          </q-td>
        </template>
        <template #body-cell-actions="props">
          <q-td>
            <q-btn
              size="md"
              unelevated
              class="q-mr-sm"
              color="primary"
              icon="add"
              :label="t('assign')"
              @click="
                store.assignInstructor({
                  curriculumId: curr.getInsertId,
                  instructorId: props.row.id,
                })
              "
            ></q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
/*
    imports
*/
import type { QTable, QTableColumn } from 'quasar';
import { useMeta } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useInstructorStore } from 'src/stores/instructor';
import { useGlobalStore } from 'src/stores/global';
import MainHeader from 'src/components/PageHeader.vue';
import { useI18n } from 'vue-i18n';
import { useCurriculumStore } from 'src/stores/curriculum';
/*
    states
*/
const pagination = ref<QTable['pagination']>();
const { t } = useI18n();
const global = useGlobalStore();
const store = useInstructorStore();
const route = useRoute();
const curr = useCurriculumStore();
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
    field: (c) => c.code || 'Unknown',
    align: 'left',
    sortable: true,
  },
  {
    name: 'position',
    label: 'Position',
    field: (c) => c.position || 'Unknown',
    align: 'left',
  },
  {
    name: 'name',
    label: 'Name',
    field: 'thaiName',
    align: 'left',
  },
  {
    name: 'engName',
    label: 'English Name',
    field: 'engName',
    align: 'left',
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    align: 'left',
    sortable: true,
  },
  {
    name: 'actions',
    label: 'Actions',
    field: () => {},
    align: 'left',
  },
];
/*
    methods
*/
onMounted(async () => {
  await store.fetchRowsInCurr();
});
useMeta({
  title: title.value,
});
</script>
