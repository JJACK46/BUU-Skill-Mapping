<template>
  <q-page padding>
    <PageHeader
      v-model:searchText="filterCourse"
      @open-dialog="handleOpenDialog"
    />
    {{ filterCourse }}

    <DialogForm title="New Course" v-model="dialogStateAdd" @save="handleSave">
      <template #body>
        <q-select
          outlined
          label="Subject"
          v-model="formCourse.subject"
          :options="subjects"
          option-label="engName"
          options-dense
          autofocus
          :rules="[requireField]"
        >
        </q-select>
        <q-select
          outlined
          label="Teachers"
          v-model="formCourse.teachers"
          :options="teachers"
          multiple
          option-label="name"
          options-dense
          :rules="[requireField]"
        />
        <q-input
          v-model="formCourse.description"
          label="Course Description"
          autogrow
          outlined
        />
      </template>
    </DialogForm>
    <q-separator class="q-my-md" />
    <section class="q-gutter-lg row">
      <q-linear-progress v-if="isLoading" indeterminate />
      <q-card
        class="col-grow col-md-auto"
        v-for="data in mockCourse"
        :key="data.id"
        style="width: 300px; max-height: 400px"
      >
        <q-card-section>
          <div class="row justify-between">
            <span class="text-h6"
              >{{ data.subject?.name ?? data.subject?.engName }}
            </span>
            <q-btn icon="more_vert" flat padding="none" />
          </div>
          <div style="text-indent: 1rem" class="q-py-sm text-body2">
            {{ data.subject?.description }}
          </div>
        </q-card-section>
        <q-card-actions class="text-body1 q-pa-md" align="between">
          <div :class="`text-${data.active ? 'primary' : 'negative'}`">
            {{ data.active ? 'Active' : 'Inactive' }}
          </div>
          <q-btn
            label="View"
            unelevated
            color="primary"
            style="width: 80px"
            @click="handleViewCourse(data.id)"
          >
          </q-btn>
        </q-card-actions>
      </q-card>
    </section>
  </q-page>
</template>

<script lang="ts" setup>
import { useMeta } from 'quasar';
import DialogForm from 'src/components/DialogForm.vue';
import PageHeader from 'src/components/PageHeader.vue';
import { mockCourse } from 'src/mock/course';
import { CourseService } from 'src/services/course';
import { SubjectService } from 'src/services/subject';
import { Course } from 'src/types/course';
import { Subject } from 'src/types/subject';
import { Teacher } from 'src/types/teacher';
import { requireField } from 'src/utils/field-rules';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const dialogStateAdd = ref(false);
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const subjects = ref<Subject[]>([]);
const router = useRouter();
const filterCourse = ref('');
const teachers = ref<Teacher[]>([]);
const courses = ref<Course[]>([]);
const isLoading = ref(false);
const handleViewCourse = (id: number | undefined) => {
  if (id) {
    router.push({ name: 'Course Detail', params: { id } });
  }
};

const handleSave = () => {
  CourseService.createOne(formCourse);
  dialogStateAdd.value = false;
};
const handleOpenDialog = async () => {
  dialogStateAdd.value = true;
  subjects.value = await SubjectService.getAll();
};

const formCourse = reactive<Course>({
  subject: null,
  curriculum: null,
  teachers: [],
  courseEnrollments: [],
  description: '',
  active: true,
});

onMounted(async () => {
  isLoading.value = true;
  courses.value = await CourseService.getAll();
  isLoading.value = false;
});

useMeta({
  title: title.value,
});
</script>
