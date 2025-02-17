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
      <q-toolbar class="q-px-md">
        <q-breadcrumbs>
          <q-breadcrumbs-el :label="t('home')" icon="home" to="/" />
          <q-breadcrumbs-el
            :label="`${t('curriculum')}`"
            :to="`/${auth.getRole || 'administer'}/curriculums`"
          />
          <q-breadcrumbs-el :label="`${$route.params.code}`" />
        </q-breadcrumbs>
      </q-toolbar>
      <div class="q-px-md">
        <q-separator style="height: 2px" class="q-mb-md"></q-separator>
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import AppDrawer from 'src/components/AppLeftDrawer.vue';
import AppHeader from 'src/components/AppHeader.vue';
import MenuLink, { type MenuProps } from 'src/components/MenuLink.vue';
import { useCurriculumStore } from 'src/stores/curriculum';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';

const store = useCurriculumStore();
const route = useRoute();
const { t } = useI18n();
const auth = useAuthStore();

const basePath = `/curriculums/${route.params.code}`;

onMounted(() => {
  store.fetchOne(route.params.code as string);
});

const menuList: MenuProps[] = [
  {
    icon: 'home',
    title: 'curriculum',
    link: basePath,
  },
  {
    icon: 'collections_bookmark',
    title: 'PLOs',
    link: `${basePath}/plos`,
  },
  {
    icon: 'groups',
    title: 'coordinators',
    link: `${basePath}/coordinators`,
  },
  {
    icon: 'books',
    title: 'subjects',
    link: `${basePath}/subjects`,
  },

  {
    icon: 'code',
    title: 'skills',
    link: `${basePath}/skills`,
  },
  {
    icon: 'check',
    title: 'summary',
    link: `${basePath}/summary`,
  },
];

defineOptions({
  name: 'CurriculumLayout',
});
</script>
