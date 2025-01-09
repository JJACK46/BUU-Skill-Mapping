<template>
  <q-header reveal :reveal-offset="0" bordered class="q-px-sm">
    <q-toolbar>
      <q-btn
        flat
        dense
        icon="menu"
        aria-label="Menu"
        @click="app.toggleLeftDrawer()"
      />

      <q-toolbar-title>
        <q-img
          src="logos/buu-light.png"
          alt="logo"
          height="auto"
          width="50px"
          fit="contain"
        >
          <template #loading></template>
        </q-img>
        <span class="q-ml-sm text-weight-medium">Skill Mapping</span>
      </q-toolbar-title>
      <!-- Locale -->
      <q-btn
        flat
        padding="none"
        class="q-mr-md text-bold"
        @click="changeLocale"
        >{{ getCurrentLocale }}</q-btn
      >
      <!-- Notifications Btn -->
      <div class="q-gutter-md q-mr-md">
        <q-btn
          icon="notifications"
          flat
          padding="none"
          @click="app.toggleRightDrawer('notifications')"
        />
      </div>
      <!-- Profile -->
      <q-avatar class="cursor-pointer">
        <img
          draggable="false"
          :src="`${
            profile?.avatarUrl || 'https://placehold.co/32x32?text=profile'
          } `"
        />
        <q-menu :offset="[-20, 0]" style="width: 160px">
          <q-list>
            <q-item>
              <q-item-section side>
                <q-icon color="primary" name="accessibility"></q-icon>
              </q-item-section>
              <q-item-section class="text-primary text-bold">
                {{ auth.getRole ?? 'Unknown' }}
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item v-close-popup clickable @click="router.push('/account')">
              <q-item-section side>
                <q-icon name="person"></q-icon>
              </q-item-section>
              <q-item-section>
                {{ t('account') }}
              </q-item-section>
            </q-item>
            <q-item
              v-close-popup
              clickable
              @click="app.toggleRightDrawer('settings')"
            >
              <q-item-section side>
                <q-icon name="settings"></q-icon>
              </q-item-section>
              <q-item-section> {{ t('settings') }} </q-item-section>
            </q-item>
            <q-item v-close-popup clickable @click="store.logout">
              <q-item-section side>
                <q-icon name="logout"></q-icon>
              </q-item-section>
              <q-item-section>
                {{ t('logout') }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-avatar>
    </q-toolbar>
    <slot name="additional"> </slot>
  </q-header>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth';
import { useGlobalStore } from 'src/stores/global';
import type { Payload } from 'src/types/payload';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = useAuthStore();
const { t, locale } = useI18n();
const store = useAuthStore();

const app = useGlobalStore();

const getCurrentLocale = computed(() => {
  const cur = locale.value.split('-')[0];
  if (cur === 'th') {
    return 'EN';
  } else {
    return 'TH';
  }
});
function changeLocale() {
  if (locale.value === 'en-US') {
    locale.value = 'th-TH';
  } else {
    locale.value = 'en-US';
  }
}

const profile = ref<Payload | null>(null);

onMounted(async () => {
  profile.value = await store.getProfile();
});
</script>
