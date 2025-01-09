<template>
  <q-layout view="hHh lpR fFf">
    <AppHeader>
      <template #additional>
        <q-toolbar inset>
          <q-breadcrumbs style="font-size: 16px">
            <q-breadcrumbs-el :label="t('home')" icon="home" to="/" />
            <q-breadcrumbs-el
              :label="t('allCurriculums')"
              icon="books"
              to="/curriculums"
            />
            <q-breadcrumbs-el :label="t(String($route.name))" />
          </q-breadcrumbs>
        </q-toolbar>
      </template>
    </AppHeader>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import AppHeader from 'src/components/AppHeader.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
