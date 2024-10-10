<script setup lang="ts">
import { computed, ref, onMounted, watch, Ref } from 'vue';
import { useSkillStore } from 'src/stores/skills';
import AddSkillDialog from './Dialog/addSkillDialog.vue';
import AddSubSkillDialog from './Dialog/addSubSkillDialog.vue';
import SkillDetailDialog from './Dialog/skillDetailDialog.vue';
import ConfirmDialog from './Dialog/ConfirmDialog.vue';
import type { PageParams } from 'src/types/pagination';
import { Skill } from 'src/types/skill';

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
const closeDialog = (dialog: Ref<boolean>) => {
  dialog.value = false;
};

const deleteSkillConfirmed = async () => {
  if (selectedItem.value) {
    try {
      await skillStore.deleteSkill(selectedItem.value.id);
      fetchSkill();
    } catch (error) {
      console.error('Error deleting skill:', error);
    } finally {
      closeDialog(dialogConfirmVisible);
    }
  }
};

const fetchSkill = async () => {
  loading.value = true;
  skillStore.clearForm();
  try {
    await skillStore.fetchSkillsPage(pageParams.value);
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
    &nbsp;
    <h2 class="text-h6" style="margin-left: 2%; margin-bottom: 2%">ทักษะ</h2>

    <q-spacer />

    <q-row>
      <q-col cols="12" md="7">
        <q-input
          filled
          clearable
          v-model="pageParams.search"
          placeholder="หลักสูตร"
          @keyup.enter="fetchSkill"
          class="q-my-md"
          style="height: 55px; width: 100%; min-width: 300px"
          bottom-slots
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-col>

      <q-col md="3"> </q-col>
      <q-col md="2">
        <q-btn
          color="primary"
          label="ADD NEW"
          icon="add"
          @click="showDialogAdd"
          rounded
          class="full-width"
          style="height: 45px; min-width: 170px"
        />
      </q-col>
    </q-row>

    <q-card flat bordered class="q-my-lg" rounded>
      <q-col cols="12">
        <q-tree :nodes="skills" node-key="id">
          <template v-slot:default-header="props">
            <q-tr>
              <q-td style="padding-right: 50px">{{ props.node.name }}</q-td>
              <q-td>
                <q-btn
                  flat
                  round
                  icon="add"
                  @click.stop="showDialogAddSub(props.node)"
                />
              </q-td>
              <q-td>
                <q-btn
                  flat
                  round
                  icon="edit"
                  @click.stop="showDialogDetail(props.node)"
                />
              </q-td>
              <q-td>
                <q-btn
                  flat
                  round
                  icon="close"
                  @click.stop="confirmDeleteSkill(props.node)"
                />
              </q-td>
            </q-tr>
          </template>
        </q-tree>
      </q-col>
    </q-card>

    <AddSubSkillDialog
      :visible="dialogAddSubVisible"
      :item="selectedItem"
      @close-dialog="closeDialogAddSub"
    />
    <SkillDetailDialog
      :visible="dialogDetailVisible"
      :item="selectedItem"
      @close-dialog="closeDialogDetail"
    />
    <AddSkillDialog
      :visible="dialogAddVisible"
      :item="null"
      @close-dialog="closeDialogAdd"
    />
    <ConfirmDialog
      :visible="dialogConfirmVisible"
      :item="selectedItem"
      @close-dialog="() => (dialogConfirmVisible = false)"
      @confirm-delete="deleteSkillConfirmed"
    />
  </q-page>
</template>
