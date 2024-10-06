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

        <q-avatar class="cursor-pointer" @click="() => router.push('/account')">
          <img
            draggable="false"
            :src="`${
              profile?.avatarUrl || 'https://placehold.co/32x32?text=nopic'
            } `"
          />
          <q-menu>
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Account</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label @click="store.logout">Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="250">
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
        <div class="cursor-pointer">
          <q-icon :name="themeIcon" @click="dark.toggle"></q-icon>
        </div>
        <div>{{ __APP_VERSION }}</div>
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
import { __APP_VERSION } from 'src/utils';
import { Payload } from 'src/types/payload';
import { useUserStore } from 'src/stores/user';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const themeIcon = computed(() => (dark.isActive ? 'dark_mode' : 'light_mode'));

const router = useRouter();
const { dark } = useQuasar();
const store = useUserStore();
const profile = ref<Payload | null>(null);

onMounted(async () => {
  profile.value = await store.getProfile();
});

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
