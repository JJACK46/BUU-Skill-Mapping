<template>
  <q-page padding>
    <AppHeader landing />
  </q-page>
</template>

<script setup lang="ts">
import AppHeader from 'src/components/AppHeader.vue';

// import { useI18n } from 'vue-i18n';

// const { t } = useI18n();

defineOptions({
  name: 'LandingPage',
});
</script>
