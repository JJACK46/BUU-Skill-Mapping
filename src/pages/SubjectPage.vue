<template>
  <q-page padding>
    <div class="text-h6">{{ title }}</div>
    <q-separator class="q-my-md" />
    <div class="flex flex-center q-gutter-sm">
      <q-input
        outlined
        clearable
        v-model="search"
        label="Search"
        class="col"
        dense
      >
        <template #prepend>
          <q-icon name="search"></q-icon>
        </template>
      </q-input>
      <q-space />
      <div>
        <q-btn @click="isDialogOpen = true" color="secondary">Add</q-btn>
      </div>
    </div>

    <q-table
      v-if="filteredSubjects"
      class="q-mt-md main-style-table"
      :rows="filteredSubjects"
      :columns="columns"
      row-key="id"
      wrap-cells
    >
    </q-table>
    {{ subjects }}
  </q-page>
</template>

<script lang="ts" setup>
import { QTableColumn, useMeta } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { SubjectService } from 'src/services/subject';
import { Subject } from 'src/types/subject';

const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const isDialogOpen = ref(false);
const search = ref('');
useMeta({
  title: title.value,
});

const columns: QTableColumn[] = [
  { name: 'name', label: 'Name', field: 'thaiName', align: 'left' },
  { name: 'engname', label: 'Eng Name', field: 'engName', align: 'left' },
  {
    name: 'description',
    label: 'Description',
    field: 'description',
    align: 'left',
  },
  { name: 'type', label: 'Type', field: 'type', align: 'left' },
  { name: 'credit', label: 'Credit', field: 'credit', align: 'left' },
];

const subjects = ref<Subject[]>([]);

const filteredSubjects = computed(() => {
  if (search.value.trim()) {
    return subjects.value.filter((subject) =>
      subject.name.toLowerCase().includes(search.value.toLowerCase())
    );
  }
  return subjects.value;
});

onMounted(async () => {
  subjects.value = await SubjectService.fetchAll();
});
</script>
