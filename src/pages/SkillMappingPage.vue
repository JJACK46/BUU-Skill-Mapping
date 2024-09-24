<template>
  <q-page padding>
    <div class="text-h6">Skill Mapping</div>
    <div class="flex justify-end q-gutter-md">
      <p class="q-mr-md">import file format: .csv, .xlsx</p>
      <q-btn color="primary" label="Import" />
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
    <q-table
      class="q-mt-md"
      title="Skill Mapping"
      :rows="mockRows"
      :columns="mockColumns"
      row-key="name"
      style="height: calc(100vh - 180px)"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
            <q-popup-edit v-model="props.row.name" v-slot="scope">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="calories" :props="props">
            {{ props.row.calories }}
            <q-popup-edit
              v-model="props.row.calories"
              title="Update calories"
              buttons
              v-slot="scope"
            >
              <q-input type="number" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="fat" :props="props">
            <div class="text-pre-wrap">{{ props.row.fat }}</div>
            <q-popup-edit v-model="props.row.fat" v-slot="scope">
              <q-input type="textarea" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="carbs" :props="props">
            {{ props.row.carbs }}
            <q-popup-edit
              v-model="props.row.carbs"
              title="Update carbs"
              buttons
              persistent
              v-slot="scope"
            >
              <q-input
                type="number"
                v-model="scope.value"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="protein" :props="props">{{ props.row.protein }}</q-td>
          <q-td key="sodium" :props="props">{{ props.row.sodium }}</q-td>
          <q-td key="calcium" :props="props">{{ props.row.calcium }}</q-td>
          <q-td key="iron" :props="props">{{ props.row.iron }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts" setup>
import { mockColumns, mockRows } from 'src/mock/DataTable';
import { reactive, ref } from 'vue';
const isDialogOpen = ref(false);

const refForm = reactive({
  id: 0,
  subject: '',
  skill: '',
});
</script>
