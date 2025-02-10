<template>
  <q-page padding>
    <MainHeader
      v-model:search-text="store.search"
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
      <q-tabs v-model="store.tabsModel">
        <!-- <q-tab name="req" label="Required" /> -->
        <!-- <q-tab name="add" label="Skills" /> -->
      </q-tabs>
      <q-tab-panels v-model="store.tabsModel">
        <q-tab-panel name="req" class="q-gutter-y-md">
          <q-input
            v-model="store.form.code"
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
            :options="OptionSubjectType"
            :rules="[requireField]"
          />
          <q-input
            v-model="store.form.thaiName"
            outlined
            dense
            label="Name *"
            :rules="[requireField, onlyThai]"
          />
          <q-input
            v-model="store.form.engName"
            outlined
            dense
            label="Eng Name *"
            :rules="[requireField, onlyEnglish]"
          />
          <q-input
            v-model="store.form.thaiDescription"
            outlined
            dense
            type="textarea"
            label="Description *"
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
        <!-- <q-tab-panel name="add">
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
                  @update:model-value="store.handleDuplicate"
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
                  @click="store.handleRemoveSkill(i)"
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
            @click="store.handleAddSkill"
          />
        </q-tab-panel> -->
      </q-tab-panels>
    </DialogForm>
    <!-- Table -->
    <q-table
      flat
      bordered
      :loading="global.getLoadingState"
      :pagination="store.pagination"
      class="q-mt-md q-animate--fade"
      :rows="store.getSubjects"
      :filter="store.search"
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
      <!-- <template #body-cell-skills="props">
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
      </template> -->
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
import type { QTableColumn } from 'quasar';
import { useMeta } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import DialogForm from 'src/components/DialogForm.vue';
import { useSubjectStore } from 'src/stores/subject';
import { onlyEnglish, onlyThai, requireField } from 'src/utils/field-rules';
import { useGlobalStore } from 'src/stores/global';
import MainHeader from 'src/components/PageHeader.vue';
import { useAuthStore } from 'src/stores/auth';
import { OptionSubjectType } from 'src/data/subject_type';

const global = useGlobalStore();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const store = useSubjectStore();
const formRef = ref();
const formValid = ref<boolean>(false);
const auth = useAuthStore();

// watch(
//   () => store.form.skillExpectedLevels?.length,
//   (newVal) => {
//     if (newVal && newVal > 0) {
//       formValid.value = true;
//     } else {
//       formValid.value = false;
//     }
//   },
// );

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
  if (auth.isAdmin) {
    columns.value.push({
      name: 'actions',
      label: 'Actions',
      field: 'actions',
      align: 'left',
    });
  }
});

useMeta({
  title: title.value,
});
</script>
