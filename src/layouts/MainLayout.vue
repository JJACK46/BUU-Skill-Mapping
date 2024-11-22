<template>
  <q-layout view="hHh LpR lFf">
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
        <div class="q-gutter-md q-mr-md">
          <q-btn
            icon="notifications"
            flat
            padding="none"
            @click="toggleRightDrawer"
          />
          <q-btn :icon="themeIcon" flat padding="none" @click="handleTheme" />
        </div>
        <q-avatar class="cursor-pointer">
          <img
            draggable="false"
            :src="`${
              profile?.avatarUrl || 'https://placehold.co/32x32?text=nopic'
            } `"
          />
          <q-menu :offset="[-10, 0]">
            <q-list>
              <q-item clickable v-close-popup @click="router.push('/account')">
                <q-item-section>
                  <q-item-label class="row items-center q-gutter-x-sm">
                    <q-icon name="person"></q-icon>
                    <span class="col">Account</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="store.logout">
                <q-item-section>
                  <q-item-label class="row items-center q-gutter-x-sm">
                    <q-icon name="logout"></q-icon>
                    <span class="col">Logout</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above :width="250" side="left">
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

    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      <q-list>
        <q-item-label header> Notifications </q-item-label>
        <q-separator />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import MenuLink, { LinkProps } from 'components/MenuLink.vue';
import { __APP_VERSION } from 'src/utils/app';
import { Payload } from 'src/types/payload';
import { useAuthStore } from 'src/stores/auth';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { LocalStorage } from 'quasar';

const themeIcon = computed(() => (dark.isActive ? 'dark_mode' : 'light_mode'));
const handleTheme = () => {
  dark.toggle();
  LocalStorage.set('theme', dark.isActive ? 'dark' : 'light');
};

const router = useRouter();
const { dark } = useQuasar();
const store = useAuthStore();
const profile = ref<Payload | null>(null);

onMounted(async () => {
  if (LocalStorage.getItem('theme') === 'dark') {
    dark.set(true);
  } else {
    dark.set(false);
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
    title: 'branch',
    icon: 'books',
    link: '/branches',
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
    link: '/instructor',
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

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}
</script>
