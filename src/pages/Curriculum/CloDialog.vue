<template>
  <q-card style="max-width: 80%; max-height: 80%">
    <div style="margin: 20px">
      <div class="q-py-md">
        <div class="text-h4 text-primary">{{ t('Clos') }}</div>
      </div>
      <div class="text-h5 text-primary">
        {{ props.subject.code }} - {{ props.subject.engName }}
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
        width="50%"
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
              @clear="clearSkill()"
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
            <q-card>
              <q-card-section>
                <div class="text-h6">{{ selectedSkill.thaiName }}</div>
                <!-- ขยายขนาด -->
                <div class="text-subtitle1">{{ selectedSkill.engName }}</div>
                <q-separator class="q-my-sm" />
                <!-- เส้นคั่น -->
              </q-card-section>
              <q-card-section>
                <q-chip
                  square
                  color="primary"
                  text-color="white"
                  style="
                    border-radius: 12px;
                    padding: 6px 12px;

                    text-align: center;
                  "
                >
                  {{ selectedSkill.domain }}
                </q-chip>
              </q-card-section>
              <q-card-section>
                <div
                  class="text-body1 q-mb-md"
                  style="
                    white-space: pre-line;
                    text-indent: 1.5em;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                  "
                >
                  {{ selectedSkill.thaiDescription }}
                </div>
                <div
                  class="text-body1 q-mb-md"
                  style="
                    white-space: pre-line;
                    text-indent: 1.5em;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                  "
                >
                  {{ selectedSkill.engDescription }}
                </div>
              </q-card-section>
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
              @clear="clearPLO()"
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
            <q-card>
              <q-card-section>
                <div class="text-h6">{{ selectedPlos.name }}</div>
                <!-- ขยายขนาด -->
                <q-separator class="q-my-sm" />
                <!-- เส้นคั่น -->
              </q-card-section>
              <q-card-section>
                <div
                  class="text-body1 q-mb-md"
                  style="
                    white-space: pre-line;
                    text-indent: 1.5em;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                  "
                >
                  {{ selectedPlos.thaiDescription }}
                </div>
                <div
                  class="text-body1 q-mb-md"
                  style="
                    white-space: pre-line;
                    text-indent: 1.5em;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                  "
                >
                  {{ selectedPlos.engDescription }}
                </div>
              </q-card-section>
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
import type { Subject } from 'src/types/subject';
import { usePloStore } from 'src/stores/plo';
import { useSkillStore } from 'src/stores/skill';
import { requireField } from 'src/utils/field-rules';
import type { Clo } from 'src/types/clo';
import type { PLO } from 'src/types/plo';
import type { Skill } from 'src/types/skill';

const props = defineProps<{ currId: number; subject: Subject }>();

const dialogState = defineModel<boolean>();
console.log(dialogState.value);

const { t } = useI18n();
const global = useGlobalStore();
const store = useClostore();
const ploStore = usePloStore();
const skillStore = useSkillStore();
const selectedSkill = computed({
  get: () => store.form.skill ?? null,
  set: (val: Skill) => {
    store.form.skill = val;
  },
});

const selectedPlos = computed({
  get: () => store.form.plo ?? null,
  set: (val: PLO) => {
    store.form.plo = val;
  },
});

const filteredPlos = ref([...ploStore.getListPLO]);
const filteredSkills = ref([...skillStore.getSkills]);

const clearSkill = () => {
  store.form.skill = {} as Skill;
};
const clearPLO = () => {
  store.form.plo = {} as PLO;
};

// const updateFilteredPlos = (val: string, update: (cb: () => void) => void) => {
//   update(() => {
//     if (!val || val.trim() === '') {
//       filteredPlos.value = [...ploStore.getListPLO];
//     } else {
//       filteredPlos.value = ploStore.getListPLO.filter((plo) =>
//         plo.name.toLowerCase().includes(val.toLowerCase()),
//       );
//     }
//   });
// };
const updateFilteredPlos = (val: string, update: (cb: () => void) => void) => {
  update(() => {
    if (!val || val.trim() === '') {
      filteredPlos.value = [...ploStore.getListPLO];
    } else {
      filteredPlos.value = ploStore.getListPLO.filter((plo) =>
        plo.name.toLowerCase().includes(val.toLowerCase()),
      );
    }
  });
};
const updateFilteredSkills = (
  val: string,
  update: (cb: () => void) => void,
) => {
  update(() => {
    if (!val || val.trim() === '') {
      filteredSkills.value = [...skillStore.getSkills];
    } else {
      filteredSkills.value = skillStore.getSkills.filter((skill) =>
        skill.thaiName.toLowerCase().includes(val.toLowerCase()),
      );
    }
  });
};

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

// const filterPlos = (val: string, update: (cb: () => void) => void) => {
//   if (!val.trim()) {
//     update(() => {
//       filteredPlos.value = ploStore.getData; // โหลดข้อมูลจาก plosStore
//       console.log(filteredPlos.value); // ดูข้อมูลที่โหลดมา
//     });
//     return;
//   }

//   const searchVal = val.toLowerCase();
//   update(() => {
//     filteredPlos.value = ploStore.getData.filter(
//       (plo) => plo.name.toLowerCase().includes(searchVal), // กรองข้อมูลตามชื่อ
//     );
//     console.log(filteredPlos.value); // ตรวจสอบผลลัพธ์การกรอง
//   });
// };

// const filterSkills = (val: string, @: (cb: () => void) => void) => {
//   if (!val.trim()) {
//     update(() => {
//       filteredSkills.value = skillStore.skills;
//     });
//     return;
//   }

//   const searchVal = val.toLowerCase();
//   update(() => {
//     filteredSkills.value = skillStore.skills.filter((skill) =>
//       skill.thaiName.toLowerCase().includes(searchVal),
//     );
//   });
// };

const editRow = (row: Clo) => {
  store.form = JSON.parse(JSON.stringify(row)); // คัดลอกข้อมูลจากแถวที่เลือกไปยัง form
  selectedPlos.value = ploStore.getListPLO.find((plo) => plo.id === row.ploId)!;
  selectedSkill.value = skillStore.skills.find(
    (skill) => skill.id === row.skillId,
  )!;
  store.dialogState = true; // เปิด Dialog
};

async function saveClos() {
  await store.handleSave(props.subject.id);
  await store.handleSave(props.subject.id);
  store.dialogState = false; // ปิด Dialog
}
const removeOne = async (rowId: number) => {
  if (confirm('Are you sure you want to delete this CLO?')) {
    await store.removeOne(rowId);
    await store.fetchData(props.subject.id); // เรียกใช้ store เพื่อลบข้อมูล
  }
};
onMounted(async () => {
  await store.fetchData(props.subject.id);
});
</script>

<style scoped></style>
