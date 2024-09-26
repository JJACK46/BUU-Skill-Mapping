<template>
  <q-page padding>
    <div class="text-h6">{{ title }}</div>
    <q-separator class="q-my-md" />
    <div class="flex flex-center q-gutter-sm">
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
      <div>
        <q-btn @click="isDialogOpen = true" color="secondary">Add</q-btn>
      </div>
    </div>
    <q-dialog v-model="isDialogOpen">
      <q-card>
        <div class="q-pa-md text-h5">New Skill</div>
        <q-card-section class="flex q-gutter-md">
          <q-input outlined v-model="insSkill.name" label="Name"></q-input>
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
    <SkillTree :skills="existSkills" />
  </q-page>
</template>

<script lang="ts" setup>
import SkillTree from 'src/components/SkillTree.vue';
import { reactive, ref } from 'vue';
import { useMeta } from 'quasar';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Skill } from 'src/types/skill';

const route = useRoute();
const title = computed(() => route.matched[0].name as string);
useMeta({
  title: title.value,
});

const search = ref('');
const isDialogOpen = ref();

const options = <Skill[]>[
  {
    name: 'Google Cloud Platform',
  },
  {
    name: 'AWS Cloud Platform',
  },
  {
    name: 'Cloudflare ',
  },
];

const insSkill = reactive<Skill>({
  name: '',
  description: '',
  domain: 'Ability',
  type: 'Specific',
});

const save = () => {
  existSkills.value.push({ ...insSkill });
};

const existSkills = ref<Skill[]>([
  {
    name: 'AI Domain Expert',
    description: '',
    domain: 'Ability',
    type: 'Specific',
    children: [
      {
        name: 'Domain Expert',
        description: '',
        domain: 'Ability',
        type: 'Specific',
      },
      {
        name: 'Training Model',
        description: '',
        domain: 'Ability',
        type: 'Specific',
      },
    ],
  },
]);
</script>
