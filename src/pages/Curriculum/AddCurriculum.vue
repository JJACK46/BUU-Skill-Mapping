<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-h4 q-mb-ml q-mt-md">Curriculum</div>
      <q-input outlined outline label="ID" v-model="form.id" class="q-mt-md" />
      <q-input
        outlined
        label="Thai Name"
        v-model="form.thaiName"
        class="q-mt-md"
      />
      <q-input
        outlined
        label="English Name"
        v-model="form.engName"
        class="q-mt-md"
      />
      <q-input
        outlined
        label="Thai Degree Name"
        v-model="form.thaiDegreeName"
        class="q-mt-md"
      />
      <q-input
        outlined
        label="English Degree Name"
        v-model="form.engDegreeName"
        class="q-mt-md"
      />
      <q-input
        outlined
        label="Period"
        type="number"
        v-model="form.period"
        class="q-mt-md"
      />
      <q-input
        outlined
        label="Minimum Grade"
        type="number"
        v-model="form.minimumGrade"
        class="q-mt-md"
      />

      <q-select
        label="Branch"
        outlined
        class="q-mt-md"
        v-model="form.branch"
        :options="availableBranches"
        option-value="id"
        option-label="name"
      />
      <q-input
        outlined
        label="Description"
        type="textarea"
        v-model="form.description"
        class="q-mt-md"
      />
      <div class="row justify-end">
        <q-btn label="Reset" color="secondary" class="q-mt-md" />
        <q-btn
          label="Save"
          color="primary"
          class="q-mt-md q-ml-sm justify-end"
          @click="save"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useMeta } from 'quasar';
import { CurriculumService } from 'src/services/curriculums';
import { Curriculum } from 'src/types/curriculum';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCurriculumStore } from 'src/stores/curriculums';
import { BranchService } from 'src/services/branches';

const curriculumStore = useCurriculumStore();

const route = useRoute();
const title = computed(() => route.matched[1].name as string);

const curriculums = ref<Curriculum[]>([]);
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
});

const availableBranches = ref([]);

useMeta({
  title: title.value,
});

onMounted(async () => {
  try {
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
</script>
