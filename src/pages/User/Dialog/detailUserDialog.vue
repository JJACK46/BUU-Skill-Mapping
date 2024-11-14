<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSkillStore } from 'src/stores/skills';
import { LearningDomain } from 'src/types/learning-domain';
import { User } from 'src/types/user';

const props = defineProps<{ visible: boolean; item: User | null }>(); // Use Skill instead of any
const emit = defineEmits(['close-dialog']);
const skillStore = useSkillStore();
const localVisible = ref(props.visible);
const selectedItem = ref<User | null>(props.item);

watch(
  () => props.visible,
  (newVal) => {
    localVisible.value = newVal;
    selectedItem.value = props.item;
  }
);

function closeDialog() {
  skillStore.clearForm();
  emit('close-dialog');
}

async function saveSkill() {}
</script>

<template>
  <q-dialog v-model="localVisible" persistent>
    <q-card class="q-pa-md" style="min-width: 1000px">
      <q-card-section>
        <div class="row justify-between">
          <div>
            <div style="font-size: 20px; margin-top: 6px">Add Sub Skill</div>
          </div>
          <div>
            <q-btn flat round icon="close" @click="closeDialog" />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row justify-between">
          <div class="col-6">
            <q-input
              v-model="selectedItem!.email"
              label="Name"
              hide-bottom-space
              dense
              outlined
            ></q-input>
          </div>
          <div class="col-4">
            <q-select
              v-model="selectedItem!.email"
              label="Skill Type"
              :options="Object.values(LearningDomain)"
              outlined
              dense
            ></q-select>
          </div>
          <div class="col-12">
            <q-input
              v-model="selectedItem!.email"
              type="textarea"
              label="Description"
              hide-bottom-space
              dense
              outlined
              class="q-mt-lg"
            ></q-input>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          @click="closeDialog"
          color="negative"
          label="Cancel"
          flat
          style="width: 70px"
        />
        <q-btn
          @click="saveSkill"
          color="primary"
          label="Save"
          flat
          style="width: 70px"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.circular-btn {
  height: 40px;
  width: 40px;
}
</style>
