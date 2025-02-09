<template>
  <div class="flex q-pa-xl">
    <q-btn
      :label="`debug mode: ${app.debugMode}`"
      :color="app.debugMode ? 'positive' : 'negative'"
      @click="app.toggleDebugMode"
    ></q-btn>
    <q-btn label="admin" :to="`${EnumUserRole.ADMIN}`"></q-btn>
    <q-btn label="coordinator" :to="`${EnumUserRole.COORDINATOR}`"></q-btn>
    <q-btn label="instructor" :to="`${EnumUserRole.INSTRUCTOR}`"></q-btn>
    <q-btn label="student" :to="`${EnumUserRole.STUDENT}`"></q-btn>
  </div>
</template>

<script lang="ts" setup>
import { EnumUserRole } from 'src/data/roles';
import { useGlobalStore } from 'src/stores/global';

const app = useGlobalStore();
</script>
