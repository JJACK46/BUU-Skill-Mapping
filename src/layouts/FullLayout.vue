<template>
  <q-layout view="hHh Lpr fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue';
defineComponent({
  name: 'FullLayout',

  setup() {
    const leftDrawer = ref(false);
    return { leftDrawer };
  },
});
</script>
