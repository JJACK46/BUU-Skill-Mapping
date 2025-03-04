<template>
  <q-page padding>
    <div v-if="!$route.params.id">
      <MainHeader
        v-model:searchText="filterCourse"
        @open-dialog="handleOpenDialog"
      />
      <q-separator class="q-my-md" />
      <section class="q-gutter-lg row">
        <div v-for="(course, index) in store.courses" :key="index" class="cursor-pointer" >
          <CustomCard
            :head-text="course.subject.thaiName || ''"
            :sub-text="course.subject.engName || ''"
            @click="handleViewCourse(course.id)"
          >
          </CustomCard>
        </div>
      </section>
      <q-card
        class="q-mt-lg"
        flat
        bordered
        v-if="!store.courses || store.courses.length === 0"
      >
        <q-card-section class="text-body2 text-center"> No Data </q-card-section>
      </q-card>
    </div>
    <!-- Course ID page -->
    <router-view/>
  </q-page>
</template>

<script lang="ts" setup>
/*
    imports
*/
import { useMeta } from 'quasar';
import CustomCard from 'src/components/CustomCard.vue';
import { useCourseStore } from 'src/stores/course';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MainHeader from 'src/components/PageHeader.vue';
/*
    states
*/
const route = useRoute();
const router = useRouter();
const filterCourse = ref('');
const store = useCourseStore();
const title = computed(() => route.matched[1]?.name as string);

const handleViewCourse = async (id: number) => {
  if (id) {
    await router.push(`/courses/${id}`);
  }
};

const handleOpenDialog = () => {
  store.dialogState = true;
};

/*
    methods
*/

onMounted(() => {
  store.fetchData();
});

useMeta({
  title: title.value,
});
</script>
