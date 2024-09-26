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
        <p class="text-h5 q-px-md q-pt-md">New Mapping</p>
        <q-card-section class="q-gutter-md">
          <q-input outlined v-model="refForm.id" label="ID"></q-input>
          <q-select
            outlined
            v-model="refForm.subject"
            label="Subject"
          ></q-select>
          <q-select outlined v-model="refForm.skill" label="Skill"></q-select>
        </q-card-section>
        <q-card-actions class="justify-end">
          <q-btn flat @click="isDialogOpen = false"> cancel </q-btn>
          <q-btn flat color="positive" @click="isDialogOpen = false">
            add</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-dialog>
    <TableSheetJS ref="sheet" />
    <!-- {{ sheet?.items }} -->
    <q-btn v-if="items" label="process" @click="handleProcess"></q-btn>
    {{ skills }}
  </q-page>
</template>

<script lang="ts" setup>
import TableSheetJS from 'src/components/TableSheetJS.vue';
import { useMeta } from 'quasar';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { reactive, ref } from 'vue';
import { ExpectedMean, SkillMapping } from 'src/types/skill_mapping';

const sheet = ref();
const items = computed(() => sheet.value?.items);
const skills = ref<SkillMapping[]>([]);
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
useMeta({
  title: title.value,
});
const isDialogOpen = ref(false);
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
  ) => SkillMapping[];
}): SkillMapping[] => {
  return items.map((item) => {
    return {
      subject: item.Subject_ID,
      skill: item.Skill_ID,
      expectedLevel: item.Expected_Level as unknown as number,
      expectedMean: item.Expected_Mean as ExpectedMean,
    };
  });
};

const handleProcess = () => {
  skills.value = convertToSkill(items.value);
};
</script>
