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
    <AppRightDrawer />

    <!-- Main Content View -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import type { LinkProps } from 'components/MenuLink.vue';
import MenuLink from 'components/MenuLink.vue';
import { __APP_VERSION } from 'src/utils/app';
import AppHeader from 'src/components/AppHeader.vue';
import { useGlobalStore } from 'src/stores/global';
import AppRightDrawer from 'src/components/AppRightDrawer.vue';

const app = useGlobalStore();

defineOptions({
  name: 'InstructorLayout',
});

const linksList: LinkProps[] = [
  {
    title: 'home',
    icon: 'home',
    link: '/',
  },
  {
    title: 'curriculums',
    icon: 'collections_bookmark',
    link: '/curriculums',
  },
  {
    title: 'courses',
    icon: 'play_lesson',
    link: '/courses',
  },
  {
    title: 'about',
    icon: 'info',
    link: '/about',
  },
];
</script>
