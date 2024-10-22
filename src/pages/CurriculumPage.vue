<template>
  <q-page padding>
    <PageHeader :search-text="search" @open-dialog="dialogState = true" />
    <q-separator class="q-my-md" />
    <section class="q-mt-md q-gutter-y-lg">
      <q-card class="q-pa-md" v-for="(c, index) in curriculums" :key="c.id">
        <div class="row justify-between">
          <span class="text-h6">
            {{ c.thaiName }}
            <p class="text-caption">{{ c.engName }}</p>
          </span>
          <q-btn icon="edit" flat padding="none" class="q-mr-md" />
        </div>
        <div>{{ c.description }}</div>
        <q-card-section class="text-body1 q-pa-none">
          <q-expansion-item
            label="List of subjects"
            @click="handleSubjects(index)"
          >
            <q-list>
              <q-item v-for="s in c.subjects" :key="s.id">
                <q-item-label>
                  <span
                    >{{ s }}
                    <p class="text-caption">{{ s }}</p>
                  </span></q-item-label
                >
              </q-item>
            </q-list>
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
