<template>
  <q-page class="q-pa-sm">
    <!-- Curriculum Header -->
    <div class="text-h4 q-mb-lg text-primary" style="line-height: 1.5">
      {{ store.form.thaiName }}
    </div>

    <!-- Curriculum Details -->
    <q-card class="q-mb-md" flat bordered>
      <q-card-section>
        <div class="flex justify-between">
          <div class="text-h5">{{ t('details') }}</div>

          <!-- Action Buttons Go to path -->
          <q-btn
            flat
            :label="t('edit')"
            icon-right="edit"
            color="primary"
            @click="goToEdit(menuList[0])"
          />
        </div>
        <q-separator class="q-my-md"></q-separator>
        <q-list>
          <q-item v-for="(item, index) in details" :key="index">
            <q-item-section>
              <q-item-label
                >{{ item.label }} :
                <span class="text-grey-8">
                  {{ item.value }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <!-- PLOs -->
    <q-card class="q-mb-md" flat bordered>
      <q-card-section>
        <div class="flex justify-between">
          <div class="text-h6">PLOs</div>

          <!-- Action Buttons Go to path -->
          <q-btn
            flat
            :label="t('edit')"
            icon-right="edit"
            color="primary"
            @click="goToEdit(menuList[1])"
          />
        </div>
        <q-separator class="q-my-md"></q-separator>
        <q-list v-if="store.form.plos?.length">
          <q-item v-for="(plo, index) in store.form.plos" :key="plo.id">
            <div class="row full-width items-start">
              <q-item-section side class="col-1">
                <q-item-label caption class="text-black">
                  PLO {{ index + 1 }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="col">
                <q-item-label caption>{{ plo.name }}</q-item-label>
              </q-item-section>
            </div>
          </q-item>
        </q-list>
        <div v-else>
          {{ t('noData') }}
        </div>
      </q-card-section>
    </q-card>

    <!-- Subjects Section -->
    <q-card class="q-mb-md" flat bordered>
      <q-card-section>
        <div class="flex justify-between">
          <div class="text-h6">{{ t('subject') }}</div>

          <!-- Action Buttons Go to path -->
          <q-btn
            flat
            :label="t('edit')"
            icon-right="edit"
            color="primary"
            @click="goToEdit(menuList[3])"
          />
        </div>
        <q-separator class="q-my-md"></q-separator>
        <q-list separator>
          <q-item v-for="cs in subjects" :key="cs.id">
            <div class="row full-width q-py-sm items-start">
              <!-- Subject ID and Details Column -->
              <div class="col-12 col-md-2">
                <div class="text-weight-medium">
                  {{ t('subjectCode') }} {{ cs.code }}
                </div>
                <div class="text-grey-8">{{ cs.credit }} units</div>
                <div class="text-caption text-grey-8 q-mt-xs">
                  {{ cs.type }}
                </div>
              </div>

              <!-- Subject Names Column -->
              <div class="col-12 col-md-4">
                <div class="text-weight-medium">{{ cs.thaiName }}</div>
                <div class="text-grey-8">{{ cs.engName }}</div>
              </div>

              <!-- Description Column -->
              <div class="col-12 col-md-6">
                <div>{{ cs.thaiDescription }}</div>
              </div>
            </div>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- Skills Section -->
    <q-card class="q-mb-md" flat bordered>
      <q-card-section>
        <div class="flex justify-between">
          <div class="text-h6">{{ t('skills') }}</div>

          <!-- Action Buttons Go to path -->
          <q-btn
            flat
            :label="t('edit')"
            icon-right="edit"
            color="primary"
            @click="goToEdit(menuList[4])"
          />
        </div>
        <q-separator class="q-my-md"></q-separator>
        <CustomTreeSkill :skills="store.form.skills" readonly></CustomTreeSkill>
      </q-card-section>
    </q-card>

    <!-- Coordinators Section -->
    <q-card class="q-mb-md" flat bordered>
      <q-card-section>
        <div class="flex justify-between">
          <div class="text-h6">{{ t('coordinators') }}</div>

          <!-- Action Buttons Go to path -->
          <q-btn
            flat
            :label="t('edit')"
            icon-right="edit"
            color="primary"
            @click="goToEdit(menuList[2])"
          />
        </div>
        <q-separator class="q-my-md"></q-separator>
        <q-list>
          <q-item
            v-for="coordinator in instructorStore.listItem"
            :key="coordinator.id"
          >
            <q-item-section avatar class="q-mr-sm">
              <q-avatar>
                <img :src="'https://i.pravatar.cc'" alt="avatar" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label
                >{{ coordinator.thaiName }} ({{
                  coordinator.engName
                }})</q-item-label
              >
              <q-item-label caption>{{ coordinator.position }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ t('code') }}
                <span class="text-black-8 q-mx-md">
                  {{ coordinator.code }}</span
                ></q-item-label
              >
              <q-item-label>
                อีเมลล์
                <span class="text-black-8 q-mx-md">
                  {{ coordinator.email }}</span
                ></q-item-label
              >
              <!-- <q-item-label>
                {{ t('specialists') }} :
                <span class="text-grey-8">{{
                  coordinator.specialists
                }}</span></q-item-label
              > -->
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <!-- JSON -->
    <JSON_Card :data="store.form" />
  </q-page>
</template>

<script setup lang="ts">
import CustomTreeSkill from 'src/components/CustomTreeSkill.vue';
import { useCurriculumStore } from 'src/stores/curriculum';
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useInstructorStore } from 'src/stores/instructor';
import { useRoute, useRouter } from 'vue-router';
import type { MenuProps } from 'src/components/MenuLink.vue';
import JSON_Card from 'src/components/JSON_Card.vue';
import { useSubjectStore } from 'src/stores/subject';

const store = useCurriculumStore();
const subjectStore = useSubjectStore();
const instructorStore = useInstructorStore();
const subjects = computed(() => subjectStore.getListSubjects);

const route = useRoute();
const router = useRouter();

const { t } = useI18n();
const details = computed(() => [
  { label: t('engName'), value: store.form.engName },
  {
    label: t('degree'),
    value: `${store.form.thaiDegree} ${store.form.engDegree}`,
  },
  { label: t('description'), value: store.form.thaiDescription },
  { label: t('period'), value: store.form.period },
  { label: t('minimumGrade'), value: store.form.minimumGrade },
]);

const basePath = `/curriculums/${route.params.id}`;

onMounted(async () => {
  // get curriculumn id from route fullPath curriculums/23112122111211/summary
  if (!store.form) {
    const id = route.fullPath.split('/')[2];
    await store.fetchOne(id);
  }
});

import { watchEffect } from 'vue';

watchEffect(async () => {
  await subjectStore.fetchAllInCurr();
  await console.log('Instuctors', store.form.coordinators);
  await instructorStore.fetchRowsInCurr();
});

const goToEdit = (menuList: MenuProps) => {
  console.log(menuList);
  router.push(menuList.link);
};

const menuList = [
  {
    icon: 'home',
    title: 'curriculum',
    link: basePath,
  },
  {
    icon: 'collections_bookmark',
    title: 'PLOs',
    link: `${basePath}/plos`,
  },
  {
    icon: 'groups',
    title: 'coordinators',
    link: `${basePath}/coordinators`,
  },
  {
    icon: 'books',
    title: 'subjects',
    link: `${basePath}/subjects`,
  },

  {
    icon: 'code',
    title: 'skills',
    link: `${basePath}/skills`,
  },
  {
    icon: 'check',
    title: 'summary',
    link: `${basePath}/summary`,
  },
];
</script>
