<template>
  <q-page padding>
    <div class="q-gutter-lg row">
      <q-card class="col col-md">
        <q-card-section class="row q-gutter-md">
          <q-avatar size="150px" class="col-auto q-mx-auto">
            <img
              draggable="false"
              :src="`${
                usr.profile?.avatarUrl ||
                'https://placehold.co/32x32?text=nopic'
              } `"
            />
          </q-avatar>
          <div class="row items-center text-body1">
            <span class="col-12">
              <q-icon name="email" class="q-mr-sm"></q-icon>
              <p class="inline-block">{{ usr.profile?.email }}</p>
            </span>
            <span class="col-12">
              <q-icon name="person" class="q-mr-sm"></q-icon>
              <p class="inline-block">name</p>
            </span>
          </div>
          <div class="col-12 text-body1" style="line-height: 2rem">
            <q-separator class="q-my-sm" />
            <div>Biology</div>
            <div>GPA</div>
            <div>Schedules</div>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="col-12 col-md">
        <q-card-section>
          <p class="text-h6">Skill Collection</p>
          <q-separator />
          <q-list>
            <q-item v-for="i in 10" :key="i">
              <q-item-section class="text-body1"> {{ i }} </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useUserStore } from 'src/stores/user';

const usr = useUserStore();
</script>
