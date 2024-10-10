<template>
  <q-page padding>
    <PageHeader :search-text="search" @open-dialog="dialogState = true" />
    <q-separator class="q-my-md" />
    <section class="q-mt-md q-gutter-y-lg">
      <q-card class="q-pa-md" v-for="c in curriculums" :key="c.id">
        <div class="row justify-between">
          <span class="text-h6">
            {{ c.thaiName }}
            <p class="text-caption">{{ c.engName }}</p>
          </span>
          <q-btn icon="edit" flat></q-btn>
        </div>
        <div>{{ c.description }}</div>
        <q-card-section class="text-body1">
          <q-expansion-item label="List of subjects">
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
import { Curriculum } from 'src/types/curriculum';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const dialogState = ref(false);
const search = ref();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
useMeta({
  title: title.value,
});

const curriculums = ref<Curriculum[]>();

onMounted(async () => {
  curriculums.value = await CurriculumService.fetchAll();
});
</script>
