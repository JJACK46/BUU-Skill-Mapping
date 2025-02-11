<template>
  <q-card flat bordered>
    <q-expansion-item
      style="overflow: hidden"
      label="View JSON"
      v-model="expanded"
      :duration="0"
    >
      <div class="flex justify-end q-pa-sm">
        <q-btn
          flat
          padding="xs"
          :icon="alreadyCopied ? 'check' : matContentCopy"
          @click="copyToClipboard"
        >
          <q-tooltip> {{ alreadyCopied ? 'Copied' : 'Copy' }}</q-tooltip>
        </q-btn>
      </div>
      <vue-json-pretty :data="$props.data" class="q-pa-md bg-grey-1" />
    </q-expansion-item>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueJsonPretty from 'vue-json-pretty';
import type { JSONDataType } from 'vue-json-pretty/types/utils';
import { matContentCopy } from '@quasar/extras/material-icons';

const alreadyCopied = ref(false);
const expanded = ref<boolean>(false);

const copyToClipboard = () => {
  navigator.clipboard.writeText(JSON.stringify(props));
  alreadyCopied.value = true;
};

const props = defineProps<{
  data: JSONDataType;
}>();
</script>
