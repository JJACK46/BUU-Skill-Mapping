<template>
  <q-dialog
    transition-duration="100"
    transition-hide="fade"
    transition-show="fade"
    v-model="dialogState"
    :full-width="fullWidth"
  >
    <q-card
      class="dialog-form"
      :style="{ width: width ? width : '500px', maxWidth: '1920px' }"
    >
      <q-form ref="formRef" @input="validateForm" @vue:mounted="validateForm">
        <q-card-section>
          <div class="text-h6">{{ title }}</div>
          <q-separator class="q-my-sm"></q-separator>
          <span>
            <slot />
          </span>
        </q-card-section>
        <q-card-actions class="justify-end">
          <div v-if="title !== 'View'" class="q-gutter-x-sm">
            <q-btn
              flat
              :label="t('cancel')"
              @click="dialogState = false"
            ></q-btn>
            <q-btn
              :disable="!isFormValid || !formValid"
              color="primary"
              unelevated
              :label="t('save')"
              style="width: 80px"
              @click="handleSave"
            ></q-btn>
          </div>
          <div v-else>
            <q-btn flat :label="t('ok')" @click="dialogState = false"></q-btn>
          </div>
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
