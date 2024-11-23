<template>
  <q-page padding>
    <MainHeader
      v-model:search-text="search"
      @open-dialog="store.handleOpenDialog"
      hide-filter
    />
    <q-separator class="q-my-md" />

    <!-- Add & Edit Dialog -->
    <DialogForm
      v-model="store.dialogState"
      :title="store.getDialogTitle"
      @save="store.handleSave"
      ref="formRef"
      v-model:form-valid="formValid"
    >
      <template #body>
        <q-tabs v-model="store.tabsModel">
          <q-tab name="req" label="Required" />
          <q-tab name="add" label="Skills" v-show="formRef.isFormValid" />
        </q-tabs>
        <q-tab-panels v-model="store.tabsModel">
          <q-tab-panel name="req" class="q-gutter-y-md">
            <q-input
              v-model="store.form.id"
              outlined
              dense
              label="ID *"
              mask="########"
              :rules="[requireField]"
            />
            <q-select
              v-model="store.form.type"
              outlined
              dense
              label="Type *"
              :options="Object.values(SubjectType)"
              :rules="[requireField]"
            />
            <q-input
              v-model="store.form.name"
              outlined
              dense
              label="Name *"
              :rules="[requireField]"
            />
            <q-input
              v-model="store.form.engName"
              outlined
              dense
              label="Eng Name *"
              :rules="[requireField]"
            />
            <q-input
              v-model="store.form.description"
              outlined
              dense
              label="Description *"
              autogrow
              :rules="[requireField]"
            />
            <q-input
              v-model="store.form.credit"
              outlined
              dense
              label="Credit *"
              mask="# (#-#-#)"
              :rules="[requireField]"
            />
          </q-tab-panel>
          <q-tab-panel
            v-show="formRef.isFormValid"
            name="add"
            @vue:mounted="store.fetchAllSkills"
          >
            <q-list>
              <q-item
                v-for="(s, i) in store.form.skillExpectedLevels"
                :key="i"
                class="rounded-borders"
              >
                <q-item-section avatar> {{ i + 1 }}. </q-item-section>
                <q-item-section>
                  <q-select
                    label="Skill"
                    dense
                    v-model="s.skill"
                    outlined
                    :options="store.getSkillOptions"
                    @update:model-value="handleDuplicate"
                    option-label="name"
                  ></q-select>
                </q-item-section>
                <q-item-section>
                  <q-select
                    label="Level"
                    dense
                    v-model="s.expectedLevel"
                    outlined
                    :options="[1, 2, 3, 4, 5]"
                  ></q-select>
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    flat
                    round
                    dense
                    icon="close"
                    @click="handleRemoveSkill(i)"
                    onmouseenter="this.style.color='red'"
                    onmouseleave="this.style.color=''"
                  />
                </q-item-section>
              </q-item>
            </q-list>
            <q-btn
              class="q-mx-auto flex"
              icon-right="add"
              dense
              flat
              label="add"
              @click="handleAddSkill"
            />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </DialogForm>
    <!-- Table -->
    <q-table
      :loading="global.getLoadingState"
      :pagination="store.pagination"
      class="q-mt-md q-animate--fade"
      :rows="store.getSubjects"
      :filter="search"
      :columns="columns"
      row-key="id"
      wrap-cells
      separator="cell"
    >
      <template #body-cell-description="props">
        <q-td style="max-width: 300px">
          {{ props.value }}
        </q-td>
      </template>
      <template #body-cell-credit="props">
        <q-td style="min-width: 90px">
          {{ props.value }}
        </q-td>
      </template>
      <template #body-cell-skills="props">
        <q-td>
          <q-btn
            :disable="props.value === undefined || props.value.length === 0"
            icon="info"
            padding="none"
            flat
          >
            <q-popup-proxy
              :cover="false"
              anchor="top right"
              style="width: 400px"
            >
              <q-toolbar>
                <q-toolbar-title>Skills View</q-toolbar-title>
                <q-btn icon="close" flat padding="none" v-close-popup />
              </q-toolbar>
              <q-separator></q-separator>
              <q-list>
                <q-item v-for="(s, i) in props.value" :key="s.skill?.id">
                  <q-item-section
                    >{{ i + 1 }}. {{ s.skill?.name }}</q-item-section
                  >
                  <q-item-section
                    >Expected Level: {{ s.expectedLevel }}</q-item-section
                  >
                </q-item>
              </q-list>
            </q-popup-proxy>
          </q-btn>
        </q-td>
      </template>
      <template #body-cell-actions="props">
        <q-td class="q-gutter-x-sm" style="min-width: 100px">
          <q-btn
            icon="edit"
            padding="none"
            flat
            @click="store.handleOpenDialog(props.row)"
          ></q-btn>
          <q-btn
            icon="delete"
            padding="none"
            flat
            @click="store.removeSubject(props.row.id)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts" setup>
import { QTableColumn, useMeta } from 'quasar';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import DialogForm from 'src/components/DialogForm.vue';
import { useSubjectStore } from 'src/stores/subject';
import { requireField } from 'src/utils/field-rules';
import { SubjectType } from 'src/types/subject';
import { useGlobalStore } from 'src/stores/global';
import MainHeader from 'src/components/Header/main-header.vue';

const global = useGlobalStore();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const search = ref('');
const store = useSubjectStore();
const formRef = ref();
const formValid = ref<boolean>(false);

watch(
  () => store.form.skillExpectedLevels?.length,
  (newVal) => {
    if (newVal && newVal > 0) {
      formValid.value = true;
    } else {
      formValid.value = false;
    }
  }
);

watch(
  () => store.editMode,
  (newVal) => {
    if (newVal) {
      columns.value.push({
        name: 'actions',
        label: 'Actions',
        field: 'actions',
        align: 'center',
      });
    } else {
      columns.value.pop();
    }
  }
);

function handleAddSkill() {
  store.form.skillExpectedLevels = store.form.skillExpectedLevels || [];
  store.form.skillExpectedLevels.push({
    subject: { id: store.form.id }, //at least subject id is required
    expectedLevel: 1,
  });
}

function handleRemoveSkill(index: number) {
  store.form.skillExpectedLevels?.splice(index, 1);
}

function handleDuplicate() {
  if (!store.form.skillExpectedLevels?.length) return;

  const ids = new Set();
  const newSkills = store.form.skillExpectedLevels.filter((s) => {
    const isDupe = ids.has(s.skill?.id);
    ids.add(s.skill?.id);
    return !isDupe;
  });

  store.form.skillExpectedLevels = newSkills;
}

const columns = ref<QTableColumn[]>([
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'engName', label: 'Eng Name', field: 'engName', align: 'left' },
  {
    name: 'description',
    label: 'Description',
    field: 'description',
    align: 'left',
  },
  { name: 'type', label: 'Type', field: 'type', align: 'left' },
  { name: 'credit', label: 'Credit', field: 'credit', align: 'left' },
  {
    name: 'skills',
    label: 'Skills',
    field: 'skillExpectedLevels',
    align: 'left',
  },
]);

onMounted(async () => {
  await store.fetchData();
});

useMeta({
  title: title.value,
});
</script>
