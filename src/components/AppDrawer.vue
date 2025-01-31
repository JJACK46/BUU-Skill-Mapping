<template>
  <q-drawer
    v-model="app.leftDrawerOpen"
    :width="270"
    show-if-above
    side="left"
    bordered
  >
    <slot></slot>
  </q-drawer>
</template>

<script setup lang="ts">
import { useGlobalStore } from 'src/stores/global';

const app = useGlobalStore();
</script>
