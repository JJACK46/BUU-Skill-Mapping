<template>
  <div>
    <q-select
      v-model="selectedFaculty"
      :options="faculties"
      option-value="id"
      :option-label="(item) => `${item.name || ''}`"
      label="Faculty"
      clearable
      @clear="handleClear"
      outlined
      style="height: 55px; min-width: 150px"
    />
  </div>

  <div class="row q-gutter-md q-my-xs" v-if="selectedFaculty && props.byBranch">
    <div class="col-auto" style="min-width: 200px">
      <q-select
        v-model="selectedBranch"
        :options="branches"
        option-value="id"
        :option-label="(item) => `${item.name || ''}`"
        label="Branch"
        outlined
      />
    </div>
    <div
      class="col-auto md:col-auto"
      style="min-width: 200px"
      v-if="props.byCurriculum && selectedBranch"
    >
      <q-select
        v-model="selectedCurriculum"
        :options="curriculums"
        option-value="id"
        :option-label="(item) => `${item.name || ''}`"
        label="Curriculum"
        outlined
      />
    </div>
    <div class="col-auto" v-if="props.bySubject && selectedCurriculum">
      <q-select
        v-model="selectedSubject"
        :options="subjects"
        option-value="id"
        :option-label="(item) => `${item.name || ''}`"
        label="Subject"
        outlined
      />
    </div>
    <div class="col-sm-auto" v-if="props.bySkill && selectedSubject">
      <q-select
        v-model="selectedSkill"
        :options="skills"
        option-value="id"
        :option-label="(item) => `${item.name || ''}`"
        label="Skill"
        outlined
        style="height: 55px; min-width: 150px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Faculty } from 'src/types/faculty';
import { Branch } from 'src/types/branch';
import { Curriculum } from 'src/types/curriculum';
import { Subject } from 'src/types/subject';
import { Skill } from 'src/types/skill';
import { api } from 'src/boot/axios';

const props = defineProps<{
  fetchData: (
    search: string,
    columnId: string | null,
    columnName: string | null
  ) => void;
  byBranch?: boolean;
  byCurriculum?: boolean;
  bySubject?: boolean;
  bySkill?: boolean;
  byTechSkill?: boolean;
}>();

const faculties = ref<Partial<Faculty>[]>([]);
const branches = ref<Partial<Branch>[]>([]);
const curriculums = ref<Partial<Curriculum>[]>([]);
const subjects = ref<Partial<Subject>[]>([]);
const skills = ref<Partial<Skill>[]>([]);
// const techSkills = ref<any[]>([]);
const selectedFaculty = ref();
const selectedBranch = ref();
const selectedCurriculum = ref();
const selectedSubject = ref();
const selectedSkill = ref();
// const selectedTechSkill = ref<any>(null);

// Fetch faculties and branches
const fetchFacultiesAndBranches = async () => {
  try {
    const response = await api.get('/faculties/getAllDetails'); // Adjust the URL as needed
    faculties.value = response.data;
    console.log(faculties.value);
  } catch (error) {
    console.error('Failed to fetch faculties and branches:', error);
  }
};

// Watch for changes in selectedFaculty and update branches accordingly
watch(selectedFaculty, (newFaculty) => {
  if (newFaculty && newFaculty.branches) {
    branches.value = newFaculty.branches;
    selectedBranch.value = branches.value[0];
    // disabled.value = false
  } else {
    branches.value = [];
    selectedBranch.value = null;
    // disabled.value = true
  }
});

watch(selectedBranch, (newBranch) => {
  if (newBranch) {
    if (props.byBranch) {
      props.fetchData('', newBranch.id, 'branch');
      selectedCurriculum.value = '';
    }
    if (newBranch.curriculums) {
      curriculums.value = newBranch.curriculums;
      // selectedCurriculum.value = curriculums.value[0];
    } else {
      curriculums.value = [];
      selectedCurriculum.value = null;
    }
  }
});

watch(selectedCurriculum, (newCurriculum) => {
  if (newCurriculum) {
    if (props.byCurriculum) {
      props.fetchData('', newCurriculum.id, 'curriculum');
    }
    if (newCurriculum.subjects) {
      subjects.value = newCurriculum.subjects;
      //selectedSubject.value = curriculums.value[0]
    } else {
      subjects.value = [];
      selectedSubject.value = null;
    }
  }
});

watch(selectedSubject, (newSubject) => {
  if (props.bySubject) {
    props.fetchData('', newSubject.id, 'subject');
  }
  if (newSubject && newSubject.skills) {
    skills.value = newSubject.skills;
    //selectedSkill.value = skills.value[0]
  } else {
    skills.value = [];
    selectedSkill.value = null;
  }
});

watch(selectedSkill, (newSkill) => {
  if (props.bySkill) {
    props.fetchData('', newSkill.id, 'skill');
  }
  //   if (newSkill && newSkill.techSkills) {
  //     techSkills.value = newSkill.techSkills;
  //     // selectedTechSkill.value = techSkills.value[0]
  //   } else {
  //     techSkills.value = [];
  //     selectedTechSkill.value = null;
  //   }
});

// watch(selectedTechSkill, (newTechSkill) => {
//   return props.fetchData('', newTechSkill.id, 'techSkill');
// });

const handleClear = () => {
  selectedFaculty.value = null;
  selectedBranch.value = null;
  selectedCurriculum.value = null;
  selectedSubject.value = null;
  selectedSkill.value = null;
  props.fetchData('', 'null', 'null');
};

onMounted(() => {
  fetchFacultiesAndBranches();
});
</script>
