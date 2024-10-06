<template>
  <q-page class="flex flex-center bg-custom">
    <span>
      <q-card class="q-animate--fade bg-transparent" flat dark>
        <q-card-section class="justify-around items-center row q-gutter-x-lg">
          <q-card-section class="text-white">
            <q-img
              src="logos/buu-dark.png"
              alt="buu"
              height="200px"
              width="300px"
              fit="contain"
            >
            </q-img>
            <div class="q-mt-md text-h6" style="line-height: 1.1">
              Skill Mapping <br />
              <span class="text-caption">
                {{ __APP_VERSION }}
              </span>
            </div>
          </q-card-section>

          <q-separator v-if="$q.screen.gt.sm" vertical dark />
          <q-card-section class="q-pa-none q-mb-md">
            <q-input
              dark
              label-color="white"
              color="accent"
              class="full-width q-mt-md"
              v-model="refForm.username"
              outlined
              dense
              label="Username"
            >
              <template #prepend>
                <q-icon name="person"></q-icon>
              </template>
            </q-input>
            <q-input
              dark
              color="accent"
              class="full-width q-mt-md"
              v-model="refForm.password"
              outlined
              dense
              label="Password"
              type="password"
              bottom-slots
            >
              <template #prepend>
                <q-icon name="lock"></q-icon>
              </template>
              <template #hint>
                <q-btn
                  flat
                  dense
                  size="sm"
                  @click="handleForgetPassword"
                  label="Forget Password ?"
                />
              </template>
            </q-input>
            <div class="q-mt-lg">
              <q-btn unelevated class="full-width" color="accent" dark>
                <span class="text-black"> login</span>
              </q-btn>
              <q-btn
                dark
                outline
                class="full-width q-mt-md"
                @click="handleLogin"
              >
                <q-img
                  src="~assets/google-logo.svg"
                  width="24px"
                  height="24px"
                  class="q-mr-sm"
                  alt="google"
                />
                <span class="text-white"> Sign in with Google </span>
              </q-btn>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
      <p class="text-caption text-center">
        &copy; 2024 Burapha University. All Rights Reserved.
      </p>
    </span>
  </q-page>
</template>

<script lang="ts" setup>
import { QSpinnerFacebook, useMeta, useQuasar } from 'quasar';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { reactive } from 'vue';
import AuthService from 'src/services/auth';
import { __APP_VERSION } from 'src/utils';

const route = useRoute();
const title = computed(() => route.matched[0].name as string);
useMeta({
  title: title.value,
});
const refForm = reactive({
  username: '',
  password: '',
});

const handleForgetPassword = () => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
};

const $q = useQuasar();

const handleLogin = () => {
  $q.loading.show({
    spinner: QSpinnerFacebook,
    spinnerColor: 'yellow',
    spinnerSize: 200,
  });
  setTimeout(() => {
    $q.loading.hide();
    AuthService.loginGoogle();
  }, 1100);
};
</script>

<style scoped>
@keyframes gradientMove {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}

.bg-custom {
  position: relative;
  background: linear-gradient(135deg, #3d3d3d, #1a1a1a, #face00);
  background-size: 200% 200%;
  animation: gradientMove 15s ease-in-out infinite;
  overflow: hidden;
}
</style>
