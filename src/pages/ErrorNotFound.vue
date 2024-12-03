<template>
  <div
    class="fullscreen bg-black text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 25vh">404</div>

      <div style="opacity: 0.7">
        <div class="text-h6">{{ t('notFoundPage') }}</div>
        <br />
        <div class="flex justify-center q-gutter-x-lg">
          <div class="text-body1">
            <q-icon size="1.5rem" name="email"></q-icon>
            support@info.buu.ac.th
          </div>
          <div class="text-body1">
            <q-icon size="1.5rem" name="phone"></q-icon>
            +66 123 456 789
          </div>
          <div>
            <q-icon size="1.5rem" color="black">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
                <g data-name="Layer 2">
                  <g data-name="LINE LOGO">
                    <rect width="320" height="320" class="cls-1" rx="72.1" />
                    <path
                      fill="#fff"
                      d="M266.7 145c0-47.8-47.9-86.7-106.7-86.7S53.3 97.2 53.3 145c0 42.8 38 78.7 89.2 85.4 3.5.8 8.2 2.3 9.4 5.3 1 2.7.7 7 .3 9.6l-1.5 9.2c-.4 2.7-2.1 10.5 9.3 5.7s61.4-36.1 83.8-62c15.4-16.9 22.9-34.1 22.9-53.2Z"
                    />
                    <path
                      d="M231.2 172.5h-30a2 2 0 0 1-2-2v-46.6a2 2 0 0 1 2-2h30a2 2 0 0 1 2 2v7.6a2 2 0 0 1-2 2h-20.4v7.9h20.4a2 2 0 0 1 2 2v7.6a2 2 0 0 1-2 2h-20.4v7.9h20.4a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2Zm-110.9 0a2 2 0 0 0 2-2v-7.6a2 2 0 0 0-2-2H99.9v-37a2 2 0 0 0-2-2h-7.6a2 2 0 0 0-2 2v46.6a2 2 0 0 0 2 2h30Z"
                      class="cls-1"
                    />
                    <rect
                      width="11.6"
                      height="50.6"
                      x="128.7"
                      y="121.8"
                      class="cls-1"
                      rx="2"
                    />
                    <path
                      d="M189.8 121.8h-7.5a2 2 0 0 0-2 2v27.7L159 122.7a1.2 1.2 0 0 0-.2-.2h-.1l-.1-.2h-.2l-.2-.1h-8.4a2 2 0 0 0-2 2v46.5a2 2 0 0 0 2 2h7.5a2 2 0 0 0 2-2v-27.9l21.4 28.8a2 2 0 0 0 .5.5l.1.1h.5a2.4 2.4 0 0 0 .5.1h7.5a2 2 0 0 0 2-2V124a2 2 0 0 0-2-2Z"
                      class="cls-1"
                    />
                  </g>
                </g>
              </svg>
            </q-icon>
            <span class="q-ml-sm">BUU@Info</span>
          </div>
        </div>
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="black"
        unelevated
        to="/"
        :label="t('goHome')"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
defineOptions({
  name: 'ErrorNotFound',
});
</script>
