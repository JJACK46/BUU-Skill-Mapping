<template>
  <q-card
    v-if="!global.getLoadingState"
    class="col-grow col-sm-auto custom-card q-animate--fade"
    style="width: 350px"
  >
    <q-card-section class="q-py-sm">
      <q-item class="q-pa-none">
        <q-item-section class="text-h6 text-weight-medium">
          {{ headText }}
          <div class="text-body2 text-grey-8">
            {{ subText }}
          </div>
        </q-item-section>
        <q-item-section avatar v-if="!hideOptions">
          <q-btn icon="more_vert" flat padding="none">
            <q-menu>
              <q-list class="col-auto">
                <slot name="btn-options"></slot>
              </q-list>
            </q-menu>
          </q-btn>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-card-section class="text-body2 q-pt-none">
      <slot name="body"></slot
    ></q-card-section>
    <q-card-actions v-if="!hideActions">
      <slot name="actions"></slot>
    </q-card-actions>
  </q-card>
  <q-skeleton v-else type="rect" style="width: 350px; height: 180px" />
</template>

<script lang="ts" setup>
import { useGlobalStore } from 'src/stores/global';

const global = useGlobalStore();
defineProps<{
  headText: string;
  subText: string;
  hideActions?: boolean;
  hideOptions?: boolean;
}>();

defineEmits(['handle-view', 'handle-delete']);
</script>

<style lang="scss">
.custom-card {
  transition: all 0.15s ease-in-out;
  box-shadow: 0 6px 20px 0 rgb(0, 0, 0, 0.09);
  border-radius: 10px;
}

.custom-card:hover {
  scale: 1.025;
}
</style>
