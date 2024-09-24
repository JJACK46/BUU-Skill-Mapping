<template>
  <q-page class="flex flex-center bg-custom">
    <q-card class="q-pa-md">
      <p class="text-center text-h5 q-mt-md">Skill Mapping</p>
      <q-card-section class="q-gutter-md">
        <q-input v-model="refForm.username" filled label="Username"></q-input>
        <q-input
          v-model="refForm.password"
          filled
          label="Password"
          type="password"
        ></q-input>
      </q-card-section>
      <q-card-actions class="flex justify-center">
        <q-btn class="block" outline style="width: 100%" @click="handleLogin()">
          Login
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
