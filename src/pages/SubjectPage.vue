<template>
  <q-page padding>
    <div class="flex justify-end">
      <q-btn class="q-ml-md">New</q-btn>
    </div>
    <div class="q-mt-md">
      <q-table
        title="Subjects"
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
                <q-input
                  type="textarea"
                  v-model="scope.value"
                  dense
                  autofocus
                />
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
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { mockColumns, mockRows } from 'src/mock/DataTable';
</script>
