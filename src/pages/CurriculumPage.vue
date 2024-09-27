<template>
  <q-page padding>
    <div class="text-h6">{{ title }}</div>
    <q-separator class="q-my-md" />
    <div class="flex flex-center q-gutter-sm">
      <q-input
        outlined
        clearable
        v-model="search"
        label="Search"
        class="col"
        dense
      >
        <template #prepend>
          <q-icon name="search"></q-icon>
        </template>
      </q-input>
      <q-space />
      <div>
        <q-btn @click="isDialogOpen = true" color="secondary">Add</q-btn>
      </div>
    </div>
    <section class="q-mt-md">
      <q-card class="q-pa-md">
        <div class="row justify-between">
          <span class="text-h6">
            Name
            <p class="text-caption">Eng Name</p>
          </span>
          <q-btn icon="edit" flat></q-btn>
        </div>
        <div>description</div>
        <q-card-section class="text-body1">
          <q-expansion-item label="List of subjects">
            <q-list>
              <q-item v-for="sub in 10" :key="sub">
                <q-item-label>
                  <span
                    >{{ sub }}
                    <p class="text-caption">{{ sub }}</p>
                  </span></q-item-label
                >
              </q-item>
            </q-list>
          </q-expansion-item>
        </q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<script lang="ts" setup>
import { useMeta } from 'quasar';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const isDialogOpen = ref(false);
const search = ref();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
useMeta({
  title: title.value,
});
</script>
