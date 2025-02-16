<template>
  <div class="row q-gutter-sm justify-end">
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
        <q-tabs v-model="filterMenu">
          <q-tab name="faculty" label="Faculty" v-if="byFaculty" />
          <q-tab name="branch" label="Branch" v-if="byBranch" />
          <q-tab name="curriculum" label="Curriculum" v-if="byCurriculum" />
          <q-tab name="subject" label="Subject" v-if="bySubject" />
          <q-tab name="skill" label="Skill" v-if="bySkill" />
        </q-tabs>
        <q-tab-panels v-model="filterMenu" animated>
          <q-tab-panel name="faculty">
            <q-select
              v-model="selectedFaculty"
              :options="faculties"
              option-value="id"
              :option-label="(item) => `${item.name || ''}`"
              label="Faculty"
              clearable
              @update:model-value="handleChangeFaculty"
              @clear="
                ((selectedFaculty = null),
                (selectedBranch = null),
                (selectedCurriculum = null),
                (selectedSubject = null),
                (selectedSkill = null),
                fetchData({ ...pageParams, columnName: '', columnId: '' }))
              "
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
              clearable
              @clear="
                ((selectedBranch = null),
                (selectedCurriculum = null),
                (selectedSubject = null),
                (selectedSkill = null),
                fetchData({ ...pageParams, columnName: '', columnId: '' }))
              "
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
              clearable
              @clear="
                ((selectedCurriculum = null),
                (selectedSubject = null),
                (selectedSkill = null),
                fetchData({
                  ...pageParams,
                  columnName: 'branch',
                  columnId: selectedBranch.id,
                }))
              "
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
              clearable
              @clear="
                ((selectedSubject = null),
                (selectedSkill = null),
                fetchData({
                  ...pageParams,
                  columnName: 'curriculum',
                  columnId: selectedCurriculum.id,
                }))
              "
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
              clearable
              @clear="
                ((selectedSubject = null),
                (selectedSkill = null),
                fetchData({
                  ...pageParams,
                  columnName: 'subject',
                  columnId: selectedSubject.id,
                }))
              "
              label="Skill"
              outlined
              style="height: 55px; min-width: 150px"
            />
          </q-tab-panel> </q-tab-panels
      ></q-popup-edit>
    </q-btn>
    <q-input
      outlined
      clearable
      v-model="search"
      @keyup.enter="fetchData({ ...props.pageParams })"
      :label="labelSearch ?? 'Search'"
      class="col"
      dense
      debounce="500"
      style="max-width: 500px"
    >
      <template #prepend>
        <q-icon name="search"></q-icon>
      </template>
    </q-input>
    <q-btn
      @click="$emit('openDialog')"
      color="primary"
      label="add"
      style="width: 80px"
      unelevated
    >
    </q-btn>
  </div>
  <div class="row q-gutter-sm">
    <div
      v-show="selectedBranch || selectedFaculty"
      class="q-animate--fade q-mt-sm"
    >
      <span>Filter: </span>
      <q-chip
        v-if="selectedFaculty"
        :label="selectedFaculty.name"
        @remove="selectedFaculty = null"
      />
      <q-chip
        v-if="selectedBranch"
        :label="selectedBranch.name"
        @remove="selectedBranch = null"
      />
      <q-chip
        v-if="selectedCurriculum"
        :label="selectedCurriculum.name"
        @remove="selectedCurriculum = null"
      />
      <q-chip
        v-if="selectedSubject"
        :label="selectedSubject.name"
        @remove="selectedSubject = null"
      />
      <q-chip
        v-if="selectedSkill"
        :label="selectedSkill.name"
        @remove="selectedSkill = null"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Faculty } from 'src/types/faculty';
import type { Branch } from 'src/types/branch';
import type { Curriculum } from 'src/types/curriculum';
import type { Lesson } from 'src/types/subject';
import type { Skill } from 'src/types/skill';
import { api } from 'src/boot/axios';
import type { PageParams } from 'src/types/pagination';

const props = defineProps<{
  fetchData: (pageParams?: PageParams) => void;
  pageParams: PageParams;
  byFaculty?: boolean;
  byBranch?: boolean;
  byCurriculum?: boolean;
  bySubject?: boolean;
  bySkill?: boolean;
  byTechSkill?: boolean;
  labelSearch?: string;
}>();

const filterMenu = ref();
const filterDialog = ref(false);
const search = ref('');

const faculties = ref<Partial<Faculty>[]>([]);
const branches = ref<Partial<Branch>[]>([]);
const curriculums = ref<Partial<Curriculum>[]>([]);
const subjects = ref<Partial<Lesson>[]>([]);
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
    // selectedBranch.value = branches.value[0];
  } else {
    branches.value = [];
    selectedBranch.value = null;
  }
});

watch(selectedBranch, async (newBranch) => {
  if (newBranch) {
    if (props.byBranch) {
      await props.fetchData({
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
  }
});

watch(selectedCurriculum, async (newCurriculum) => {
  if (newCurriculum) {
    if (props.byCurriculum) {
      await props.fetchData({
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

watch(selectedSubject, async (newSubject) => {
  if (props.bySubject) {
    await props.fetchData({
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

watch(selectedSkill, async (newSkill) => {
  if (props.bySkill) {
    await props.fetchData({
      ...props.pageParams,
      columnName: 'skill',
      columnId: newSkill.id,
    });
  }
});

const initOptions = async () => {
  const res = await api.get('/faculties/filters'); //filters/1, filters/2
  console.log(res.data);
  if (res.data) {
    faculties.value = res.data;
  }
};

const handleChangeFaculty = async (v: Faculty) => {
  if (!v) {
    return;
  }
  try {
    const res = await api.get('/branches/filters/' + v.id);
    if (res.data) {
      console.log('Branches data:', res.data);
      branches.value = res.data;
    }
  } catch (err) {
    console.error('Error fetching branches:', err);
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

const handleChangeSubject = async (v: Lesson) => {
  if (!props.bySkill) {
    return;
  }
  const res = await api.get('/skills/filters/' + v.id);
  if (res.data) {
    skills.value = res.data;
  }
};
</script>
