<template>
  <q-page padding class="q-gutter-y-md">
    <q-card flat bordered>
      <q-card-section>
        <div class="text-h6 text-bold">About Application 🚀</div>
        <p class="text-body2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto
          itaque ea voluptates animi sit repellendus laudantium magnam excepturi
          illum et mollitia saepe, fuga libero obcaecati accusantium facilis
          aliquid accusamus doloremque!
        </p>
      </q-card-section>
    </q-card>
    <q-card flat bordered>
      <q-card-section>
        <div class="text-h6 text-bold">FAQ 🙋</div>
        <q-list>
          <q-item v-for="i in 5" :key="i">
            <q-item-section>
              <div class="text-bold">Question {{ i }}</div>
              <div>
                <span>&nbsp; # </span>
                <q class="text-primary"> Answer {{ i }}</q>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <q-card flat bordered>
      <q-card-section>
        <div class="text-h6 text-bold">Made with 💙 by</div>
        <q-list>
          <q-item v-for="i in 5" :key="i">
            <q-item-section>
              {{ i }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <div class="text-center q-mt-md">
      &copy; 2024 Burapha University. Web-App {{ __APP_VERSION }}
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { __APP_VERSION } from 'src/utils/app';
</script>
