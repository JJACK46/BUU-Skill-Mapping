<template>
  <q-page padding>
    <MainHeader
      v-model:searchText="filterCourse"
      @open-dialog="handleOpenDialog"
    />
    <q-separator class="q-my-md" />
    <section class="q-gutter-lg row">
      <div v-for="course in store.courses" :key="course.id">
        <CustomCard
          :head-text="course.name"
          :sub-text="course.subject?.engName"
          @click="handleViewCourse"
        >
          <template #btn-options>
            <q-item
              clickable
              onmouseenter="this.style.color='red'"
              onmouseleave="this.style.color=''"
              @click="handleDelete(course.id)"
              v-close-popup
            >
              <q-item-section side>
                <q-icon size="16px" name="delete" />
              </q-item-section>
              <q-item-section> {{ t('delete') }}</q-item-section>
            </q-item>
          </template>
        </CustomCard>
      </div>
    </section>
    <q-card
      class="q-mt-lg"
      flat
      bordered
      v-show="!store.courses || store.courses.length === 0"
    >
      <q-card-section class="text-body2 text-center"> No Data </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
/*
    imports
*/
import { useMeta, useQuasar } from 'quasar';
import CustomCard from 'src/components/CustomCard.vue';
import { useCourseStore } from 'src/stores/course';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MainHeader from 'src/components/PageHeader.vue';
import { useI18n } from 'vue-i18n';
/*
    states
*/
const { t } = useI18n();
const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const filterCourse = ref('');
const store = useCourseStore();
const title = computed(() => route.matched[1].name as string);

const handleViewCourse = (id: string) => {
  if (id) {
    router.push({ name: 'Course Detail', params: { id } });
  }
};

const handleOpenDialog = async () => {
  store.dialogState = true;
};

const handleDelete = (id: string) => {
  $q.dialog({
    title: 'Confirm Deletion',
    message: 'Are you sure you want to delete this course?',
    cancel: true,
    persistent: true,
  }).onOk(() => store.removeOne(id));
};
/*
    methods
*/

onMounted(store.fetchData);

useMeta({
  title: title.value,
});
</script>
