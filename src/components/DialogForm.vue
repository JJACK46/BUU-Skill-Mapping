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
      :style="{ width: width ? width : '500px', maxWidth: '100vw' }"
    >
      <q-form ref="formRef" @input="validateForm">
        <q-card-section>
          <div class="row">
            <div class="col text-h6 text-weight-medium">{{ title }}</div>
            <q-btn
              v-if="json"
              flat
              padding="none"
              class="q-mr-sm text-primary text-caption"
              label="JSON"
              @click="toggleJSONview"
            />
            <q-btn
              fab-mini
              flat
              padding="none"
              icon="close"
              @click="dialogState = false"
            ></q-btn>
          </div>
          <q-separator
            class="q-my-sm bg-primary"
            style="height: 3px"
          ></q-separator>
          <div class="q-py-sm">
            <slot />
          </div>
        </q-card-section>
        <q-card-actions class="q-ma-sm">
          <div v-if="title !== 'View'" class="full-width">
            <q-btn
              :disable="!isFormValid || !formValid"
              color="primary"
              unelevated
              class="full-width"
              :label="t(ctaText || 'save')"
              @click="handleSave"
            />
          </div>
          <div v-else>
            <q-btn
              class="full-width"
              flat
              :label="t('ok')"
              @click="dialogState = false"
            ></q-btn>
          </div>
        </q-card-actions>
      </q-form>
    </q-card>
    <q-dialog v-model="isJSONview">
      <q-card style="width: 50%">
        <q-card-section class="flex justify-end">
          <q-btn icon="close" padding="none" flat @click="isJSONview = false" />
        </q-card-section>
        <q-card-section class="bg-grey-1" v-if="json">
          <vue-json-pretty :data="json" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-dialog>
</template>

<script lang="ts" setup>
import { QForm } from 'quasar';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import type { JSONDataType } from 'vue-json-pretty/types/utils';
import VueJsonPretty from 'vue-json-pretty';

const { t } = useI18n();
// Props
defineProps<{
  title: string;
  width?: string;
  fullWidth?: boolean;
  ctaText?: string;
  json?: JSONDataType;
}>();

const isJSONview = ref(false);

const toggleJSONview = () => {
  isJSONview.value = !isJSONview.value;
};

// Emits
const emits = defineEmits<{ (e: 'save'): void }>();

// State
const dialogState = defineModel<boolean>({ default: false });
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

const handleSave = async () => {
  await validateForm()
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
