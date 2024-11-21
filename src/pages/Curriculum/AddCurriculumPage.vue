<template>
  <q-page padding>
    <PageHeader :search-text="search" @open-dialog="dialogState = true" />
    <q-separator class="q-my-md" />
    <div class="q-pa-md">
      <q-card>
        <q-splitter v-model="splitterModel">
          <template v-slot:before>
            <q-tabs
              v-model="tab"
              vertical
              class="text-primary q-pa-md"
              align="justify"
            >
              <q-tab
                name="curriculum"
                icon="collections_bookmark"
                label="Curriculum"
              />
              <q-tab name="teachers" icon="group" label="Teachers" />
              <q-tab name="subjects" icon="book" label="Subjects" />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel name="curriculum">
                <AddCurriculum></AddCurriculum>
              </q-tab-panel>

              <q-tab-panel name="teachers">
                <div class="text-h4 q-mb-md q-mt-md">Teachers</div>
                <q-select
                  label="Teacher"
                  outlined
                  class="q-mt-md"
                  v-model="form.branch"
                  :options="availableBranches"
                  option-value="id"
                  option-label="name"
                />
                <div class="q-mt-md">
                  <div class="text-h6 q-mb-md">Teacher List</div>
                  <q-card>
                    <q-card-section v-for="(card, index) in cards" :key="index">
                      <div class="row items-center justify-between">
                        <div class="q-mr-md">
                          {{ card }}
                        </div>
                        <q-btn
                          label="Delete"
                          color="negative"
                          flat
                          class="q-ml-md"
                          @click="deleteCard(index)"
                        />
                      </div>
                      <q-separator class="q-mt-md" />
                    </q-card-section>
                  </q-card>
                </div>
                <div class="row justify-center">
                  <q-btn
                    outline
                    round
                    label="+"
                    color="primary"
                    class="q-mt-xl"
                    @click="addCard"
                  />
                </div>
                <div class="row justify-end">
                  <q-btn label="Reset" color="secondary" class="q-mt-md" />
                  <q-btn
                    label="Save"
                    color="primary"
                    class="q-mt-md q-ml-sm justify-end"
                    @click="save"
                  />
                </div>
              </q-tab-panel>

              <q-tab-panel name="subjects">
                <div class="text-h4 q-mb-md q-mt-md">Subjects</div>
                <q-select
                  use-input
                  label="Subject"
                  outlined
                  @filter="filterFn"
                  class="q-mt-md"
                  v-model="form.subjects"
                  :options="filteredSubjects"
                  option-value="id"
                  option-label="label"
                />
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useMeta } from 'quasar';
import PageHeader from 'src/components/PageHeader.vue';
import AddCurriculum from './AddCurriculum.vue';
import { CurriculumService } from 'src/services/curriculums';
import { Curriculum } from 'src/types/curriculum';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCurriculumStore } from 'src/stores/curriculums';
import { BranchService } from 'src/services/branches';
import { SubjectService } from 'src/services/subject';
import { Subject } from 'src/types/subject';
const curriculumStore = useCurriculumStore();
const dialogState = ref(false);
const search = ref('');
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const tab = ref('curriculum');
const splitterModel = ref(20);
const curriculums = ref<Curriculum[]>([]);
const availableSubject = ref([]);
const computedAvailableSubject = computed(() =>
  availableSubject.value.map((subject: Subject) => ({
    ...subject,
    label: `${subject.id}    ${subject.name}`,
  }))
);
const form = reactive({
  id: '',
  thaiName: '',
  engName: '',
  thaiDegreeName: '',
  engDegreeName: '',
  description: '',
  period: 4,
  minimumGrade: 0,
  branch: [],
  coordinators: [],
  subjects: [],
});
const cards = ref<string[]>([]);
const showDeleteIndex = ref<number | null>(null);
function addCard() {
  cards.value.push('by John Doe');
}

function deleteCard(index: number) {
  cards.value.splice(index, 1);
  showDeleteIndex.value = null;
}
const availableBranches = ref([]);

useMeta({
  title: title.value,
});

onMounted(async () => {
  try {
    availableSubject.value = await SubjectService.getAll();
    availableBranches.value = await BranchService.getAll();
    curriculums.value = await CurriculumService.getAll();
  } catch (error) {
    console.error('Failed to fetch curriculums:', error);
  }
});

async function save() {
  console.log('click');
  console.log(form.engName);
  console.log(availableBranches.value[0]);

  curriculumStore.editedCurriculum.thaiName = form.thaiName;
  curriculumStore.editedCurriculum.engName = form.engName;
  curriculumStore.editedCurriculum.id = form.id;
  curriculumStore.editedCurriculum.thaiDegreeName = form.thaiDegreeName;
  curriculumStore.editedCurriculum.engDegreeName = form.engDegreeName;
  curriculumStore.editedCurriculum.description = form.description;
  curriculumStore.editedCurriculum.period = form.period;
  curriculumStore.editedCurriculum.minimumGrade = form.minimumGrade;
  curriculumStore.editedCurriculum.branch = availableBranches.value[0];

  console.log('Saving curriculum:', curriculumStore.editedCurriculum);

  try {
    await curriculumStore.saveCurriculum();
    console.log(
      'Curriculum saved successfully:',
      curriculumStore.editedCurriculum
    );
  } catch (error) {
    console.error('Error saving curriculum:', error);
  }
}

const filteredSubjects = ref(computedAvailableSubject.value);
type FilterUpdate = (fn: () => void) => void;
function filterFn(val: string, update: FilterUpdate) {
  if (val === '') {
    filteredSubjects.value = computedAvailableSubject.value;
  } else {
    filteredSubjects.value = computedAvailableSubject.value.filter((subject) =>
      subject.label.toLowerCase().includes(val.toLowerCase())
    );
  }
  update(() => {});
}
</script>
