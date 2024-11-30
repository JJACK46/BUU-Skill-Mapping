<template>
  <q-page padding>
    <div class="q-pa-md">
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
import { BranchService } from 'src/services/branches';

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

const cards = ref<string[]>([]);
const showDeleteIndex = ref<number | null>(null);
function addCard() {
  cards.value.push('by John Doe');
}

function deleteCard(index: number) {
  cards.value.splice(index, 1);
  showDeleteIndex.value = null;
}
</script>
