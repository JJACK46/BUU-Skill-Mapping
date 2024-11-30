<template>
  <q-page padding>
    <MainHeader
      v-model:searchText="filterCourse"
      @open-dialog="handleOpenDialog"
    />
    <DialogForm
      title="New Course *"
      v-model="store.dialogState"
      @save="store.createOne"
    >
      <template #body>
        <q-input
          outlined
          label="Course ID *"
          v-model="store.form.id"
          autofocus
          mask="########"
          :rules="[requireField]"
        />
        <q-input
          outlined
          label="Name *"
          v-model="store.form.name"
          :rules="[requireField]"
        />

        <q-select
          outlined
          label="Subject *"
          v-model="store.form.subject"
          :options="subjects"
          option-label="engName"
          options-dense
          :rules="[requireField]"
        >
        </q-select>
        <q-select
          outlined
          label="Teachers *"
          v-model="store.form.teachers"
          :options="teachers"
          multiple
          :option-label="(item) => `${item.position ?? ''} ${item.name}`"
          options-dense
          :rules="[requireField]"
        />
        <q-input
          v-model="store.form.description"
          label="Course Description *"
          autogrow
          outlined
          :rules="[requireField]"
        />
      </template>
    </DialogForm>
    <q-separator class="q-my-md" />
    <section class="q-gutter-lg row">
      <CourseCard
        v-for="course in store.courses"
        :key="course.id"
        :course="course"
        @handle-delete="handlePopup(course.id!)"
        @handle-view="handleViewCourse(course.id!)"
      />
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
import { useMeta, useQuasar } from 'quasar';
import CourseCard from 'src/components/CourseCard.vue';
import DialogForm from 'src/components/DialogForm.vue';
import { SubjectService } from 'src/services/subject';
import { InstructorService } from 'src/services/instructor';
import { useCourseStore } from 'src/stores/course';
import { Subject } from 'src/types/subject';
import { Instructor } from 'src/types/instructor';
import { requireField } from 'src/utils/field-rules';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MainHeader from 'src/components/Header/main-header.vue';

const $q = useQuasar();
const route = useRoute();
const subjects = ref<Subject[]>([]);
// const curriculums = ref<Curriculum[]>([]);
const router = useRouter();
const filterCourse = ref('');
const teachers = ref<Instructor[]>([]);
const store = useCourseStore();

const handleViewCourse = (id: string) => {
  if (id) {
    router.push({ name: 'Course Detail', params: { id } });
  }
};

const handleOpenDialog = async () => {
  store.dialogState = true;
  subjects.value = await SubjectService.getAll();
  teachers.value = await TeacherService.getAll();
  const response = await CurriculumService.getAll();
  curriculums.value = response.data;
};

const handlePopup = (id: string) => {
  $q.dialog({
    title: 'Confirm Deletion',
    message: 'Are you sure you want to delete this course?',
    cancel: true,
    persistent: true,
  }).onOk(() => store.removeOne(id));
};

onMounted(store.fetchData);

const title = computed(() => route.matched[1].name as string);
useMeta({
  title: title.value,
});
</script>
