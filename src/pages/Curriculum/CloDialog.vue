<template>
  <q-card style="max-width: 80%; max-height: 80%">
    <div style="margin: 20px">
      <div class="q-py-md">
        <div class="text-h4 text-primary">{{ t('Clos') }}</div>
      </div>
      <div class="text-h5 text-primary">
        {{ props.subject.subject.code }} - {{ props.subject.subject.engName }}
      </div>
      <div></div>
      <MainHeader
        v-model:search-text="store.search"
        @open-dialog="store.handleOpenDialog"
        hide-filter
      />
      <DialogForm
        v-model="store.dialogState"
        :title="store.titleForm"
        ref="formRef"
        width="40%"
        @save="saveClos()"
      >
        <div class="row justify-between">
          <div class="col-12 q-pa-sm">
            <q-input
              v-model="store.form.name"
              outlined
              dense
              :label="t('Name')"
              :rules="[requireField]"
            />
          </div>
        </div>
        <div class="row justify-between">
          <div class="col-8 q-pa-sm">
            <q-select
              v-model="selectedSkill"
              :options="filteredSkills"
              outlined
              dense
              use-input
              hide-selected
              fill-input
              input-debounce="300"
              @filter="updateFilteredSkills"
              :label="t('Search Skill')"
              option-value="id"
              option-label="thaiName"
              clearable
              @clear="store.form.skill = null"
              behavior="menu"
              :rules="[requireField]"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-select>
          </div>
          <div class="col-4 q-pa-sm">
            <q-select
              v-model="store.form.expectedLevel"
              :options="[1, 2, 3, 4, 5]"
              outlined
              dense
              :label="t('Expected Level')"
              behavior="menu"
              :rules="[requireField]"
            >
            </q-select>
          </div>
        </div>

        <div v-if="selectedSkill" class="row justify-between q-pb-md">
          <div class="col-12 q-pa-sm">
            <q-card class="q-pa-sm">
              <div>
                {{ selectedSkill.thaiName }} - {{ selectedSkill.domain }}
              </div>
              <div>
                {{ selectedSkill.thaiDescription || '-' }}
              </div>
            </q-card>
          </div>
        </div>
        <div class="row justify-between">
          <div class="col-8 q-pa-sm">
            <q-select
              v-model="selectedPlos"
              :options="filteredPlos"
              outlined
              dense
              use-input
              hide-selected
              fill-input
              input-debounce="300"
              @filter="updateFilteredPlos"
              :label="t('Search PLO')"
              option-value="id"
              option-label="name"
              clearable
              @clear="store.form.plo = null"
              behavior="menu"
              :rules="[requireField]"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-select>
          </div>
        </div>

        <div v-if="selectedPlos" class="row justify-between q-pb-md">
          <div class="col-12 q-pa-sm">
            <q-card class="q-pa-sm"
              ><div>{{ selectedPlos.name }}</div>
              <div>
                {{ selectedPlos.description || '-' }}
              </div>
            </q-card>
          </div>
        </div>
        <div class="row justify-between">
          <div class="col-12 q-pa-sm">
            <q-input
              v-model="store.form.thaiDescription"
              dense
              type="textarea"
              outlined
              :label="t('thaiDescription') + ' *'"
              :rules="[requireField]"
            />
          </div>
        </div>
        <div class="row justify-between">
          <div class="col-12 q-pa-sm">
            <q-input
              v-model="store.form.engDescription"
              dense
              type="textarea"
              outlined
              :label="t('engDescription') + ' *'"
              :rules="[requireField]"
            />
          </div>
        </div>
      </DialogForm>
      <q-table
        flat
        bordered
        :loading="global.getLoadingState"
        class="q-mt-md q-animate--fade"
        :rows="store.getData"
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
            <q-td key="thaiDescription" :props="props">{{
              props.row.thaiDescription
            }}</q-td>
            <q-td key="engDescription" :props="props">{{
              props.row.engDescription
            }}</q-td>
            <q-td key="actions" :props="props">
              <q-btn flat dense round icon="edit" @click="editRow(props.row)" />
              <q-btn
                flat
                dense
                round
                icon="delete"
                class="q-ml-sm"
                @click="removeOne(props.row.id)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-card>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useGlobalStore } from 'src/stores/global';
import { useClostore } from 'src/stores/clos';
import type { QTableColumn } from 'quasar';
import DialogForm from 'src/components/DialogForm.vue';
import MainHeader from 'src/components/PageHeader.vue';
import type { PLO } from 'src/types/plo';
import type { CourseSpec } from 'src/types/course-spec';
import { usePloStore } from 'src/stores/plo';

const props = defineProps<{
  currId: number;
  subject: CourseSpec;
}>();

const dialogState = defineModel<boolean>();
console.log(dialogState.value);

const { t } = useI18n();
const global = useGlobalStore();
const store = useClostore();
const skillStore = useSkillStore();
const plosStore = usePloStore();
const selectedPlos = ref<PLO | null>(null);
const selectedSkill = ref<Skill | null>(null);
const filteredPlos = ref([...plosStore.getListPlo]);
const filteredSkills = ref([...skillStore.skills]);
const columns = ref<QTableColumn[]>([
  { name: 'no', label: 'No.', field: 'no', align: 'left' },
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  {
    name: 'thaiDescription',
    label: 'Thai Description',
    field: 'thaiDescription',
    align: 'left',
  },
  {
    name: 'engDescription',
    label: 'Eng Description',
    field: 'engDescription',
    align: 'left',
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'left',
    sortable: false,
  },
]);

const filterPlos = (val: string, update: (cb: () => void) => void) => {
  if (!val.trim()) {
    update(() => {
      filteredPlos.value = plosStore.getListPlo; // โหลดข้อมูลจาก plosStore
      console.log(filteredPlos.value); // ดูข้อมูลที่โหลดมา
    });
    return;
  }

  const searchVal = val.toLowerCase();
  update(() => {
    filteredPlos.value = plosStore.getListPlo.filter(
      (plo) => plo.name.toLowerCase().includes(searchVal), // กรองข้อมูลตามชื่อ
    );
    console.log(filteredPlos.value); // ตรวจสอบผลลัพธ์การกรอง
  });
};

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

const editRow = (row) => {
  store.form = { ...row }; // คัดลอกข้อมูลจากแถวที่เลือกไปยัง form
  selectedPlos.value =
    plosStore.getListPlo.find((plo) => plo.id === row.ploId) || null;
  selectedSkill.value =
    skillStore.skills.find((skill) => skill.id === row.skillId) || null;
  store.dialogState = true; // เปิด Dialog
};

function saveClos() {
  store.handleSave(props.subject.id);
  store.dialogState = false; // ปิด Dialog
}
const removeOne = (rowId: number) => {
  if (confirm('Are you sure you want to delete this CLO?')) {
    store.removeOne(rowId);
    store.fetchDataByCoursSpec(props.subject.id); // เรียกใช้ store เพื่อลบข้อมูล
  }
};
onMounted(() => {
  store.fetchDataByCoursSpec(props.subject.id);
});
</script>

<style scoped></style>
