<template>
  <q-card>
    <div class="q-py-md">
      <div class="text-h4 text-primary">CLOS</div>
    </div>
    <div>
      {{ props }}
    </div>
    <MainHeader
      v-model:search-text="store.search"
      @open-dialog="store.handleOpenDialog"
      hide-filter
    />
    <DialogForm
      v-model="store.dialogState"
      :title="store.getDialogTitle"
      ref="formRef"
    >
      <template #body>
        <div class="row justify-between">
          <div class="col-6">
            <q-input
              v-model="store.form.name"
              outlined
              dense
              :label="t('Name')"
            />
          </div>
          <div class="col-5">
            <!-- <q-select
              v-model="store.form.expectedLevel"
              :options="[1, 2, 3, 4, 5]"
              outlined
              dense
              :label="t('Expected Level')"
              behavior="menu"
            >
            </q-select> -->
          </div>
        </div>
        <div class="row justify-between">
          <div class="col-6">
            <q-input
              v-model="selectedPloNames"
              outlined
              dense
              :label="t('PLO')"
            />
          </div>
          <div class="col-5">
            <q-input
              v-model="searchPlos"
              outlined
              clearable
              :label="t('search')"
              class="col rounded-borders"
              dense
              debounce="500"
            />
          </div>
        </div>
        <div class="row justify-between">
          <div class="col-6">
            <div class="q-mt-md">
              <q-chip
                v-for="(skill, index) in selectedSkills"
                :key="index"
                removable
                @remove="removeSkill(skill)"
                class="q-mr-sm"
              >
                {{ skill.thaiName }}
              </q-chip>
            </div>
          </div>
          <div class="col-5">
            <q-select
              v-model="selectedSkills"
              :options="filteredSkills"
              outlined
              dense
              multiple
              use-input
              hide-selected
              fill-input
              input-debounce="300"
              @filter="filterSkills"
              :label="t('Search Skill')"
              option-value="id"
              option-label="name"
              clearable
              behavior="menu"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-select>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-input
              v-model="store.form.thaiDescription"
              dense
              type="textarea"
              outlined
              :label="t('description') + ' *'"
            />
          </div>
        </div>
      </template>
    </DialogForm>
    <q-table
      flat
      bordered
      :loading="global.getLoadingState"
      class="q-mt-md q-animate--fade"
      :rows="rows"
      :columns="columns"
      row-key="id"
      wrap-cells
      separator="cell"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>{{ props.rowIndex + 1 }}</q-td>
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="name" :props="props" width="400px">{{
            props.row.name
          }}</q-td>
          <q-td key="description" :props="props">{{
            props.row.description
          }}</q-td>
          <q-td>
            <q-btn
              flat
              dense
              round
              color="primary"
              icon="edit"
              @click="editRow(props.row)"
            />
            <q-btn
              flat
              dense
              round
              color="negative"
              icon="delete"
              class="q-ml-sm"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-card>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useGlobalStore } from 'src/stores/global';
import { useClostore } from 'src/stores/clos';
import { useSkillStore } from 'src/stores/skill';
import type { QTableColumn } from 'quasar';
import type { Skill } from 'src/types/skill';
import DialogForm from 'src/components/DialogForm.vue';
import MainHeader from 'src/components/PageHeader.vue';
import type { Subject } from 'src/types/subject';

const props = defineProps<{
  currId: number;
  subject: Subject;
}>();

const dialogState = defineModel<boolean>();
console.log(dialogState.value);

const { t } = useI18n();
const global = useGlobalStore();
const store = useClostore();
const skillStore = useSkillStore();

const searchPlos = ref('');
const selectedRow = ref(null);
const selectedSkills = ref<Skill[]>([]);
const filteredSkills = ref([...skillStore.skills]);
const columns = ref<QTableColumn[]>([
  { name: 'no', label: 'No.', field: 'no', align: 'left' },
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  {
    name: 'description',
    label: 'Description',
    field: 'description',
    align: 'left',
  },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'left' },
]);

const rows = ref([
  {
    id: 1,
    name: 'CLOs 1',
    description: 'description 1',
    expectedLevel: 2,
    plos: [
      { name: 'PLO 1', id: 1, description: 'desc 1' },
      { name: 'PLO 2', id: 2, description: 'desc 2' },
    ],
    skills: [
      { name: 'Skill1', id: 1, description: 'desc 1' },
      { name: 'Skill2', id: 2, description: 'desc 2' },
    ],
  },
  {
    id: 2,
    name: 'CLOs 2',
    description: 'description 2',
    expectedLevel: 3,
    plos: [{ name: 'PLO 3', id: 3, description: 'desc 3' }],
    skills: [{ name: 'Skill3', id: 3, description: 'desc 3' }],
  },
]);

const selectedPloNames = computed(() =>
  selectedRow.value ? selectedRow.value.plos.map((p) => p.name).join(', ') : '',
);

// const filterSkills = (val, update) => {
//   update(() => {
//     filteredSkills.value = val
//       ? skillStore.skills.filter((skill) =>
//           skill.name.toLowerCase().includes(val.toLowerCase()),
//         )
//       : [...skillStore.skills];
//   });
// };
const filterSkills = (val: string, update: (cb: () => void) => void) => {
  if (!val.trim()) {
    update(() => {
      filteredSkills.value = skillStore.skills;
    });
    return;
  }

  const searchVal = val.toLowerCase();
  update(() => {
    filteredSkills.value = skillStore.skills.filter((skill) =>
      skill.thaiName.toLowerCase().includes(searchVal),
    );
  });
};
const removeSkill = (skill) => {
  selectedSkills.value = selectedSkills.value.filter((s) => s.id !== skill.id);
};

const editRow = (row) => {
  selectedRow.value = { ...row };
  store.dialogState = true;
};
</script>

<style scoped></style>
