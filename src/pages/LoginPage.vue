<template>
  <q-page class="flex flex-center bg-custom">
    <q-card class="q-pa-md">
      <p class="text-center text-h5 q-mt-md">Skill Mapping</p>
      <q-card-section class="q-gutter-md q-mx-auto">
        <q-input
          class="full-width q-ma-none"
          v-model="refForm.username"
          outlined
          label="Username"
        ></q-input>
        <q-input
          class="full-width"
          v-model="refForm.password"
          outlined
          label="Password"
          type="password"
        ></q-input>
      </q-card-section>
      <q-card-actions class="q-gutter-md q-mx-auto">
        <q-btn flat class="full-width bg-accent" @click="handleLogin()">
          Login
        </q-btn>
        <q-btn outline class="full-width">
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
  </q-page>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const refForm = reactive({
  username: '',
  password: '',
});

const handleLogin = () => {
  router.push('/');
};
</script>

<style scoped>
.bg-custom {
  background: linear-gradient(to bottom right, #ffd700, #ffa07a, #ff69b4);
}
</style>
