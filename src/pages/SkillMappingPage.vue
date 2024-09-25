<template>
  <q-page padding>
    <div class="text-h6">Skill Mapping</div>
    <div class="flex justify-end q-gutter-md">
      <q-btn @click="isDialogOpen = true" color="secondary">Add</q-btn>
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
    <TableSheetJS />
  </q-page>
</template>

<script lang="ts" setup>
import TableSheetJS from 'src/components/TableSheetJS.vue';

import { reactive, ref } from 'vue';
const isDialogOpen = ref(false);

const refForm = reactive({
  id: 0,
  subject: '',
  skill: '',
});
</script>
