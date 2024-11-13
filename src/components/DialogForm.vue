<template>
  <q-dialog v-model="dialogState" :full-width="fullWidth">
    <q-card class="dialog-form" :style="{ width: width ? width : '500px' }">
      <q-form autofocus>
        <q-card-section>
          <div class="text-h6 ">{{ title }}</div>
          <q-separator class="q-my-md"></q-separator>
          <span class="q-gutter-y-sm">
            <slot name="body" />
          </span>
        </q-card-section>
        <q-card-actions class="justify-end q-pa-md">
          <q-btn flat label="cancel" @click="dialogState = false"></q-btn>
          <q-btn color="primary" unelevated label="save" type="submit" style="width: 80px"
            @click="$emit('save')"></q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  width?: string;
  fullWidth?: true;
}>();
const dialogState = defineModel<boolean>();
defineEmits<{ (e: 'save'): void }>();
</script>
