<template>
  <q-page padding class="q-gutter-y-md">
    <section>
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Student" to="/" />
        <q-breadcrumbs-el :label="`${student.id}`" />
      </q-breadcrumbs>
    </section>
    <section class="row q-gutter-x-lg">
      <div class="col q-gutter-y-md" style="max-width: 30%">
        <q-card flat bordered>
          <q-card-section> Student Info </q-card-section>
        </q-card>
        <q-card flat bordered>
          <q-card-section> Student Info </q-card-section>
        </q-card>
        <q-card flat bordered>
          <q-card-section> Student Info </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <div id="student" style="height: 91vh" @mouseover="tab = 'student'">
          <div class="text-h6">
            {{ `${student.id} ${student.name}` }}
          </div>
          <div class="text-body1">
            {{ `${student.engName}` }}
          </div>
          <div class="text-body1">
            {{ `${student.branch?.name}` }}
          </div>
        </div>
        <div id="skill">some skill</div>
        <div id="course">some course</div>
      </div>
    </section>
  </q-page>
</template>

<script lang="ts" setup>
import { StudentService } from 'src/services/student';
import type { Student } from 'src/types/student';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const student = ref<Student>({} as Student);
// type tabs = 'student' | 'skill' | 'course';
const tab = ref();

onMounted(async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  route.params.id && (student.value.id = Number(route.params.id));
  student.value = await StudentService.getOne(student.value.id ?? 0);
});
</script>
