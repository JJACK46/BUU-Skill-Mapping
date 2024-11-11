<template>
  <q-card
    class="col-grow col-sm-auto hover-card"
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
              <q-list>
                <q-item
                  clickable
                  onmouseenter="this.style.color='red'"
                  onmouseleave="this.style.color=''"
                  @click="$emit('handle-delete', course.id ?? 0)"
                  v-close-popup
                >
                  <q-item-section> Delete</q-item-section>
                  <q-item-section avatar>
                    <q-icon name="delete" />
                  </q-item-section>
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
</template>

<script lang="ts" setup>
import { Course } from 'src/types/course';

defineProps<{
  course: Course;
}>();

defineEmits<{
  (e: 'handle-view', id: number): void;
  (e: 'handle-delete', id: number): void;
}>();
</script>
