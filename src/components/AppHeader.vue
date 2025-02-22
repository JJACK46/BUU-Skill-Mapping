<template>
  <q-header reveal :reveal-offset="0" bordered class="q-px-sm">
    <q-toolbar>
      <q-btn
        v-if="!hideToggle"
        flat
        dense
        icon="menu"
        aria-label="Menu"
        @click="app.toggleLeftDrawer()"
      />

      <q-toolbar-title>
        <router-link
          to="/"
          class="cursor-pointer text-grey-10"
          style="text-decoration: none"
        >
          <q-img
            src="logos/buu-white.svg"
            alt="logo"
            height="auto"
            width="50px"
            fit="contain"
          >
          </q-img>
          <span class="q-ml-sm text-weight-bold text-white">Skill Mapping</span>
        </router-link>
      </q-toolbar-title>
      <!-- Profile -->
      <div class="row items-center">
        <q-avatar class="cursor-pointer q-mr-sm">
          <img
            draggable="false"
            :src="`${
              auth.payload?.user.avatarUrl ||
              'https://placehold.co/32x32?text=profile'
            } `"
          />
        </q-avatar>
        <div class="q-mr-md">
          {{ auth.getName }}
        </div>
        <q-menu :offset="[-20, 0]" style="width: auto" class="shadow-1">
          <q-list>
            <q-item>
              <q-item-section side>
                <q-icon
                  color="primary"
                  :name="symOutlinedShieldPerson"
                ></q-icon>
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
            <q-item
              v-close-popup
              clickable
              @click="async () => await auth.logout()"
              to="/login"
            >
              <q-item-section side>
                <q-icon name="logout"></q-icon>
              </q-item-section>
              <q-item-section>
                {{ t('logout') }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
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

      <q-btn
        v-if="!auth.isSignedIn"
        label="login"
        to="/login"
        flat
        class="bg-primary text-bold"
        color="white"
      />
    </q-toolbar>
    <slot name="additional"> </slot>
  </q-header>
</template>

<script lang="ts" setup>
/*
    imports
*/
import { symOutlinedShieldPerson } from '@quasar/extras/material-symbols-outlined';
import { useAuthStore } from 'src/stores/auth';
import { useGlobalStore } from 'src/stores/global';
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
/*
    states
*/

defineProps<{
  hideToggle?: true;
}>();

const router = useRouter();
const { t, locale } = useI18n();
const auth = useAuthStore();

const app = useGlobalStore();

const getCurrentLocale = computed(() => {
  const cur = locale.value.split('-')[0];
  if (cur === 'th') {
    return 'EN';
  } else {
    return 'TH';
  }
});
/*
    methods
*/

function changeLocale() {
  if (locale.value === 'en-US') {
    locale.value = 'th-TH';
  } else {
    locale.value = 'en-US';
  }
}

onMounted(async () => {
  // auth.profile = await auth.getProfile();
  // if (!props.landing) {
  //   if (auth.profile) return;
  // }
});
</script>
