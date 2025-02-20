<template>
  <q-page class="flex fullscreen">
    <div class="q-mx-auto q-my-auto">
      <q-card id="login-card" flat>
        <q-card-section class="justify-around row q-gutter-x-lg">
          <q-card-section>
            <div>
              <q-img
                src="logos/buu-og.svg"
                alt="buu"
                height="auto"
                width="120px"
                fit="contain"
              >
              </q-img>
            </div>
            <div
              class="text-uppercase text-center text-secondary text-weight-medium"
              :style="{ fontSize: $q.screen.lt.sm ? '2.6rem' : '3.5rem' }"
            >
              Skill Mapping
            </div>
            <div class="text-grey-6">
              {{ __APP_VERSION }}
            </div>
          </q-card-section>

          <q-separator v-if="$q.screen.gt.sm" vertical />
          <q-card-section class="q-pa-none">
            <q-form @submit="auth.login">
              <q-input
                class="full-width"
                v-model="auth.form.email"
                outlined
                dense
                type="email"
                label="Email"
                :rules="[requireField]"
              >
                <template #prepend>
                  <q-icon name="person"></q-icon>
                </template>
              </q-input>
              <q-input
                class="full-width q-mt-md"
                v-model="auth.form.password"
                outlined
                dense
                label="Password"
                type="password"
                :rules="[requireField]"
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
                <q-btn
                  type="submit"
                  unelevated
                  class="full-width text-weight-bold"
                  color="secondary"
                  @click="auth.login"
                >
                  login
                </q-btn>
                <q-btn
                  outline
                  class="full-width q-mt-md"
                  @click="auth.loginGoogle"
                >
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
            </q-form>
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
/*
    imports
*/
import { useMeta, useQuasar } from 'quasar';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { __APP_VERSION } from 'src/utils/app';
import { requireField } from 'src/utils/field-rules';
import { useAuthStore } from 'src/stores/auth';
/*
    states
*/
const route = useRoute();
const title = computed(() => route.matched[0].name as string);
const $q = useQuasar();
const auth = useAuthStore();
/*
    methods
*/
const handleForgetPassword = () => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
};
useMeta({
  title: title.value,
});
</script>

<style scoped lang="scss">
#login-card {
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 1rem;
}
@media screen and (max-width: 1024px) {
  #login-card {
    border: none;
  }
}
</style>
