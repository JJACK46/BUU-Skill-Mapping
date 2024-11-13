<template>
  <q-page padding>
    <div class="q-gutter-lg row">
      <div class="col col-md">
        <q-card class="full-width flex flex-center">
          <q-card-section horizontal>
            <q-card-section>
              <q-avatar size="150px" class="col-auto q-mx-auto">
                <img draggable="false" :src="`${usr.profile?.avatarUrl ||
                  'https://placehold.co/32x32?text=nopic'
                  } `" />
              </q-avatar>
            </q-card-section>
            <q-card-section class="flex items-center text-body1">
              <q-list>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="email" class="q-mr-sm" /></q-item-section>
                  <q-item-section>{{ usr.profile?.email }}</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="person" class="q-mr-sm" /></q-item-section>
                  <q-item-section>Name</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="lock" class="q-mr-sm" /></q-item-section>
                  <q-item-section>Role</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card-section>
        </q-card>
        <q-card class="full-width q-mt-md">
          <q-card-section>
            <div class="text-h6">Biology</div>
            <div class="text-body2" style="line-height: 1.6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Veritatis eligendi incidunt modi optio commodi ut? Ullam,
              voluptatum, ipsum pariatur natus sed labore similique nesciunt
              commodi cum neque iure vel praesentium!
            </div>
          </q-card-section>
        </q-card>
        <div class="flex q-gutter-md q-my-none">
          <q-card>
            <q-card-section>
              <div class="flex items-center">
                <q-icon name="star" class="q-mr-sm"></q-icon>
                <div class="text-h6">
                  GPA:
                  <span>3.99</span>
                </div>
              </div>
            </q-card-section>
          </q-card>
          <q-card class="hover-card">
            <q-card-section class="cursor-pointer">
              <div class="flex items-center">
                <q-icon name="schedule" class="q-mr-sm" />
                <span class="text-h6">Schedules</span>
              </div>
              <q-popup-proxy class="q-pa-lg"> some content </q-popup-proxy>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <q-card class="col-12 col-md" style="height: fit-content">
        <q-card-section>
          <q-expansion-item icon="bookmark" label="Skill Collection">
            <q-list>
              <q-item v-for="i in 10" :key="i">
                <q-item-section class="text-body1"> {{ i }} </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth';

const usr = useAuthStore();
</script>
