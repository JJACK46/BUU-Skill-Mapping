<template>
  <q-page padding>
    <div class="text-h4">{{ t('hello') }} {{ user.profile?.email }}</div>
    <q-separator class="q-my-md" />
    <section name="courses">
      <div class="text-h6 q-mb-md">
        <q-icon name="push_pin"></q-icon> {{ t('courses') }}
      </div>
      <div class="row q-gutter-lg">
        <CourseCard v-for="index in 3" :key="index" :course="{} as Course" />
      </div>
    </section>
    <q-separator class="q-my-md" />
    <section name="skills">
      <div class="text-h6 q-mb-md">Skill Collections</div>
      <div class="row q-gutter-lg">
        <q-chip v-for="index in 14" :key="index" bordered flat>
          <q-card-section> skill {{ index }} </q-card-section>
        </q-chip>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import CourseCard from 'src/components/CourseCard.vue';
import { useAuthStore } from 'src/stores/auth';
import type { Course } from 'src/types/course';
import { useI18n } from 'vue-i18n';

const user = useAuthStore();
const { t } = useI18n();

defineOptions({
  name: 'IndexPage',
});
</script>
