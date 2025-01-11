<template>
  <q-drawer v-model="app.rightDrawerOpen" :width="250" side="right" bordered>
    <q-list>
      <q-item>
        <q-item-section class="text-capitalize">
          {{ app.currentTab }}
        </q-item-section>
        <q-item-section side>
          <q-btn
            padding="none"
            icon="close"
            flat
            @click="app.toggleRightDrawer()"
          ></q-btn>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item v-show="app.currentTab === 'settings'">
        <q-toggle v-model="darkRef" :icon="getThemeIcon">
          {{ t('darkMode') }}
          <q-badge color="secondary">beta</q-badge>
        </q-toggle>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script lang="ts" setup>
import { LocalStorage, useQuasar } from 'quasar';
import { useGlobalStore } from 'src/stores/global';
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const app = useGlobalStore();
const { dark } = useQuasar();
const darkRef = ref(false);

watch(
  () => dark.isActive,
  (val) => {
    dark.set(val);
    LocalStorage.set('theme', val ? 'dark' : 'light');
  },
);
const { t } = useI18n();

const getThemeIcon = computed(() =>
  dark.isActive ? 'dark_mode' : 'light_mode',
);
</script>
