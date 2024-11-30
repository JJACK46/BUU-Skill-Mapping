<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useSkillStore } from 'src/stores/skill';
import AddSkillDialog from './Dialog/addSkillDialog.vue';
import AddSubSkillDialog from './Dialog/addSubSkillDialog.vue';
import SkillDetailDialog from './Dialog/skillDetailDialog.vue';
import ConfirmDialog from './Dialog/ConfirmDialog.vue';
import { Skill } from 'src/types/skill';
import PageHeader from 'src/components/PageHeader.vue';
import { PageParams } from 'src/types/pagination';

const store = useSkillStore();
const { t } = useI18n();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
onMounted(store.fetchData);
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
    <PageHeader
      v-model:search-text="pageParams.search"
      @open-dialog="dialogState = true"
      @open-filter="handleDialogFilter"
      @enter-search="fetchSkill"
    />
    <q-separator class="q-my-md" />
    <q-card flat bordered>
      <q-tree :nodes="skills" node-key="id" @node-click="onRequest">
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
            <!-- Context Menu -->
            <q-menu context-menu touch-position auto-close>
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
                <q-item clickable>
                  <q-item-section side>
                    <q-icon size="16px" name="close"></q-icon>
                  </q-item-section>
                  <q-item-section>{{ t('quit') }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-tr>
        </template>
      </q-tree>
    </q-card>
    <div class="flex q-my-lg" v-show="store.getMaxPage > 1">
      <q-pagination
        class="q-mx-auto"
        v-model="store.pagination!.page!"
        :max="store.getMaxPage"
        direction-links
      />
    </div>
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
      @close-dialog="closeDialogDelete"
      @confirm-delete="deleteSkillConfirmed"
    />
  </q-page>
</template>

<style lang="scss">
.hover-row:hover {
  color: $secondary;
}
</style>
