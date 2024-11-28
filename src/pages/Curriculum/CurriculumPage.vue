<template>
  <q-page padding>
    <MainHeader :search-text="search" @open-dialog="handleAdd" />
    <q-separator class="q-my-md" />
    <section class="q-mt-md q-gutter-y-lg">
      <q-card
        class="q-pa-md q-animate--fade"
        v-for="(c, index) in curriculums"
        bordered
        flat
        :key="c.id"
      >
        <q-card-section>
          <div class="row justify-between">
            <span class="text-h6">
              {{ c.name }}
              <p class="text-caption">{{ c.engName }}</p>
            </span>
            <q-btn
              icon="edit"
              flat
              padding="none"
              @click="store.toggleDialogForm(c)"
            />
          </div>
          <div>{{ c.description }}</div>
          <div>{{ c.degree }}</div>
          <div>{{ c.engDegree }}</div>
          <div>Period: {{ c.period }} Years</div>
          <div>Minimum Grade: {{ c.minimumGrade }}</div>
          <div>{{ c.coordinators }}</div>
        </q-card-section>
        <q-card-section class="text-body1 q-pa-none">
          <q-expansion-item
            label="List of subjects"
            @click="handleSubjects(index)"
          >
            <q-table
              :rows="c.subjects || []"
              wrap-cells
              grid
              flat
              bordered
              row-key="id"
              :rows-per-page-options="[0]"
              hide-bottom
            >
            </q-table>
          </q-expansion-item>
        </q-card-section>
      </q-card>
      <q-card flat bordered v-show="!curriculums || curriculums.length === 0">
        <q-card-section class="text-body2 text-center">
          No Data
        </q-card-section>
      </q-card>
    </section>

    <q-table
      :rows="store.getCurriculums"
      :columns="columns"
      row-key="id"
      flat
      :filter="search"
      bordered
      class="q-mt-md q-animate--fade"
      wrap-cells
      separator="cell"
    >
    </q-table>
  </q-page>
</template>

<script lang="ts" setup>
import { QTableColumn, useMeta } from 'quasar';
import MainHeader from 'src/components/Header/main-header.vue';
import { CurriculumService } from 'src/services/curriculums';
import { SubjectService } from 'src/services/subject';
import { useCurriculumStore } from 'src/stores/curriculum';
import { Curriculum } from 'src/types/curriculum';
import { Subject } from 'src/types/subject';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const search = ref();
const route = useRoute();
const router = useRouter();
const title = computed(() => route.matched[1].name as string);
const store = useCurriculumStore();
const curriculums = ref<Curriculum[]>();
const subjects = ref<Subject[]>();
const columns = ref<QTableColumn[]>([
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'thaiName', label: 'Thai Name', field: 'thaiName', align: 'left' },
  { name: 'engName', label: 'Eng Name', field: 'engName', align: 'left' },
  { name: 'period', label: 'Period', field: 'period', align: 'left' },
  {
    name: 'branch',
    label: 'Branch',
    field: (row) => row.branch.name,
    align: 'left',
  },
  {
    name: 'actions',
    label: 'Actions',
    field: () => null,
    align: 'left',
    sortable: false,
  },
]);

const handleAdd = () => {
  router.push({ name: 'New Curriculum' });
};
const handleSubjects = (index: number) => {
  if (!curriculums.value) return;
  if (
    curriculums.value[index].subjects?.length === 0 ||
    !curriculums.value[index].subjects
  ) {
    SubjectService.getAll().then((res) => {
      curriculums.value![index].subjects = res.data;
    });
  }
};

useMeta({
  title: title.value,
});
onMounted(async () => {
  curriculums.value = (await CurriculumService.getAll({ page: 1 })).data;
  subjects.value = (await SubjectService.getAll()).data;
});
</script>
