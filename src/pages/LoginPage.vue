<template>
  <q-page class="flex fullscreen">
    <div class="q-mx-auto q-my-auto">
      <q-card id="login-card" flat>
        <q-card-section class="justify-around row q-gutter-x-lg">
          <q-card-section>
            <div>
              <q-img
                src="logos/buu-light.png"
                alt="buu"
                height="auto"
                width="100px"
                fit="contain"
              >
              </q-img>
            </div>
            <div
              class="text-uppercase text-center"
              :style="{ fontSize: $q.screen.lt.sm ? '2.6rem' : '3.5rem' }"
            >
              Skill Mapping
            </div>
            <div>
              {{ __APP_VERSION }}
            </div>
          </q-card-section>

          <q-separator v-if="$q.screen.gt.sm" vertical />
          <q-card-section class="q-pa-none q-mb-md">
            <q-input
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
              <q-btn unelevated class="full-width" color="accent">
                <span class="text-black"> login</span>
              </q-btn>
              <q-btn outline class="full-width q-mt-md" @click="handleLogin">
                <q-img
                  src="~assets/google-logo.svg"
                  width="24px"
                  height="24px"
                  class="q-mr-sm"
                  alt="google"
                />
                <span> Sign in with Google </span>
              </q-btn>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
      <p class="text-center q-mt-lg">
        &copy; 2025 Burapha University. All Rights Reserved.
      </p>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useMeta, useQuasar } from 'quasar';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { reactive } from 'vue';
import AuthService from 'src/services/auth';
import { __APP_VERSION } from 'src/utils/app';

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
  // $q.loading.show({
  //   spinner: QSpinnerFacebook,
  //   spinnerColor: 'yellow',
  //   spinnerSize: 200,
  // });
  AuthService.loginGoogle();
  // setTimeout(() => {
  //   $q.loading.hide();
  // }, 1100);
};
</script>

<style scoped lang="scss">
#login-card {
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 1rem;
}
</style>
