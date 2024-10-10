<template>
  <q-page padding>
    <PageHeader :search-text="search" @open-dialog="dialogState = true" />
    <q-separator class="q-my-md" />
    <q-dialog v-model="dialogState">
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
          <q-btn flat @click="dialogState = false"> cancel </q-btn>
          <q-btn flat color="blue" @click="save(), (dialogState = false)">
            save
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <SkillTree :skills="skills ?? []" />
  </q-page>
</template>

<script lang="ts" setup>
import SkillTree from 'src/components/SkillTree.vue';
import { onMounted, reactive, ref } from 'vue';
import { useMeta } from 'quasar';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Skill } from 'src/types/skill';
import { SkillService } from 'src/services/skill';
import PageHeader from 'src/components/PageHeader.vue';

const route = useRoute();
const title = computed(() => route.matched[1].name as string);
useMeta({
  title: title.value,
});

const search = ref('');
const dialogState = ref();
const skills = ref<Skill[]>();

const options = <Skill[]>[
  {
    name: 'Azure Cloud Platform',
    description: '',
    type: 'Specific',
    domain: 'Ability',
  },
  {
    name: 'AWS Cloud Platform',
    description: '',
    type: 'Specific',
    domain: 'Ability',
  },
  {
    name: 'Cloudflare ',
    description: '',
    type: 'Specific',
    domain: 'Ability',
  },
];

const insSkill = reactive<Skill>({
  name: '',
  description: '',
  domain: 'Psychomotor',
  type: 'Specific',
});

const save = () => {
  skills.value?.push({ ...insSkill });
};

// const existSkills = ref<Skill[]>([
//   {
//     name: 'AI Domain Expert',
//     description: '',
//     domain: SkillDomain.Ability,
//     type: SkillType.Specific,
//     children: [
//       {
//         name: 'Domain Expert',
//         description: '',
//         domain: SkillDomain.Ability,
//         type: SkillType.Specific,
//       },
//       {
//         name: 'Training Model',
//         description: '',
//         domain: SkillDomain.Ability,
//         type: SkillType.Specific,
//       },
//     ],
//   },
// ]);

onMounted(async () => {
  skills.value = await SkillService.fetchAll();
});
</script>
