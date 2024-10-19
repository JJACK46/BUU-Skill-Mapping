<template>
  <q-page padding>
    <PageHeader
      v-model:searchText="filterCourse"
      @open-dialog="handleOpenDialog"
    />
    <DialogForm
      title="New Course"
      v-model="store.dialogState"
      @save="store.createOne"
    >
      <template #body>
        <q-input
          outlined
          label="Course ID"
          v-model="store.form.id"
          autofocus
          mask="########"
          :rules="[requireField]"
        />
        <q-input
          outlined
          label="Name"
          v-model="store.form.name"
          :rules="[requireField]"
        />

        <q-select
          outlined
          label="Subject"
          v-model="store.form.subject"
          :options="subjects"
          option-label="engName"
          options-dense
          :rules="[requireField]"
        >
        </q-select>
        <q-select
          outlined
          label="Teachers"
          v-model="store.form.teachers"
          :options="teachers"
          multiple
          :option-label="(item) => `${item.position ?? ''} ${item.name}`"
          options-dense
          :rules="[requireField]"
        />
        <q-input
          v-model="store.form.description"
          label="Course Description"
          autogrow
          outlined
        />
      </template>
    </DialogForm>
    <q-separator class="q-my-md" />
    <section class="q-gutter-lg row">
      <q-linear-progress v-if="store.loading" indeterminate />
      <q-card
        id="course-card"
        class="col-grow col-sm-auto"
        v-for="course in store.courses"
        :key="course.id"
        style="width: 350px"
      >
        <q-card-section class="q-py-sm">
          <q-item class="q-pa-none">
            <q-item-section class="text-h6">
              {{ course.name ?? course.subject?.engName }}
            </q-item-section>
            <q-item-section avatar>
              <q-btn icon="more_vert" flat padding="none">
                <q-popup-proxy>
                  <q-list>
                    <q-item
                      clickable
                      onmouseenter="this.style.color='red'"
                      onmouseleave="this.style.color=''"
                      @click="handlePopup(course.id!)"
                      v-close-popup
                    >
                      <q-item-section> Delete</q-item-section>
                      <q-item-section avatar>
                        <q-icon name="delete" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-popup-proxy>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-card-section style="text-indent: 1rem" class="text-body2 q-pt-none">
          {{ course.courseEnrollments?.length ?? 0 }} Students
        </q-card-section>
        <q-separator />
        <q-card-actions class="text-body1 q-pa-md" align="between">
          <div :class="`text-${course.active ? 'positive' : 'negative'}`">
            {{ course.active ? 'Active' : 'Inactive' }}
          </div>
          <q-btn
            label="View"
            unelevated
            color="primary"
            style="width: 80px"
            @click="handleViewCourse(course.id)"
          >
          </q-btn>
        </q-card-actions>
      </q-card>
    </section>
  </q-page>
</template>

<script lang="ts" setup>
import { useMeta, useQuasar } from 'quasar';
import DialogForm from 'src/components/DialogForm.vue';
import PageHeader from 'src/components/PageHeader.vue';
import { CurriculumService } from 'src/services/curriculums';
import { SubjectService } from 'src/services/subject';
import { TeacherService } from 'src/services/teacher';
import { useCourseStore } from 'src/stores/course';
import { Curriculum } from 'src/types/curriculum';
import { Subject } from 'src/types/subject';
import { Teacher } from 'src/types/teacher';
import { requireField } from 'src/utils/field-rules';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const $q = useQuasar();
const route = useRoute();
const subjects = ref<Subject[]>([]);
const curriculums = ref<Curriculum[]>([]);
const router = useRouter();
const filterCourse = ref('');
const teachers = ref<Teacher[]>([]);
const store = useCourseStore();

const handleViewCourse = (id: number | undefined) => {
  if (id) {
    router.push({ name: 'Course Detail', params: { id } });
  }
};

const handleOpenDialog = async () => {
  store.dialogState = true;
  subjects.value = await SubjectService.getAll();
  teachers.value = await TeacherService.getAll();
  curriculums.value = await CurriculumService.getAll();
};

const handlePopup = (id: number) => {
  $q.dialog({
    title: 'Confirm Deletion',
    message: 'Are you sure you want to delete this course?',
    cancel: true,
    persistent: true,
  }).onOk(() => store.removeOne(id));
};

onMounted(store.setup);

const title = computed(() => route.matched[1].name as string);
useMeta({
  title: title.value,
});
</script>

<style scoped lang="scss">
#course-card {
  border: 2px solid transparent;
}
#course-card:hover {
  border: 2px solid $accent-select;
}
</style>
