<template>
  <q-page padding>
    <PageHeader
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
  </q-page>
</template>

<script lang="ts" setup>
import { useMeta, useQuasar } from 'quasar';
import CourseCard from 'src/components/CourseCard.vue';
import DialogForm from 'src/components/DialogForm.vue';
import PageHeader from 'src/components/PageHeader.vue';
import { SubjectService } from 'src/services/subject';
import { InstructorService } from 'src/services/instructor';
import { useCourseStore } from 'src/stores/course';
import { Subject } from 'src/types/subject';
import { Instructor } from 'src/types/instructor';
import { requireField } from 'src/utils/field-rules';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const $q = useQuasar();
const route = useRoute();
const subjects = ref<Subject[]>([]);
// const curriculums = ref<Curriculum[]>([]);
const router = useRouter();
const filterCourse = ref('');
const teachers = ref<Instructor[]>([]);
const store = useCourseStore();

const handleViewCourse = (id: number) => {
  if (id) {
    router.push({ name: 'Course Detail', params: { id } });
  }
};

const handleOpenDialog = async () => {
  store.dialogState = true;
  subjects.value = (await SubjectService.getAll()).data;
  teachers.value = (await InstructorService.getAll()).data;
  // curriculums.value = wait for implement
};

const handlePopup = (id: number) => {
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
