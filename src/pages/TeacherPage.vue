<template>
  <q-page padding>
    <PageHeader :search-text="search" @open-dialog="dialogState = true" />
    <q-separator class="q-my-md" />
    <q-table :rows="teachers" row-key="id" :loading="loading"></q-table>
    <DialogForm title="New Teacher" v-model="dialogState" @save="handleSave">
      <template #body>
        <q-select
          outlined
          v-model="form.branch"
          :options="branches"
          option-label="name"
          label="Branch"
          options-dense
          :rules="[requireField]"
        />
        <q-input
          outlined
          v-model="form.email"
          label="Email"
          type="email"
          clearable
          :rules="[requireField]"
        />
        <q-input
          outlined
          v-model="form.name"
          label="Name"
          clearable
          :rules="[requireField]"
        />
        <q-input
          outlined
          v-model="form.engName"
          label="English Name"
          clearable
          :rules="[requireField]"
        />
        <q-select
          outlined
          v-model="form.position"
          :options="[...Object.values(AcademicRank)]"
          label="Position"
          options-dense
          :rules="[requireField]"
        />
        <q-select
          outlined
          v-model="form.specialists"
          :options="[
            'Machine Learning',
            'Deep Learning',
            'Software Engineering',
          ]"
          label="Specialists"
          options-dense
          clearable
          multiple
        />
        <q-input
          outlined
          v-model="form.tel"
          label="Telephone"
          clearable
          :rules="[(val) => val.length == 10 || 'Field not correct format']"
          mask="###-###-####"
          unmasked-value
        />
        <q-input
          outlined
          v-model="form.officeRoom"
          label="Office Room"
          clearable
          hint="optional"
        />
        <q-input
          outlined
          v-model="form.bio"
          label="Bio"
          hint="optional"
          autogrow
        />
      </template>
    </DialogForm>
  </q-page>
</template>

<script lang="ts" setup>
import { useMeta } from 'quasar';
import DialogForm from 'src/components/DialogForm.vue';
import PageHeader from 'src/components/PageHeader.vue';
import { BranchService } from 'src/services/branches';
import { TeacherService } from 'src/services/teacher';
import { Branch } from 'src/types/branch';
import { AcademicRank } from 'src/types/poistion.enum';
import { Teacher } from 'src/types/teacher';
import { requireField } from 'src/utils/field-rules';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const dialogState = ref(false);
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const search = ref();
const form = reactive<Teacher>({
  name: '',
  engName: '',
  tel: '',
  picture: '',
  email: '',
  officeRoom: '',
  specialists: [],
  bio: '',
  position: '',
  branch: null,
  socials: {
    line: '',
  },
  curriculums: [],
  user: null,
});
const loading = ref(false);
const teachers = ref<Teacher[]>([]);
const branches = ref<Branch[]>([]);

const handleSave = async () => {
  TeacherService.createOne(form);
  dialogState.value = false;
  window.location.reload();
};

const fetchAll = async () => {
  loading.value = true;
  teachers.value = await TeacherService.getAll();
  branches.value = await BranchService.getAll();
  loading.value = false;
};

onMounted(fetchAll);

useMeta({
  title: title.value,
});
</script>
