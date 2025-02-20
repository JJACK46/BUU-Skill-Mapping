<template>
  <q-page padding>
    <div class="text-h4 text-weight-medium">
      {{ t('hello') }} {{ user.payload?.user.email }} 👋
    </div>
    <q-space class="q-my-md" />
    <section name="courses">
      <div class="text-h6 q-mb-lg text-center text-weight-medium">
        🚀 Quick start
      </div>
      <div class="row q-gutter-lg full-width justify-center">
        <RouterLink
          v-for="card in homeCards"
          :key="card.headText"
          :to="card.goTo"
        >
          <CustomCard
            :head-text="card.headText"
            :sub-text="card.subText"
            hide-options
          />
        </RouterLink>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
/*
    imports
*/

import CustomCard from 'src/components/CustomCard.vue';
import { useAuthStore } from 'src/stores/auth';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
/*
    states
*/

const user = useAuthStore();
const { t } = useI18n();
type HomeCard = {
  headText: string;
  subText: string;
  goTo: string;
};
// for dev
// const role = computed(() => 'administer');
const homeCards = ref<HomeCard[]>([
  {
    headText: 'Curriculums',
    subText: 'Go to curriculums page to get started',
    goTo: `curriculums`,
  },
  {
    headText: 'Instructors',
    subText: 'Go to instructor page to get started',
    goTo: `instructors`,
  },
  {
    headText: 'Courses',
    subText: 'Go to courses page to get started',
    goTo: `courses`,
  },
]);
/*
    methods
*/

defineOptions({
  name: 'DashboardPage',
});
</script>
