<template>
  <q-layout view="hHh lpR fFf">
    <AppHeader />
    <!-- Left Drawer -->
    <q-drawer
      v-model="app.leftDrawerOpen"
      show-if-above
      :width="250"
      side="left"
      bordered
    >
      <q-list>
        <q-item-label header> </q-item-label>
        <MenuLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
      <q-space />
      <q-separator class="q-my-sm" />
      <q-list class="flex justify-between q-px-md">
        <div>{{ __APP_VERSION }}</div>
      </q-list>
    </q-drawer>

    <!-- Right Drawer -->
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

    <!-- Main Content View -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { LinkProps } from 'components/MenuLink.vue';
import MenuLink from 'components/MenuLink.vue';
import { __APP_VERSION } from 'src/utils/app';
import { useQuasar } from 'quasar';
import { LocalStorage } from 'quasar';
import { useI18n } from 'vue-i18n';
import AppHeader from 'src/components/AppHeader.vue';
import { useGlobalStore } from 'src/stores/global';

const app = useGlobalStore();
const darkRef = ref(false);

watch(
  () => darkRef.value,
  (val) => {
    dark.set(val);
    LocalStorage.set('theme', val ? 'dark' : 'light');
  },
);
const { t } = useI18n();

const getThemeIcon = computed(() =>
  dark.isActive ? 'dark_mode' : 'light_mode',
);

const { dark } = useQuasar();

defineOptions({
  name: 'MainLayout',
});

const linksList: LinkProps[] = [
  {
    title: 'home',
    icon: 'home',
    link: '/',
  },
  {
    title: 'skills',
    icon: 'code',
    link: '/skills',
  },
  {
    title: 'subjects',
    icon: 'book',
    link: '/subjects',
  },
  {
    title: 'curriculums',
    icon: 'collections_bookmark',
    link: '/curriculums',
  },
  {
    title: 'faculties & branches',
    icon: 'groups',
    link: '/faculties',
  },
  {
    title: 'courses',
    icon: 'play_lesson',
    link: '/courses',
  },
  {
    title: 'user',
    icon: 'manage_accounts',
    link: '/users',
  },
  {
    title: 'instructor',
    icon: 'group',
    link: '/instructors',
  },
  {
    title: 'students',
    icon: 'school',
    link: '/students',
  },
  {
    title: 'about',
    icon: 'info',
    link: '/about',
  },
];
</script>
