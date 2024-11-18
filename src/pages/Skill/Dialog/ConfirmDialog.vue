<!-- <script setup lang="ts">
import { Skill } from 'src/types/skill';
import { ref, defineEmits, watch } from 'vue';

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
  <q-dialog v-model="localVisible">
    <q-card class="q-pa-md" style="min-width: 500px">
      <q-card-section>
        <div style="font-size: 20px; margin-top: 6px">Confirm Deletion</div>
      </q-card-section>
      <q-card-section>
        <p style="font-size: 16px">
          Are you sure you want to delete this skill?
        </p>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn @click="close" color="grey" style="width: 70px">Cancel</q-btn>
        <q-btn @click="confirm" color="red" style="width: 70px">OK</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template> -->
