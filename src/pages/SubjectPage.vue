<template>
  <q-page padding>
    <PageHeader :search-text="search" @open-dialog="dialogState = true" />
    <q-separator class="q-my-md" />

    <q-table
      v-if="filteredSubjects"
      class="q-mt-md"
      :rows="filteredSubjects"
      :columns="columns"
      row-key="id"
      wrap-cells
    >
    </q-table>
  </q-page>
</template>

<script lang="ts" setup>
import { QTableColumn, useMeta } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { SubjectService } from 'src/services/subject';
import { Subject } from 'src/types/subject';
import PageHeader from 'src/components/PageHeader.vue';

const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const dialogState = ref(false);
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
  subjects.value = await SubjectService.getAll();
});
</script>
