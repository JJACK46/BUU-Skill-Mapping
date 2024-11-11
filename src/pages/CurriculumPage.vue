<template>
  <q-page padding>
    <PageHeader :search-text="search" @open-dialog="dialogState = true" />
    <q-separator class="q-my-md" />
    <section class="q-mt-md q-gutter-y-lg">
      <q-card class="q-pa-md" v-for="(c, index) in curriculums" bordered flat :key="c.id">
        <q-card-section>
          <div class="row justify-between">
            <span class="text-h6">
              {{ c.thaiName }}
              <p class="text-caption">{{ c.engName }}</p>
            </span>
            <q-btn icon="edit" flat padding="none" />
          </div>
          <div>{{ c.description }}</div>
        </q-card-section>
        <q-card-section class="text-body1 q-pa-none">
          <q-expansion-item label="List of subjects" @click="handleSubjects(index)">
            <q-table :rows="c.subjects || []" wrap-cells grid flat bordered row-key="id" :rows-per-page-options="[0]"
              hide-bottom>
            </q-table>
          </q-expansion-item>
        </q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<script lang="ts" setup>
import { useMeta } from 'quasar';
import PageHeader from 'src/components/PageHeader.vue';
import { CurriculumService } from 'src/services/curriculums';
import { SubjectService } from 'src/services/subject';
import { Curriculum } from 'src/types/curriculum';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const dialogState = ref(false);
const search = ref();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);

const curriculums = ref<Curriculum[]>();

const handleSubjects = (index: number) => {
  if (!curriculums.value) return;
  if (
    curriculums.value[index].subjects?.length === 0 ||
    !curriculums.value[index].subjects
  ) {
    SubjectService.getAll().then((res) => {
      curriculums.value![index].subjects = res;
    });
  }
};

useMeta({
  title: title.value,
});
onMounted(async () => {
  curriculums.value = await CurriculumService.getAll();
});
</script>
