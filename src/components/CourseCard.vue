<template>
  <q-card
    flat
    v-if="!global.getLoadingState"
    class="col-grow col-sm-auto hover-card q-animate--fade"
    :key="course.id"
    style="width: 350px"
  >
    <q-card-section class="q-py-sm">
      <q-item class="q-pa-none">
        <q-item-section class="text-h6">
          {{ course.name ?? course.subject?.engName }}
        </q-item-section>
        <q-item-section avatar>
          <q-btn icon="more_vert" flat padding="none">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item
                  clickable
                  onmouseenter="this.style.color='red'"
                  onmouseleave="this.style.color=''"
                  @click="$emit('handle-delete', course.id ?? '')"
                  v-close-popup
                >
                  <q-item-section side>
                    <q-icon size="16px" name="delete" />
                  </q-item-section>
                  <q-item-section> {{ t('delete') }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-card-section class="text-body2 q-pt-none">
      {{ course.description }}
    </q-card-section>
    <q-separator />
    <q-card-actions class="text-body1 q-pa-md text-bold" align="between">
      <div :class="`text-${course.active ? 'positive' : 'negative'}`">
        {{ course.active ? 'Active' : 'Inactive' }}
      </div>
      <q-btn
        label="View"
        unelevated
        color="primary"
        style="width: 80px"
        @click="$emit('handle-view', course.id ?? 0)"
      >
      </q-btn>
    </q-card-actions>
  </q-card>
  <q-skeleton v-else type="rect" style="width: 350px; height: 180px" />
</template>

<script lang="ts" setup>
import { useGlobalStore } from 'src/stores/global';
import { Course } from 'src/types/course';
import { useI18n } from 'vue-i18n';

const global = useGlobalStore();
const { t } = useI18n();
defineProps<{
  course: Course;
}>();

// defineEmits<{
//   (e: 'handle-view', id: number): void;
//   (e: 'handle-delete', id: number): void;
// }>();
defineEmits(['handle-view', 'handle-delete']);
</script>

<style lang="scss">
.hover-card {
  transition: all 0.15s ease-in-out;
  border: 2px solid #ececec;
}

.hover-card:hover {
  border: 2px solid $secondary;
}
</style>
