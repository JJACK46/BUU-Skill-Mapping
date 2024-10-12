<template>
  <q-page padding>
    <PageHeader :search-text="search" @open-dialog="dialogState = true" />
    <q-separator class="q-my-md" />
    <q-table :rows="teachers" row-key="id" :loading="loading"></q-table>
    <DialogForm title="New Teacher" v-model="dialogState" @save="handleSave">
      <template #body>
        <q-input
          outlined
          v-model="form.email"
          label="Email"
          :rules="[requireField]"
        />
        <q-input
          outlined
          v-model="form.name"
          label="Name"
          :rules="[requireField]"
        />
        <q-input
          outlined
          v-model="form.engName"
          label="English Name"
          :rules="[requireField]"
        />
        <q-input
          outlined
          v-model="form.position"
          label="Position"
          :rules="[requireField]"
        />
        <q-input
          outlined
          v-model="form.tel"
          label="Telephone"
          :rules="[(val) => val.length == 10 || 'Field not correct format']"
        />
        <q-input
          outlined
          v-model="form.officeRoom"
          label="Office Room"
          :rules="[requireField]"
        />
        <q-input outlined v-model="form.bio" label="Bio" hint="optional" />
      </template>
    </DialogForm>
  </q-page>
</template>

<script lang="ts" setup>
import { useMeta } from 'quasar';
import DialogForm from 'src/components/DialogForm.vue';
import PageHeader from 'src/components/PageHeader.vue';
import { TeacherService } from 'src/services/teacher';
import { Teacher } from 'src/types/teacher';
import { requireField } from 'src/utils/field-rules';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const dialogState = ref(false);
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const search = ref();
const form = reactive<Teacher>({
  id: 0,
  email: '',
  name: '',
  engName: '',
  tel: '',
  picture: '',
  user: null,
  officeRoom: '',
  specialists: ['Machine Learning', 'Artificial Intelligence'],
  socials: '',
  bio: '',
  position: '',
  branch: null,
  curriculums: [],
});
const loading = ref(false);
const teachers = ref<Teacher[]>([]);

const handleSave = () => {
  TeacherService.createOne(form);
  dialogState.value = false;
};

onMounted(async () => {
  loading.value = true;
  teachers.value = await TeacherService.getAll();
  loading.value = false;
});

useMeta({
  title: title.value,
});
</script>
