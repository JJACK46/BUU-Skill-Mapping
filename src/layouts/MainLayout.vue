<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Skill Mapping App </q-toolbar-title>

        <q-avatar class="cursor-pointer">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
          <q-menu>
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Account</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>v.0.0.5</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="250">
      <q-list>
        <q-item-label header> Menu </q-item-label>
        <MenuLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MenuLink, { LinkProps } from 'components/MenuLink.vue';

defineOptions({
  name: 'MainLayout',
});

const linksList: LinkProps[] = [
  {
    title: 'Dashboard',
    caption: 'overall',
    icon: 'home',
    link: '/',
  },
  {
    title: 'Skills',
    caption: 'All of skill',
    icon: 'code',
    link: '/skills',
  },
  {
    title: 'Subjects',
    caption: 'All of skill',
    icon: 'book',
    link: '/subjects',
  },
  {
    title: 'Skill Mapping',
    caption: 'Main feature',
    icon: 'engineering',
    link: '/skill-mapping',
  },
  {
    title: 'Curriculums',
    caption: 'All of curriculum',
    icon: 'collections_bookmark',
    link: '/curriculums',
  },
  {
    title: 'Courses',
    caption: 'All of courses',
    icon: 'play_lesson',
    link: '/courses',
  },
  {
    title: 'User',
    caption: 'students',
    icon: 'manage_accounts',
    link: '/users',
  },
  {
    title: 'Teachers',
    caption: 'students',
    icon: 'group',
    link: '/teachers',
  },
  {
    title: 'Students',
    caption: 'students',
    icon: 'school',
    link: '/students',
  },
  {
    title: 'About',
    caption: 'about',
    icon: 'info',
    link: '/about',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
