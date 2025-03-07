<template>
  <q-page padding>
    <div v-if="!$route.params.id">
      <MainHeader
        v-model:searchText="filterCourse"
        @open-dialog="handleOpenDialog"
      />
      <section v-if="store.courses">
        <div id="available">
          <div class="text-primary q-mb-md text-weight-bold text-h5">
            Available Course
          </div>
          <div class="text-weight-medium q-mb-md">2025 / 2</div>
          <div class="q-gutter-lg q-mb-md row">
            <div
              v-for="(course, index) in store.courses"
              :key="index"
              class="cursor-pointer"
            >
              <CustomCard
                :head-text="course.subject.thaiName || ''"
                :sub-text="course.subject.engName || ''"
                @click="handleViewCourse(course.id)"
              >
              </CustomCard>
            </div>
          </div>
        </div>
        <q-separator class="q-my-lg" />
        q
        <div id="archive">
          <div class="text-grey-6 q-mb-md text-weight-bold text-h5">
            Archived Course
          </div>
          <div class="text-weight-medium q-mb-md">2025 / 2</div>
          <div class="q-gutter-lg q-mb-md row">
            <div
              v-for="(course, index) in store.courses"
              :key="index"
              class="cursor-pointer"
            >
              <CustomCard
                :head-text="course.subject.thaiName || ''"
                :sub-text="course.subject.engName || ''"
                @click="handleViewCourse(course.id)"
              >
              </CustomCard>
            </div>
          </div>
        </div>
      </section>
      <section
        class="q-mt-lg"
        v-if="!store.courses || store.courses.length === 0"
      >
        <div>class="text-body2 text-center"</div>
      </section>
    </div>
    <!-- Course ID page -->
    <router-view />
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
