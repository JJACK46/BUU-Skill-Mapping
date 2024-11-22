<template>
  <div>
    <q-btn
      icon="filter_list"
      flat
      label="Filter"
      color="primary"
      dense
      @click="filterDialog = !filterDialog"
    >
      <q-popup-edit
        v-model="filterDialog"
        :cover="false"
        :offset="[0, 10]"
        style="width: 400px"
        @vue:mounted="initOptions"
      >
        <q-tabs v-model="tab">
          <q-tab name="faculty" label="Faculty" />
          <q-tab name="branch" label="Branch" v-if="byBranch" />
          <q-tab name="curriculum" label="Curriculum" v-if="byCurriculum" />
          <q-tab name="subject" label="Subject" v-if="bySubject" />
          <q-tab name="skill" label="Skill" v-if="bySkill" />
        </q-tabs>
        <q-tab-panels v-model="tab">
          <q-tab-panel name="faculty">
            <q-select
              v-model="selectedFaculty"
              :options="faculties"
              option-value="id"
              :option-label="(item) => `${item.name || ''}`"
              label="Faculty"
              clearable
              @update:model-value="handleChangeFaculty"
              @clear="handleClear"
              outlined
              style="height: 55px; min-width: 150px"
            />
          </q-tab-panel>
          <q-tab-panel name="branch">
            <q-select
              v-model="selectedBranch"
              :options="branches"
              option-value="id"
              :option-label="(item) => `${item.name || ''}`"
              @update:model-value="handleChangeBranch"
              label="Branch"
              outlined
            />
          </q-tab-panel>
          <q-tab-panel name="curriculum">
            <q-select
              v-model="selectedCurriculum"
              :options="curriculums"
              option-value="id"
              :option-label="(item) => `${item.name || ''}`"
              @update:model-value="handleChangeCurriculum"
              label="Curriculum"
              outlined
            />
          </q-tab-panel>
          <q-tab-panel name="subject">
            <q-select
              v-model="selectedSubject"
              :options="subjects"
              option-value="id"
              :option-label="(item) => `${item.name || ''}`"
              @update:model-value="handleChangeSubject"
              label="Subject"
              outlined
            />
          </q-tab-panel>
          <q-tab-panel name="skill">
            <q-select
              v-model="selectedSkill"
              :options="skills"
              option-value="id"
              :option-label="(item) => `${item.name || ''}`"
              label="Skill"
              outlined
              style="height: 55px; min-width: 150px"
            />
          </q-tab-panel> </q-tab-panels
      ></q-popup-edit>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Faculty } from 'src/types/faculty';
import { Branch } from 'src/types/branch';
import { Curriculum } from 'src/types/curriculum';
import { Subject } from 'src/types/subject';
import { Skill } from 'src/types/skill';
import { api } from 'src/boot/axios';
import { PageParams } from 'src/types/pagination';

const props = defineProps<{
  fetchData: (pageParams?: PageParams) => void;
  pageParams: PageParams;
  byBranch?: boolean;
  byCurriculum?: boolean;
  bySubject?: boolean;
  bySkill?: boolean;
  byTechSkill?: boolean;
}>();

const emit = defineEmits(['update:pageParams']);

const tab = ref();
const filterDialog = ref(false);
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
      props.fetchData({
        ...props.pageParams,
        columnName: 'branch',
        columnId: newBranch.id,
      });
      selectedCurriculum.value = '';
    }
    if (newBranch.curriculums) {
      curriculums.value = newBranch.curriculums;
      // selectedCurriculum.value = curriculums.value[0];
    } else {
      curriculums.value = [];
      selectedCurriculum.value = null;
    }
    emit('update:pageParams', {
      ...props.pageParams,
      columnName: 'branch',
      columnId: newBranch.id,
    });
  }
});

watch(selectedCurriculum, (newCurriculum) => {
  if (newCurriculum) {
    if (props.byCurriculum) {
      props.fetchData({
        ...props.pageParams,
        columnName: 'curriculum',
        columnId: newCurriculum.id,
      });
      selectedSubject.value = '';
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
    props.fetchData({
      ...props.pageParams,
      columnName: 'subject',
      columnId: newSubject.id,
    });
    selectedSkill.value = '';
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
    props.fetchData({
      ...props.pageParams,
      columnName: 'skill',
      columnId: newSkill.id,
    });
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
  props.fetchData({ ...props.pageParams, columnName: '', columnId: '' });
};

const initOptions = async () => {
  const res = await api.get('/faculties/filters'); //filters/1, filters/2
  console.log(res.data);
  if (res.data) {
    faculties.value = res.data;
  }
};

const handleChangeFaculty = async (v: Faculty) => {
  const res = await api.get('/branches/filters/' + v.id);
  if (res.data) {
    branches.value = res.data;
  }
};

const handleChangeBranch = async (v: Branch) => {
  if (!props.byCurriculum) {
    return;
  }
  const res = await api.get('/curriculums/filters/' + v.id);
  if (res.data) {
    curriculums.value = res.data;
  }
};

const handleChangeCurriculum = async (v: Curriculum) => {
  if (!props.bySubject) {
    return;
  }
  const res = await api.get('/subjects/filters/' + v.id);
  if (res.data) {
    subjects.value = res.data;
  }
};

const handleChangeSubject = async (v: Subject) => {
  if (!props.bySkill) {
    return;
  }
  const res = await api.get('/skills/filters/' + v.id);
  if (res.data) {
    skills.value = res.data;
  }
};
</script>
