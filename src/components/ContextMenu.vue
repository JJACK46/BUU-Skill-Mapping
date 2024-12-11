<template>
  <q-menu context-menu touch-position auto-close>
    <q-list dense style="min-width: 100px">
      <q-item clickable @click="createFn!()" v-if="createFn">
        <q-item-section side>
          <q-icon size="16px" :name="customCreate?.icon || 'add'"></q-icon>
        </q-item-section>
        <q-item-section>{{ customCreate?.label || t('add') }}</q-item-section>
      </q-item>
      <q-item clickable @click="editFn()">
        <q-item-section side>
          <q-icon size="16px" name="edit"></q-icon>
        </q-item-section>
        <q-item-section>{{ t('edit') }}</q-item-section>
      </q-item>
      <q-item clickable @click="deleteFn()">
        <q-item-section side>
          <q-icon size="16px" name="delete"></q-icon>
        </q-item-section>
        <q-item-section>{{ t('delete') }}</q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section side>
          <q-icon size="16px" name="close"></q-icon>
        </q-item-section>
        <q-item-section>{{ t('quit') }}</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface CustomCreate {
  label: string;
  icon: string;
}

defineProps<{
  createFn?: () => void;
  editFn: () => void;
  deleteFn: () => void;
  customCreate?: CustomCreate;
}>();
</script>
