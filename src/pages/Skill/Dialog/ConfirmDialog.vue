<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue';
import type { Skill } from 'src/types/skill'; // Import type Skill

const props = defineProps<{ visible: boolean; item: Skill | null }>(); // Use Skill instead of any
const localVisible = ref(props.visible);

watch(
  () => props.visible,
  (newVal) => {
    localVisible.value = newVal;
  }
);

const emit = defineEmits(['close-dialog', 'confirm-delete']);

const confirm = () => {
  emit('confirm-delete');
  close();
};

const close = () => {
  emit('close-dialog');
};
</script>

<template>
  <q-dialog v-model="localVisible" max-width="500">
    <q-card>
      <q-card-section>
        <div class="text-h6">Confirm Deletion</div>
      </q-card-section>
      <q-card-section>
        <p>Are you sure you want to delete this skill?</p>
      </q-card-section>
      <q-card-actions>
        <q-btn @click="close" color="grey">Cancel</q-btn>
        <q-btn @click="confirm" color="red">OK</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
