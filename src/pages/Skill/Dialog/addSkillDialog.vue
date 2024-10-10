<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useSkillStore } from 'src/stores/skills';

const props = defineProps<{ visible: boolean; item: unknown | null }>();
const emit = defineEmits(['close-dialog']);
const skillStore = useSkillStore();
const localVisible = ref(props.visible);
const skills = computed(() => skillStore.editedSkill);

watch(
  () => props.visible,
  (newVal) => {
    localVisible.value = newVal;
  }
);

function closeDialog() {
  skillStore.clearForm();
  emit('close-dialog');
}

async function saveSkill() {
  let skill = { ...skills.value };
  const payload: { name: string; description: string; domain: string } = {
    name: skill.name,
    description: skill.description,
    domain: skill.domain,
  };
  console.log(payload);
  await skillStore.addSkill(payload);
  closeDialog();
}
</script>

<template>
  <q-dialog v-model="localVisible" persistent>
    <q-card class="q-pa-md" style="min-width: 350px">
      <q-card-section>
        <div class="row items-center q-pb-md">
          <q-col cols="11">
            <p style="font-size: 20px">Add New Skill</p>
          </q-col>
          <q-col cols="1" align="right">
            <q-btn flat round icon="close" @click="closeDialog" />
          </q-col>
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="skills.name"
          label="Name"
          maxlength="10"
          hide-bottom-space
          dense
          outlined
        ></q-input>

        <q-input
          v-model="skills.description"
          label="Description"
          maxlength="10"
          hide-bottom-space
          dense
          outlined
          class="q-mt-md"
        ></q-input>

        <q-select
          v-model="skills.domain"
          label="Skill Type"
          :options="['ความรู้', 'คุณลักษณะบุคคล', 'จริยธรรม', 'ทักษะ']"
          outlined
          dense
          class="q-mt-md"
        ></q-select>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="negative" @click="closeDialog" />
        <q-btn flat label="Save" color="primary" @click="saveSkill" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
