<template>
  <q-page padding>
    <MainHeader :search-text="search" @open-dialog="handleAdd" />

    <q-separator class="q-my-md" />
    <div class="q-py-md">
      <q-icon name="info" class="q-mr-sm" />{{
        t('Right click to open menu of each row')
      }}
    </div>
    <q-table
      flat
      bordered
      :loading="global.getLoadingState"
      class="q-mt-md q-animate--fade"
      :rows="store.curriculums"
      :columns="columns"
      row-key="id"
      wrap-cells
      separator="cell"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="degree" :props="props">
            {{ props.row.degree }}
          </q-td>
          <q-td key="period" :props="props">
            {{ props.row.period }} &nbsp; ปี
          </q-td>
          <q-td key="branch" :props="props">
            {{ props.row.branch.name }}
          </q-td>

          <q-menu context-menu touch-position auto-close>
            <q-list dense style="min-width: 100px">
              <q-item
                clickable
                v-close-popup
                @click="store.handleOpenDialog(props.row)"
              >
                <q-item-section>Edit</q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="store.removeCurriculum(props.row.id)"
              >
                <q-item-section>Delete</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section side>
                  <q-icon size="16px" name="close"></q-icon>
                </q-item-section>
                <q-item-section>{{ t('quit') }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-tr>
      </template>
    </q-table>

    <DialogForm
      v-model="store.dialogState"
      :title="store.getDialogTitle"
      @save="store.handleSave"
      @vue:mounted="store.fetchAllCurriculums"
      width="1000px"
    >
      <template #body>
        <q-tabs v-model="store.tabsModel">
          <q-tab name="req" label="Required" />
          <q-tab name="teach" label="teach" />
          <q-tab name="sub" label="sub" />
        </q-tabs>
        <q-tab-panels v-model="store.tabsModel">
          <q-tab-panel name="req" class="q-gutter-y-md">
            <q-input
              dense
              outlined
              v-model="store.form.id"
              :label="t('id') + ' *'"
              :rules="[requireField]"
            />
            <q-input
              dense
              outlined
              v-model="store.form.name"
              :label="t('name') + ' *'"
              :rules="[requireField]"
            >
              <template #label></template>
            </q-input>
            <q-input
              dense
              outlined
              v-model="store.form.engName"
              :label="t('engName') + ' *'"
              :rules="[requireField, onlyAlphabet]"
            />
            <q-input
              dense
              type="textarea"
              outlined
              v-model="store.form.description"
              :label="t('description') + ' *'"
              :rules="[requireField]"
            />
            <q-input
              dense
              outlined
              v-model="store.form.degree"
              :label="t('degree') + ' *'"
              :rules="[requireField]"
            />
            <q-input
              dense
              outlined
              v-model="store.form.engDegree"
              :label="t('engDegree') + ' *'"
              :rules="[requireField]"
            />

            <q-input
              dense
              type="number"
              outlined
              v-model.number="store.form.period"
              :label="t('period') + ' *'"
              :rules="[requireField]"
            >
              <template #before></template>
            </q-input>
            <q-input
              dense
              type="number"
              outlined
              v-model.number="store.form.minimumGrade"
              :label="t('minimumGrade') + ' *'"
              :rules="[requireField]"
            />

            <q-select
              dense
              outlined
              v-model="store.form.branch"
              :options="branchs"
              :label="t('branchs') + ' *'"
              use-chips
              option-label="name"
              @vue:mounted="fetchBranch"
            ></q-select>
          </q-tab-panel>
          <q-tab-panel
            name="teach"
            class="q-gutter-y-md"
            @vue:mounted="fetchInstructors"
          >
            <q-select
              dense
              outlined
              v-model="store.form.coordinators"
              :options="instructors"
              :label="t('instructors') + ' *'"
              use-chips
              option-label="name"
              multiple
              :rules="[requireField]"
            ></q-select>
            <q-card
              v-for="(coordinator, index) in store.form.coordinators"
              :key="index"
              class="q-mb-md shadow-3 rounded-card relative"
            >
              <q-card-section>
                <div class="row items-center">
                  <div>
                    <div class="text-h6 text-primary font-bold">
                      {{ coordinator.position }} - {{ coordinator.name }}
                    </div>
                    <div class="text-subtitle2 text-grey-6">
                      {{ t('branch : ')
                      }}{{ coordinator.branch || 'No branch provided' }}
                    </div>
                  </div>

                  <q-col class="q-ml-auto">
                    <q-card-actions align="right">
                      <q-btn
                        align="right"
                        flat
                        color="negative"
                        icon="close"
                        @click="deleteCoordinator(index)"
                        class="q-py-sm"
                      /> </q-card-actions
                  ></q-col>
                </div>
              </q-card-section>

              <q-card-section>
                <q-separator class="q-mb-md" />
                <div class="text-body1 q-pb-sm">
                  <q-icon name="email" class="q-mr-sm text-primary" />&nbsp;
                  <span class="text-grey-8">
                    {{ t('email : ')
                    }}{{ coordinator.email || 'No email provided' }}
                  </span>
                </div>
                <div class="text-body1">
                  <q-icon name="phone" class="q-mr-sm text-primary" />&nbsp;
                  <span class="text-grey-8">
                    {{ t('tel : ')
                    }}{{ coordinator.tel || 'No phone provided' }}
                  </span>
                </div>
              </q-card-section>
            </q-card>
          </q-tab-panel>
          <q-tab-panel
            name="sub"
            class="q-gutter-y-md"
            @vue:mounted="fetchSubjects"
          >
            <q-select
              dense
              outlined
              v-model="store.form.subjects"
              :options="subjects"
              :label="t('subjects') + ' *'"
              use-chips
              option-label="name"
              multiple
              :rules="[requireField]"
            ></q-select>

            <q-card
              v-for="(subject, index) in store.form.subjects"
              :key="index"
              class="q-mb-md shadow-3 rounded-card relative"
            >
              <q-card-section>
                <div class="row items-center">
                  <div>
                    <div class="text-h6 text-primary font-bold">
                      {{ subject.name }}
                    </div>
                    <div class="text-subtitle2 text-grey-6">
                      {{ t('credit : ')
                      }}{{ subject.credit || 'No credit provided' }}
                    </div>
                  </div>

                  <q-col class="q-ml-auto">
                    <q-card-actions align="right">
                      <q-btn
                        align="right"
                        flat
                        color="negative"
                        icon="close"
                        @click="deleteSubject(index)"
                        class="q-py-sm"
                      /> </q-card-actions
                  ></q-col>
                </div>
              </q-card-section>

              <q-card-section>
                <q-separator class="q-mb-md" />
                <div class="text-body1 q-pb-sm">
                  <div
                    class="text-subtitle2 text-grey-6 row items-center q-gutter-sm"
                  >
                    <div
                      v-for="(item, idx) in subject.skillExpectedLevels"
                      :key="idx"
                    >
                      <q-chip clickable color="primary" text-color="white">
                        {{ item.skill?.name || 'No skill provided' }}
                      </q-chip>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </DialogForm>
  </q-page>
</template>

<script lang="ts" setup>
import DialogForm from 'src/components/DialogForm.vue';
import { QTableColumn, useMeta } from 'quasar';
import MainHeader from 'src/components/Header/main-header.vue';
import { CurriculumService } from 'src/services/curriculums';
import { SubjectService } from 'src/services/subject';
import { BranchService } from 'src/services/branches';
import { useCurriculumStore } from 'src/stores/curriculum';
import { Curriculum } from 'src/types/curriculum';
import { Subject } from 'src/types/subject';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { onlyAlphabet, requireField } from 'src/utils/field-rules';
import { Branch } from 'src/types/branch';
import { useGlobalStore } from 'src/stores/global';
import { InstructorService } from 'src/services/instructor';
import { Instructor } from 'src/types/instructor';
const global = useGlobalStore();
const search = ref();
const route = useRoute();
const router = useRouter();
const title = computed(() => route.matched[1].name as string);
const store = useCurriculumStore();
const curriculums = ref<Curriculum[]>();
const subjects = ref<Subject[]>();
const { t } = useI18n();
const branchs = ref<Branch[]>();
const instructors = ref<Instructor[]>();
const columns = ref<QTableColumn[]>([
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'degree', label: 'Degree', field: 'degree', align: 'left' },
  { name: 'period', label: 'Period', field: 'period', align: 'left' },
  { name: 'branch', label: 'Branch', field: 'branch', align: 'left' },
]);

onMounted(async () => {
  await store.fetchData();
});

const handleAdd = () => {
  router.push({ name: 'New Curriculum' });
  store.resetForm();
};

useMeta({
  title: title.value,
});
onMounted(async () => {
  curriculums.value = (await CurriculumService.getAll({ page: 1 })).data;
  subjects.value = (await SubjectService.getAll()).data;
});

async function fetchBranch() {
  branchs.value = (await BranchService.getAll()).data;
}

async function fetchInstructors() {
  instructors.value = (await InstructorService.getAll()).data;
}

async function fetchSubjects() {
  subjects.value = (await SubjectService.getAll()).data;
}

function deleteCoordinator(index: number) {
  if (store.form.coordinators) {
    store.form.coordinators.splice(index, 1);
  }
}

function deleteSubject(index: number) {
  if (store.form.subjects) {
    store.form.subjects.splice(index, 1);
  }
}
</script>
