<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useSkillStore } from 'src/stores/skills';
import { Skill } from 'src/types/skill';
import { LearningDomain } from 'src/types/learning-domain';

const props = defineProps<{ visible: boolean; item: Skill | null }>(); // Use Skill instead of any
const emit = defineEmits(['close-dialog']);
const skillStore = useSkillStore();
const localVisible = ref(props.visible);
const skills = computed(() => skillStore.editedSkill);

watch(
  () => props.visible,
  async (newVal) => {
    localVisible.value = newVal;
    if (props.item) {
      try {
        await skillStore.fetchSkill(props.item.id);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    }
  }
);

function closeDialog() {
  skillStore.clearForm();
  emit('close-dialog');
}

async function saveSkill() {
  let skill = { ...skills.value };
  await skillStore.updateSkill(skill);
  closeDialog();
}
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
              v-model="skills.name"
              label="Name"
              hide-bottom-space
              dense
              outlined
            ></q-input>
          </div>
          <div class="col-4">
            <q-select
              v-model="skills.domain"
              label="Skill Type"
              :options="Object.values(LearningDomain)"
              outlined
              dense
            ></q-select>
          </div>
          <div class="col-12">
            <q-input
              v-model="skills.description"
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
