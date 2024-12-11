<template>
  <q-layout view="lHh LpR lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> Skill Mapping App </q-toolbar-title>
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
            @click="toggleRightDrawer('notifications')"
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
          <q-menu :offset="[-20, 0]" style="width: 160px" auto-close>
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
              <q-item clickable @click="router.push('/account')">
                <q-item-section side>
                  <q-icon name="person"></q-icon>
                </q-item-section>
                <q-item-section>
                  {{ t('account') }}
                </q-item-section>
              </q-item>
              <q-item clickable @click="toggleRightDrawer('settings')">
                <q-item-section side>
                  <q-icon name="settings"></q-icon>
                </q-item-section>
                <q-item-section> {{ t('settings') }} </q-item-section>
              </q-item>
              <q-item clickable @click="store.logout">
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
    </q-header>
    <!-- Left Drawer -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      side="left"
      bordered
    >
      <q-list>
        <q-item-label header>
          <q-img
            :src="
              $q.dark.isActive ? 'logos/buu-dark.png' : 'logos/buu-light.png'
            "
            alt="BUU"
            height="64px"
            fit="contain"
          />
        </q-item-label>
        <MenuLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
      <q-space />
      <q-separator class="q-my-sm" />
      <q-list class="flex justify-between q-px-md">
        <div>{{ __APP_VERSION }}</div>
      </q-list>
    </q-drawer>

    <!-- Right Drawer -->
    <q-drawer v-model="rightDrawerOpen" :width="250" side="right" bordered>
      <q-list>
        <q-item>
          <q-item-section class="text-capitalize">
            {{ getHeaderText }}
          </q-item-section>
          <q-item-section side>
            <q-btn
              padding="none"
              icon="close"
              flat
              @click="toggleRightDrawer()"
            ></q-btn>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item v-show="currentTabModel === 'settings'">
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
import { computed, onMounted, ref, watch } from 'vue';
import MenuLink, { LinkProps } from 'components/MenuLink.vue';
import { __APP_VERSION } from 'src/utils/app';
import { Payload } from 'src/types/payload';
import { useAuthStore } from 'src/stores/auth';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { LocalStorage } from 'quasar';
import { useI18n } from 'vue-i18n';

const darkRef = ref(false);

watch(
  () => darkRef.value,
  (val) => {
    dark.set(val);
    LocalStorage.set('theme', val ? 'dark' : 'light');
  }
);
const auth = useAuthStore();
const { t, locale } = useI18n();
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
const getThemeIcon = computed(() =>
  dark.isActive ? 'dark_mode' : 'light_mode'
);

const router = useRouter();
const { dark } = useQuasar();
const store = useAuthStore();
const profile = ref<Payload | null>(null);

onMounted(async () => {
  if (LocalStorage.getItem('theme') === 'dark') {
    dark.set(true);
    darkRef.value = true;
  } else {
    dark.set(false);
    darkRef.value = false;
  }
  profile.value = await store.getProfile();
});

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

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);
const getHeaderText = computed(() => {
  return t(currentTabModel.value || 'settings');
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
const currentTabModel = ref<Tabs>();
type Tabs = 'notifications' | 'settings';
function toggleRightDrawer(tab?: Tabs) {
  if (tab) {
    currentTabModel.value = tab;
  }
  rightDrawerOpen.value = !rightDrawerOpen.value;
}
</script>
