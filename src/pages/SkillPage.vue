<template>
  <q-page padding>
    <div class="flex" style="height: 40px">
      <q-input
        outlined
        clearable
        v-model="search"
        label="Search"
        class="col"
        dense
      >
        <template #prepend>
          <q-icon name="search"></q-icon>
        </template>
      </q-input>
      <q-space />
      <q-btn
        class="q-ml-md text-black"
        @click="isDialogOpen = true"
        color="accent"
        >Add Skill</q-btn
      >
    </div>
    <q-dialog v-model="isDialogOpen">
      <q-card>
        <div class="q-pa-md text-h5">New Skill</div>
        <q-card-section class="flex q-gutter-md">
          <q-input outlined v-model="insSkill.label" label="Name"></q-input>
          <q-input
            outlined
            v-model="insSkill.avatar"
            label="Avatar (optional)"
          ></q-input>
          <q-select
            outlined
            v-model="insSkill.children"
            multiple
            :options="options"
            label="Sub-skills"
            style="width: 300px"
          />
        </q-card-section>
        <q-card-actions class="justify-end">
          <q-btn flat @click="isDialogOpen = false"> cancel </q-btn>
          <q-btn flat color="blue" @click="save(), (isDialogOpen = false)">
            save
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <SkillTree :nodes="simple" />
  </q-page>
</template>

<script lang="ts" setup>
import SkillTree, { SkillNode } from 'src/components/SkillTree.vue';
import { reactive, ref } from 'vue';

const search = ref('');
const isDialogOpen = ref();

const options = <SkillNode[]>[
  {
    label: 'Google Cloud Platform',
  },
  {
    label: 'AWS Cloud Platform',
  },
  {
    label: 'Cloudflare ',
  },
];

const insSkill = reactive<SkillNode>({
  children: [],
  label: '',
});

const save = () => {
  simple.value.push({ ...insSkill });
};

const simple = ref<SkillNode[]>([
  {
    label: 'AI Domain Expertise',
    avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    children: [
      {
        label: 'Domain Expertise',
      },
      {
        label: 'Machine Learning',
      },
    ],
  },
]);
</script>
