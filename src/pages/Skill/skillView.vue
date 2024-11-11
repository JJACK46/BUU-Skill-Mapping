<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { useSkillStore } from 'src/stores/skills';
import AddSkillDialog from './Dialog/addSkillDialog.vue';
import AddSubSkillDialog from './Dialog/addSubSkillDialog.vue';
import SkillDetailDialog from './Dialog/skillDetailDialog.vue';
import ConfirmDialog from './Dialog/ConfirmDialog.vue';
import type { PageParams } from 'src/types/pagination';
import { Skill } from 'src/types/skill';
import PageHeader from 'src/components/PageHeader.vue';

const skillStore = useSkillStore();
const loading = ref(false);
const dialogAddVisible = ref(false);
const dialogAddSubVisible = ref(false);
const dialogDetailVisible = ref(false);
const dialogConfirmVisible = ref(false);
const selectedItem = ref<Skill | null>(null);
const pageParams = ref<PageParams>({
  page: 1,
  limit: 10,
  sort: '',
  order: 'ASC',
  search: '',
  columnId: '',
  columnName: '',
});

const skills = computed(() => skillStore.skills || []);

const showDialogAdd = async () => {
  dialogAddVisible.value = true;
};

const closeDialogAdd = () => {
  dialogAddVisible.value = false;
};

const showDialogAddSub = async (item: Skill) => {
  selectedItem.value = item;
  dialogAddSubVisible.value = true;
};

const closeDialogAddSub = () => {
  dialogAddSubVisible.value = false;
};

const showDialogDetail = async (item: Skill) => {
  selectedItem.value = item;
  dialogDetailVisible.value = true;
};

const closeDialogDetail = () => {
  dialogDetailVisible.value = false;
};

const confirmDeleteSkill = async (item: Skill) => {
  selectedItem.value = item;
  dialogConfirmVisible.value = true;
};
const closeDialogDelete = () => {
  dialogConfirmVisible.value = false;
};

const deleteSkillConfirmed = () => {
  skillStore.deleteSkill(selectedItem.value!.id);
  dialogConfirmVisible.value = false;
  fetchSkill();
};

const fetchSkill = async () => {
  loading.value = true;
  skillStore.clearForm();
  try {
    // await skillStore.fetchSkillsPage(pageParams.value);
    await skillStore.fetchSkills();
  } catch (error) {
    console.error('Error fetching skills:', error);
  } finally {
    loading.value = false;
  }
};
watch(
  [
    () => dialogAddVisible.value,
    () => dialogAddSubVisible.value,
    () => dialogDetailVisible.value,
  ],
  () => {
    fetchSkill();
  }
);

onMounted(fetchSkill);
</script>

<template>
  <q-page padding>
    <PageHeader v-model:search-text="pageParams.search" label-search="Curriculums" @open-dialog="showDialogAdd"
      @enter-search="fetchSkill" />
    <q-separator class="q-my-md" />
    <q-card flat bordered>
      <q-tree :nodes="skills" node-key="id">
        <template v-slot:default-header="props">
          <q-tr>
            <q-td style="padding-right: 50px">{{ props.node.name }}</q-td>
            <q-td>
              <q-btn flat round icon="add" @click.stop="showDialogAddSub(props.node)" />
            </q-td>
            <q-td>
              <q-btn flat round icon="edit" @click.stop="showDialogDetail(props.node)" />
            </q-td>
            <q-td>
              <q-btn flat round icon="close" @click.stop="confirmDeleteSkill(props.node)" />
            </q-td>
          </q-tr>
        </template>
      </q-tree>
    </q-card>

    <AddSubSkillDialog :visible="dialogAddSubVisible" :item="selectedItem" @close-dialog="closeDialogAddSub" />
    <SkillDetailDialog :visible="dialogDetailVisible" :item="selectedItem" @close-dialog="closeDialogDetail" />
    <AddSkillDialog :visible="dialogAddVisible" :item="null" @close-dialog="closeDialogAdd" />
    <ConfirmDialog :visible="dialogConfirmVisible" :item="selectedItem" @close-dialog="closeDialogDelete"
      @confirm-delete="deleteSkillConfirmed" />
  </q-page>
</template>
