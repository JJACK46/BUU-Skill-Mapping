<template>
  <q-item clickable :to="link" active-class="bg-primary text-white text-bold">
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

export interface LinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}

withDefaults(defineProps<LinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
});
</script>
