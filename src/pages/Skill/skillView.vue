<script setup lang="ts">
import { computed, onMounted } from 'vue';
// import { useSkillStore } from 'src/stores/skills';
// import { Skill } from 'src/types/skill';
import { useSkillStore } from 'src/stores/skill';
import DialogForm from 'src/components/DialogForm.vue';
import { LearningDomain } from 'src/types/learning-domain';
import { requireField } from 'src/utils/field-rules';
import { useMeta } from 'quasar';
import { useRoute } from 'vue-router';
import MainHeader from 'src/components/Header/main-header.vue';

const store = useSkillStore();

onMounted(store.fetchData);

const route = useRoute();
const title = computed(() => route.matched[1].name as string);
useMeta({
  title: title.value,
});

// const skillStore = useSkillStore();
// const loading = ref(false);
// const dialogAddVisible = ref(false);
// const dialogAddSubVisible = ref(false);
// const dialogDetailVisible = ref(false);
// const dialogConfirmVisible = ref(false);
// const selectedItem = ref<Skill | null>(null);
// const skills = computed(() => skillStore.skills || []);

// const showDialogAdd = async () => {
//   dialogAddVisible.value = true;
// };

// const closeDialogAdd = () => {
//   dialogAddVisible.value = false;
// };

// const showDialogAddSub = async (item: Skill) => {
//   selectedItem.value = item;
//   dialogAddSubVisible.value = true;
// };

// const closeDialogAddSub = () => {
//   dialogAddSubVisible.value = false;
// };

// const showDialogDetail = async (item: Skill) => {
//   selectedItem.value = item;
//   dialogDetailVisible.value = true;
// };

// const closeDialogDetail = () => {
//   dialogDetailVisible.value = false;
// };

// const confirmDeleteSkill = async (item: Skill) => {
//   selectedItem.value = item;
//   dialogConfirmVisible.value = true;
// };
// const closeDialogDelete = () => {
//   dialogConfirmVisible.value = false;
// };

// const deleteSkillConfirmed = () => {
//   skillStore.deleteSkill(selectedItem.value!.id);
//   dialogConfirmVisible.value = false;
//   fetchSkill();
// };

// const fetchSkill = async () => {
//   loading.value = true;
//   skillStore.clearForm();
//   try {
//     // await skillStore.fetchSkillsPage(pageParams.value);
//     await skillStore.fetchSkills();
//   } catch (error) {
//     console.error('Error fetching skills:', error);
//   } finally {
//     loading.value = false;
//   }
// };
// watch(
//   [
//     () => dialogAddVisible.value,
//     () => dialogAddSubVisible.value,
//     () => dialogDetailVisible.value,
//   ],
//   () => {
//     fetchSkill();
//   }
// );
</script>

<template>
  <q-page padding>
    <MainHeader
      v-model:search-text="store.pageParams.search"
      label-search="Curriculums"
      @open-dialog="store.toggleDialog({ title: 'New Skill' })"
      @enter-search="store.fetchData"
    />
    <q-separator class="q-my-md" />
    <!-- Top -->
    <div class="q-py-md">
      <q-icon name="info" class="q-mr-sm" />Right click to open menu of each row
    </div>
    <!-- Content -->
    <q-card flat bordered class="q-animate--fade">
      <q-tree :nodes="store.skills" node-key="id" class="q-pa-sm">
        <template v-slot:default-header="props">
          <q-tr class="full-width q-py-xs" style="cursor: pointer">
            <!-- Header -->
            <q-td style="user-select: none">
              <span class="text-body1">
                {{ props.node.name }}
              </span>
            </q-td>
            <!-- Context Menu -->
            <q-menu context-menu touch-position>
              <q-list dense style="min-width: 100px">
                <q-item
                  clickable
                  v-close-popup
                  @click="
                    store.toggleDialog({
                      title: 'Insert Sub-Skill',
                      parentId: props.node.id,
                    })
                  "
                >
                  <q-item-section>Insert child</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  @click="
                    store.toggleDialog({
                      form: props.node,
                      title: 'Edit Skill',
                    })
                  "
                >
                  <q-item-section>Edit</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  @click="store.handleRemove({ id: props.node.id })"
                >
                  <q-item-section>Delete</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>Quit</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-tr>
        </template>
      </q-tree>
    </q-card>
    <!-- All in One Dialog -->
    <DialogForm
      :title="store.getTitleForm"
      @save="store.handleSave"
      v-model="store.dialogForm"
    >
      <template #body>
        <q-input
          v-show="store.parentId"
          v-model="store.parentId"
          label="Parent ID"
          hint="Readonly"
          outlined
          readonly
        />
        <q-input
          v-model="store.form.id"
          label="ID"
          outlined
          readonly
          hint="Readonly"
        />
        <q-input
          v-model="store.form.name"
          label="Name *"
          outlined
          :rules="[requireField]"
        />
        <q-select
          :options="Object.values(LearningDomain)"
          v-model="store.form.domain"
          label="Domain *"
          outlined
          :rules="[requireField]"
        />
        <q-input
          v-model="store.form.description"
          label="Description *"
          outlined
          type="textarea"
          :rules="[requireField]"
        />
      </template>
    </DialogForm>

    <!-- 
    <AddSubSkillDialog :visible="dialogAddSubVisible" :item="selectedItem" @close-dialog="closeDialogAddSub" />
    <SkillDetailDialog :visible="dialogDetailVisible" :item="selectedItem" @close-dialog="closeDialogDetail" />
    <AddSkillDialog :visible="dialogAddVisible" :item="null" @close-dialog="closeDialogAdd" />
    <ConfirmDialog :visible="dialogConfirmVisible" :item="selectedItem" @close-dialog="closeDialogDelete"
      @confirm-delete="deleteSkillConfirmed" /> -->
  </q-page>
</template>
