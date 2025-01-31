<template>
  <q-layout view="hHh lpR fFf">
    <AppHeader hide-toggle> </AppHeader>
    <AppDrawer>
      <q-scroll-area class="fit">
        <q-list>
          <MenuLink v-for="link in menuList" :key="link.title" v-bind="link" />
        </q-list>
      </q-scroll-area>
    </AppDrawer>
    <q-page-container>
      <q-toolbar>
        <q-breadcrumbs>
          <q-breadcrumbs-el :label="t('home')" icon="home" to="/" />
          <q-breadcrumbs-el :label="`${t('curriculum')}`" />
          <q-breadcrumbs-el :label="`${$route.params.id}`" />
        </q-breadcrumbs>
      </q-toolbar>
      <div class="q-px-md">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import AppDrawer from 'src/components/AppDrawer.vue';
import AppHeader from 'src/components/AppHeader.vue';
import MenuLink, { type MenuProps } from 'src/components/MenuLink.vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const route = useRoute();
const { t } = useI18n();

const basePath = `/curriculum/${route.params.id}`;

const menuList: MenuProps[] = [
  {
    icon: 'home',
    title: t('curriculum'),
    link: basePath,
  },
  {
    icon: 'collections_bookmark',
    title: 'PLOs',
    link: `${basePath}/plos`,
  },
  {
    icon: 'groups',
    title: t('coordinators'),
    link: `${basePath}/coordinators`,
  },
  {
    icon: 'books',
    title: t('subjects'),
    link: `${basePath}/subjects`,
  },
  {
    icon: 'code',
    title: t('skills'),
    link: `${basePath}/skills`,
  },
  {
    icon: 'check',
    title: t('summary'),
    link: `${basePath}/summary`,
  },
];

defineOptions({
  name: 'CurriculumLayout',
});
</script>
