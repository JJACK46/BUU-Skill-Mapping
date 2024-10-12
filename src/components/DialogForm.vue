<template>
  <q-dialog v-model="dialogState">
    <q-card class="dialog-form" style="width: 500px">
      <q-form autofocus>
        <q-card-section>
          <div class="text-h6 q-mb-md">{{ title }}</div>
          <span class="q-gutter-y-sm">
            <slot name="body" />
          </span>
        </q-card-section>
        <q-card-actions class="justify-end q-pa-md">
          <q-btn flat label="cancel" @click="dialogState = false"></q-btn>
          <q-btn
            color="primary"
            unelevated
            label="save"
            type="submit"
            style="width: 80px"
            @click="$emit('save')"
          ></q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
}>();
const dialogState = defineModel<boolean>();
defineEmits<{ (e: 'save'): void }>();
</script>
