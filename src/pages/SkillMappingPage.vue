<template>
  <q-page padding>
    <PageHeader :search-text="search" @open-dialog="dialogState = true" />
    <q-separator class="q-my-md" />
    <q-dialog v-model="dialogState">
      <q-card>
        <p class="text-h5 q-px-md q-pt-md">New Mapping</p>
        <q-card-section class="q-gutter-md">
          <q-input outlined v-model="refForm.id" label="ID"></q-input>
          <q-select
            outlined
            v-model="refForm.subject"
            label="Subject"
          ></q-select>
          <q-select outlined v-model="refForm.skill" label="Skill">
            <template #label></template>
          </q-select>
        </q-card-section>
        <q-card-actions class="justify-end">
          <q-btn flat @click="dialogState = false"> cancel </q-btn>
          <q-btn flat color="positive" @click="dialogState = false"> add</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-card v-if="skillMaps.length <= 0" class="q-pa-lg q-mt-lg">
      <TableSheetJS ref="sheet" text="Skill Mapping" />
    </q-card>
    <!-- {{ sheet?.items }} -->
    <div class="flex flex-center q-mt-lg">
      <q-btn
        v-if="items"
        label="confirm"
        color="primary"
        @click="handleProcess"
      ></q-btn>
    </div>
    <div v-if="nodes">
      <q-tree :nodes="nodes" node-key="label" default-expand-all></q-tree>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import TableSheetJS from 'src/components/TableSheetJS.vue';
import { QTreeNode, useMeta } from 'quasar';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { reactive, ref } from 'vue';
import { SkillService } from 'src/services/skill';
import { SkillCollection, SkillLevel } from 'src/types/skill-collection';
import { groupBy } from 'src/utils/sheet2object';
import PageHeader from 'src/components/PageHeader.vue';

const sheet = ref();
const items = computed(() => sheet.value?.items);
const skillMaps = ref<SkillCollection[]>([]);
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const nodes = ref<QTreeNode[]>([]);
useMeta({
  title: title.value,
});
const dialogState = ref(false);
const search = ref();
const refForm = reactive({
  id: 0,
  subject: '',
  skill: '',
});

const convertToSkill = (items: {
  map: (
    arg0: (
      /// <reference types=".vue-global-types/vue_3.5_false.d.ts" />
      item: {
        Subject_ID: string;
        Skill_ID: string;
        Expected_Level: string;
        Expected_Mean: string;
      }
    ) => object
  ) => SkillCollection[];
}): SkillCollection[] => {
  return items.map((item): SkillCollection => {
    return {
      subject: { id: Number(item.Subject_ID) },
      skill: { id: Number(item.Skill_ID) },
      level: item.Expected_Mean as SkillLevel,
      passed: null,
      score: 0,
    };
  });
};

const convertToNodes = (items: SkillCollection[]): QTreeNode[] => {
  const groupedBySubject = groupBy(items, (items): string =>
    items.subject.id!.toString()
  );

  return Object.entries(groupedBySubject).map(([subject, skillCollect]) => {
    return {
      label: `Subject ID: ${subject}`,
      children: skillCollect.map((item) => ({
        label: `Skill ID: ${item.skill.id}`,
        children: [
          {
            label: `Expected Level: ${item.level}`,
          },
        ],
      })),
    };
  });
};

const handleProcess = () => {
  skillMaps.value = convertToSkill(items.value);
  nodes.value = convertToNodes(skillMaps.value);
  SkillService.mapping(skillMaps.value);
};
</script>
