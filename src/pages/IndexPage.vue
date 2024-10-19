<template>
  <q-page class="" padding>
    <div class="text-h4">Welcome {{ user.profile?.email }}</div>
    <q-separator class="q-my-md" />
    <section name="pinCourses">
      <div class="text-h6 q-pb-sm">Pin Course:</div>
      <div class="row q-gutter-lg">
        <CourseCard v-for="index in 3" :key="index" :course="({} as Course)" />
      </div>
    </section>
    <q-separator class="q-my-lg" />
    <section name="news">
      <div class="text-h6 q-pb-sm">Skill Collections:</div>
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
import { useUserStore } from 'src/stores/user';
import { Course } from 'src/types/course';

const user = useUserStore();

defineOptions({
  name: 'IndexPage',
});
</script>
