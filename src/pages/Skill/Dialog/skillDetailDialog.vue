<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useSkillStore } from 'src/stores/skills';
import type { Skill } from 'src/types/skill'; // Import type Skill

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
  <q-dialog
    v-model="localVisible"
    max-width="1000px"
    persistent
    style="height: 100vh; overflow-y: auto"
  >
    <q-card
      class="q-elevation-5"
      rounded="lg"
      style="min-width: 200px; width: 100%; height: 100%"
    >
      <q-card-section>
        <div class="row items-center">
          <q-col cols="11">
            <p style="font-size: 24px">Detail</p>
          </q-col>
          <q-col cols="1">
            <q-btn
              color="primary"
              flat
              icon="close"
              @click="closeDialog"
              class="circular-btn"
            />
          </q-col>
        </div>

        <q-input
          v-model="skills.name"
          label="Name"
          required
          class="q-mt-md"
        ></q-input>

        <q-input
          v-model="skills.description"
          label="Description"
          required
          class="q-mt-md"
        ></q-input>

        <q-select
          v-model="skills.domain"
          label="Skill Type"
          :options="['ความรู้', 'คุณลักษณะบุคคล', 'จริยธรรม', 'ทักษะ']"
          class="q-mt-md"
        ></q-select>
      </q-card-section>

      <q-card-actions>
        <q-btn @click="closeDialog" color="negative" label="Cancel" flat />
        <q-btn @click="saveSkill" color="primary" label="Save" flat />
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
