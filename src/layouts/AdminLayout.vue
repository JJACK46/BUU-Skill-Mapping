<template>
  <q-layout view="hHh lpR fFf">
    <AppHeader />
    <!-- Left Drawer -->
    <AppDrawer>
      <q-list>
        <q-item-label header> </q-item-label>
        <MenuLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
      <q-space />
      <q-separator class="q-my-sm" />
      <q-list class="flex justify-between q-px-md">
        <div>{{ __APP_VERSION }}</div>
      </q-list>
    </AppDrawer>

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
import type { MenuProps } from 'components/MenuLink.vue';
import MenuLink from 'components/MenuLink.vue';
import { __APP_VERSION } from 'src/utils/app';
import { useQuasar } from 'quasar';
import { LocalStorage } from 'quasar';
import { useI18n } from 'vue-i18n';
import AppHeader from 'src/components/AppHeader.vue';
import { useGlobalStore } from 'src/stores/global';
import { EnumUserRole } from 'src/enums/roles';
import AppDrawer from 'src/components/AppLeftDrawer.vue';

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
  name: 'AdminLayout',
});

const linksList: MenuProps[] = [
  {
    title: 'dashboard',
    icon: 'home',
    link: `/${EnumUserRole.ADMIN}/dashboard`,
  },
  {
    title: 'skills',
    icon: 'code',
    link: `/${EnumUserRole.ADMIN}/skills`,
  },
  {
    title: 'subjects',
    icon: 'book',
    link: `/${EnumUserRole.ADMIN}/subjects`,
  },
  {
    title: 'curriculums',
    icon: 'collections_bookmark',
    link: `/${EnumUserRole.ADMIN}/curriculums`,
  },
  {
    title: 'faculties & branches',
    icon: 'groups',
    link: `/${EnumUserRole.ADMIN}/faculties`,
  },
  {
    title: 'courses',
    icon: 'play_lesson',
    link: `/${EnumUserRole.ADMIN}/courses`,
  },
  {
    title: 'users',
    icon: 'manage_accounts',
    link: `/${EnumUserRole.ADMIN}/users`,
  },
  {
    title: 'instructor',
    icon: 'group',
    link: `/${EnumUserRole.ADMIN}/instructors`,
  },
  {
    title: 'students',
    icon: 'school',
    link: `/${EnumUserRole.ADMIN}/students`,
  },
  {
    title: 'about',
    icon: 'info',
    link: '/about',
  },
];
</script>
