<template>
  <q-page class="flex flex-center bg-custom">
    <span>
      <q-card class="q-pa-md q-animate--fade">
        <p class="text-center text-h5 q-mt-md">Skill Mapping</p>
        <q-card-section class="q-gutter-md q-mx-auto">
          <q-input
            class="full-width q-ma-none"
            v-model="refForm.username"
            outlined
            label="Username"
          >
            <template #prepend>
              <q-icon name="person"></q-icon>
            </template>
            <template #hint></template>
          </q-input>
          <q-input
            class="full-width"
            v-model="refForm.password"
            outlined
            label="Password"
            type="password"
          >
            <template #prepend>
              <q-icon name="lock"></q-icon>
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions class="q-gutter-md q-mx-auto">
          <q-btn outline class="full-width" color="accent"> Login </q-btn>
          <q-btn outline class="full-width" @click="AuthService.loginGoogle()">
            <img
              src="~assets/google-logo.svg"
              width="24"
              class="q-mr-sm"
              alt=""
            />
            Sign in with Google
          </q-btn>
        </q-card-actions>
      </q-card>
      <p class="text-caption q-mt-md text-center">
        &copy; 2024 All Rights Reserved.
      </p>
    </span>
  </q-page>
</template>

<script lang="ts" setup>
import { useMeta } from 'quasar';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { reactive } from 'vue';
import AuthService from 'src/services/auth';

const route = useRoute();
const title = computed(() => route.matched[0].name as string);
useMeta({
  title: title.value,
});
const refForm = reactive({
  username: '',
  password: '',
});

// const handleLogin = () => {
//   router.push('/');
// };
</script>

<style scoped>
.bg-custom {
  position: relative;
  background: linear-gradient(to bottom right, rgb(0, 0, 0), #303030, #000000);
  overflow: hidden;
}
</style>
