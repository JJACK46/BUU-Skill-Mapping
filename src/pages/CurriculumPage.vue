<template>
  <q-page padding>
    <PageHeader :search-text="search" @open-dialog="store.toggleDialogForm" />
    <q-separator class="q-my-md" />
    <section class="q-mt-md q-gutter-y-lg">
      <DialogForm
        @save="() => {}"
        title="New Curriculum"
        v-model="store.dialogForm"
        full-width
      >
        <template #body>
          <q-splitter v-model="qsplitterVModel">
            <template #before>
              <q-tabs v-model="innerTab" vertical class="text-primary">
                <q-tab name="main" icon="home" label="Main" />
                <q-tab name="subjects" icon="book" label="Subjects" />
              </q-tabs>
            </template>
            <template #after>
              <q-tab-panels
                v-model="innerTab"
                animated
                transition-next="slide-up"
                transition-prev="slide-down"
              >
                <q-tab-panel name="main" class="q-gutter-y-md">
                  <q-input
                    dense
                    outlined
                    v-model="store.form.thaiName"
                    label="Name *"
                    :rules="[requireField, onlyAlphabet]"
                  />
                  <q-input
                    dense
                    outlined
                    v-model="store.form.engName"
                    label="English Name *"
                    :rules="[requireField, onlyAlphabet]"
                  />
                  <q-input
                    dense
                    type="textarea"
                    outlined
                    v-model="store.form.description"
                    label="Description *"
                    :rules="[requireField]"
                  />
                  <q-input
                    dense
                    outlined
                    v-model="store.form.thaiDegreeName"
                    label="Degree Name *"
                    :rules="[requireField, onlyAlphabet]"
                  />
                  <q-input
                    dense
                    outlined
                    v-model="store.form.engDegreeName"
                    label="English Degree Name *"
                    :rules="[requireField, onlyAlphabet]"
                  />
                  <q-input
                    dense
                    type="number"
                    outlined
                    v-model="store.form.period"
                    label="Period *"
                    :rules="[requireField]"
                  />
                  <q-input
                    dense
                    type="number"
                    outlined
                    v-model="store.form.minimumGrade"
                    label="Minimum Grade *"
                    :rules="[requireField]"
                  />
                </q-tab-panel>
                <q-tab-panel name="subjects">
                  <q-select
                    dense
                    outlined
                    v-model="store.form.subjects"
                    :options="subjects"
                    label="Subjects  *"
                    use-chips
                    option-label="name"
                    multiple
                    :rules="[requireField]"
                  ></q-select>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </template>
      </DialogForm>
      <q-card
        class="q-pa-md q-animate--fade"
        v-for="(c, index) in curriculums"
        bordered
        flat
        :key="c.id"
      >
        <q-card-section>
          <div class="row justify-between">
            <span class="text-h6">
              {{ c.thaiName }}
              <p class="text-caption">{{ c.engName }}</p>
            </span>
            <q-btn
              icon="edit"
              flat
              padding="none"
              @click="store.toggleDialogForm(c)"
            />
          </div>
          <div>{{ c.description }}</div>
          <div>{{ c.thaiDegreeName }}</div>
          <div>{{ c.engDegreeName }}</div>
          <div>Period: {{ c.period }} Years</div>
          <div>Minimum Grade: {{ c.minimumGrade }}</div>
          <div>{{ c.coordinators }}</div>
        </q-card-section>
        <q-card-section class="text-body1 q-pa-none">
          <q-expansion-item
            label="List of subjects"
            @click="handleSubjects(index)"
          >
            <q-table
              :rows="c.subjects || []"
              wrap-cells
              grid
              flat
              bordered
              row-key="id"
              :rows-per-page-options="[0]"
              hide-bottom
            >
            </q-table>
          </q-expansion-item>
        </q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<script lang="ts" setup>
import { useMeta } from 'quasar';
import DialogForm from 'src/components/DialogForm.vue';
import PageHeader from 'src/components/PageHeader.vue';
import { CurriculumService } from 'src/services/curriculums';
import { SubjectService } from 'src/services/subject';
import { useCurriculumStore } from 'src/stores/curriculum';
import { Curriculum } from 'src/types/curriculum';
import { Subject } from 'src/types/subject';
import { onlyAlphabet, requireField } from 'src/utils/field-rules';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const search = ref();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const store = useCurriculumStore();
const curriculums = ref<Curriculum[]>();
const innerTab = ref('main');
const qsplitterVModel = ref(10);
const subjects = ref<Subject[]>();

const handleSubjects = (index: number) => {
  if (!curriculums.value) return;
  if (
    curriculums.value[index].subjects?.length === 0 ||
    !curriculums.value[index].subjects
  ) {
    SubjectService.getAll().then((res) => {
      curriculums.value![index].subjects = res.data;
    });
  }
};

useMeta({
  title: title.value,
});
onMounted(async () => {
  curriculums.value = (await CurriculumService.getAll({ page: 1 })).data;
  subjects.value = (await SubjectService.getAll()).data;
});
</script>
