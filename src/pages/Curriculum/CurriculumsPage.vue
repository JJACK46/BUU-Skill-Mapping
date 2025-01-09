<template>
  <q-page padding>
    <MainHeader
      v-model:search-text="store.search"
      v-model:filter-model="store.filterModel"
      @open-dialog="handleAddBtn"
      @enter-search="store.fetchData"
    />
    <q-table
      flat
      bordered
      :loading="global.getLoadingState"
      class="q-mt-md q-animate--fade"
      :rows="store.getCurriculums"
      :pagination="store.pagination"
      :columns="columns"
      row-key="id"
      wrap-cells
      separator="cell"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="degree" :props="props">
            {{ props.row.degree }}
          </q-td>
          <q-td key="period" :props="props">
            {{ props.row.period }} &nbsp; ปี
          </q-td>
          <q-td key="branch" :props="props">
            {{ props.row.branch.name }}
          </q-td>
          <ContextMenu
            :edit-fn="() => store.handleOpenDialog(props.row)"
            :delete-fn="() => store.removeCurriculum(props.row.id)"
          ></ContextMenu>
          <ContextMenu
            :edit-fn="() => store.handleOpenDialog(props.row)"
            :delete-fn="() => store.removeCurriculum(props.row.id)"
          ></ContextMenu>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts" setup>
import type { QTableColumn } from 'quasar';
import { useMeta } from 'quasar';
import MainHeader from 'src/components/PageHeader.vue';
import { CurriculumService } from 'src/services/curriculums';
import { SubjectService } from 'src/services/subject';
import { useCurriculumStore } from 'src/stores/curriculum';
import type { Curriculum } from 'src/types/curriculum';
import type { Subject } from 'src/types/subject';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGlobalStore } from 'src/stores/global';
import ContextMenu from 'src/components/ContextMenu.vue';
const global = useGlobalStore();
const route = useRoute();
const router = useRouter();
const title = computed(() => route.matched[1].name as string);
const store = useCurriculumStore();
const curriculums = ref<Curriculum[]>();
const subjects = ref<Subject[]>();
const columns = ref<QTableColumn[]>([
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'degree', label: 'Degree', field: 'degree', align: 'left' },
  { name: 'period', label: 'Period', field: 'period', align: 'left' },
  { name: 'branch', label: 'Branch', field: 'branch', align: 'left' },
]);

onMounted(async () => {
  await store.fetchData();
});

const handleAddBtn = () => {
  router.push({ name: 'New Curriculum' });
  store.resetForm();
};

useMeta({
  title: title.value,
});
onMounted(async () => {
  curriculums.value = (await CurriculumService.getAll({ page: 1 })).data;
  subjects.value = (await SubjectService.getAll()).data;
});
</script>
