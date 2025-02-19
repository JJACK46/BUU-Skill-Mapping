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
    <AppRightDrawer />

    <!-- Main Content View -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import type { MenuProps } from 'components/MenuLink.vue';
import MenuLink from 'components/MenuLink.vue';
import { __APP_VERSION } from 'src/utils/app';
import AppHeader from 'src/components/AppHeader.vue';
import AppRightDrawer from 'src/components/AppRightDrawer.vue';
import { EnumUserRole } from 'src/data/roles';
import AppDrawer from 'src/components/AppLeftDrawer.vue';

defineOptions({
  name: 'InstructorLayout',
});

const linksList: MenuProps[] = [
  {
    title: 'home',
    icon: 'home',
    link: `/${EnumUserRole.COORDINATOR}/dashboard`,
  },
  {
    title: 'curriculums',
    icon: 'collections_bookmark',
    link: `/${EnumUserRole.COORDINATOR}/curriculums`,
  },
  {
    title: 'courses',
    icon: 'play_lesson',
    link: `/${EnumUserRole.COORDINATOR}/courses`,
  },
];
</script>
