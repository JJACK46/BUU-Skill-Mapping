<template>
  <q-item clickable :to="link" active-class="text-white text-bold bg-primary">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ t(title) }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
defineOptions({
  name: 'EssentialLink',
});

export interface MenuProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}

withDefaults(defineProps<MenuProps>(), {
  caption: '',
  link: '#',
  icon: '',
});
</script>
