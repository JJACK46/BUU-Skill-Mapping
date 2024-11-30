<template>
  <q-dialog v-model="dialogState" :full-width="fullWidth">
    <q-card class="dialog-form" :style="{ width: width ? width : '500px' }">
      <q-form ref="formRef" @input="validateForm">
        <q-card-section>
          <div class="text-h6">{{ title }}</div>
          <q-separator class="q-my-md"></q-separator>
          <span class="q-gutter-y-sm">
            <slot name="body" />
          </span>
        </q-card-section>
        <q-card-actions class="justify-end q-pa-md">
          <q-btn flat :label="t('cancel')" @click="dialogState = false"></q-btn>
          <q-btn
            :disable="!isFormValid || !formValid"
            color="primary"
            unelevated
            :label="t('save')"
            style="width: 80px"
            @click="handleSave"
          ></q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { QForm } from 'quasar';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
// Props
defineProps<{
  title: string;
  width?: string;
  fullWidth?: boolean;
}>();

// Emits
const emits = defineEmits<{ (e: 'save'): void }>();

// State
const dialogState = defineModel<boolean>();
const formRef = ref<InstanceType<typeof QForm>>();
const isFormValid = ref(false);

//Expose
defineExpose({
  isFormValid,
});

//Models
defineModel<boolean>('formValid', { default: true });

// Methods
const validateForm = async () => {
  if (formRef.value) {
    isFormValid.value = await formRef.value.validate(false);
  }
};

const handleSave = () => {
  if (isFormValid.value) {
    emits('save');
  }
};

// Watchers
watch(dialogState, (newValue) => {
  if (!newValue) {
    isFormValid.value = false; // Reset validation when dialog closes
  }
});
</script>
