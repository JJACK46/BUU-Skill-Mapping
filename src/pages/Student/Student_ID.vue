<template>
  <q-page padding class="q-gutter-y-md">
    <section>
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Student" to="/students" />
        <q-breadcrumbs-el :label="`${student.id}`" />
      </q-breadcrumbs>
    </section>
    <section class="q-gutter-y-md">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">
            {{ `${student.id} ${student.name}` }}
          </div>
          <div class="text-body1">
            {{ `${student.engName}` }}
          </div>
          <div class="text-body1">
            {{ `${student.branch?.thaiName}` }}
          </div>
        </q-card-section>
      </q-card>
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Skill Collection</div>
          <div class="text-body1">
            <q-list>
              <q-item v-for="(s, i) in student.skillCollection" :key="i">
                <q-item-section>
                  {{ i + 1 }}. {{ s.skill?.thaiName ?? 'Unknown' }} / Level:
                  {{ s.gainedLevel }} / {{ s.passed ? 'Passed' : 'Failed' }}
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>
      </q-card>
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Course Enrollment</div>
          <div class="text-body1">
            <q-list>
              <q-item v-for="(s, i) in student.courseEnrollment" :key="i">
                <q-item-section>
                  {{ i + 1 }}.
                  {{ s.course?.name ?? 'Unknown' }}
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>
      </q-card>
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

onMounted(async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  route.params.id && (student.value.id = Number(route.params.id));
  student.value = await StudentService.getOne(student.value.id ?? 0);
});
</script>
