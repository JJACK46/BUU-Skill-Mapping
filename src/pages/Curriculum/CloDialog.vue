<template>
  <q-card style="min-width: 70%; min-height: 80%">
    <q-card-section>
      <div class="text-h4 text-primary">CLO Management</div>
      <q-separator class="q-my-sm bg-primary" style="height: 3px"></q-separator>
    </q-card-section>
    <q-card-section class="q-pa-lg bg-grey-2">
      <div class="col-12 text-h6">
        {{ t('subjectCode') }} {{ props.subject.code }}
        <div class="text-body1 q-ml-lg"></div>
      </div>
      <div class="col-12 text-body1">
        {{ props.subject.thaiName }}
      </div>
      <div class="col-12 text-body1">
        {{ props.subject.engName }}
      </div>
    </q-card-section>
    <q-card-section>
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
        :json="store.form"
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
            >
            </q-input>
          </div>
        </div>
        <div class="row justify-between">
          <div class="col-8 q-pa-sm">
            <!-- SKill -->
            <FieldSearcher
              v-model="store.form.skillId"
              :label="t('skills')"
              :func-filter="updateFilteredSkills"
              :func-clear="clearSkill"
              :fetch-options="()=>SkillService.getSkillByCurr(currCode)"
            />
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
            <!-- Skill Card -->
            <q-card flat bordered>
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
          <div class="col q-pa-sm">
            <!-- PLO -->
            <FieldSearcher
              v-model="store.form.ploId"
              label="PLO"
              :func-filter="updateFilteredPlos"
              :fetch-options="ploStore.fetchAll"
              :func-clear="clearPLO"
            />
          </div>
        </div>
        <div v-if="selectedPlos" class="row justify-between q-pb-md">
          <div class="col-12 q-pa-sm">
            <!-- PLO Card -->
            <q-card flat bordered>
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
        <template #body-cell-number="props">
          <q-td>{{ props.rowIndex + 1 }}</q-td>
        </template>
        <template #body-cell-actions="props">
          <ActionsCell
            key="actions"
            :props="props"
            @handle-edit="editRow(props.row)"
            @handle-delete="removeOne(props.row.id)"
          />
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useGlobalStore } from 'src/stores/global';
import { useCloStore } from 'src/stores/clos';
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
import ActionsCell from 'src/components/ActionsCell.vue';
import FieldSearcher from 'src/components/FieldSearcher.vue';
import SkillService from 'src/services/skill';
import { useRoute } from 'vue-router';

const props = defineProps<{ currId: number; subject: Subject; }>();
const route = useRoute()
const currCode = computed(()=>route.params.code as string)

const { t } = useI18n();
const global = useGlobalStore();
const store = useCloStore();
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

const columns: QTableColumn[] = [
  { name: 'number', label: 'No.', field: '', align: 'left' },
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
];

const editRow = (row: Clo) => {
  store.form = JSON.parse(JSON.stringify(row)); // คัดลอกข้อมูลจากแถวที่เลือกไปยัง form
  selectedPlos.value = ploStore.getListPLO.find((plo) => plo.id === row.ploId)!;
  selectedSkill.value = skillStore.skills.find(
    (skill) => skill.id === row.skillId,
  )!;
  store.titleForm = 'Edit CLO';
  store.dialogState = true; // เปิด Dialog
};

async function saveClos() {
  await store.handleSave(props.subject.id);
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
