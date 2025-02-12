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
                <q-item-label caption>{{ plo.description }}</q-item-label>
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
          <q-item v-for="cs in store.form.courseSpecs" :key="cs.id">
            <div class="row full-width q-py-sm items-start">
              <!-- Subject ID and Details Column -->
              <div class="col-12 col-md-2">
                <div class="text-weight-medium">
                  {{ t('subjectCode') }} {{ cs.subject.code }}
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
            v-for="coordinator in store.form.coordinators"
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
                Email :
                <span class="text-grey-8">
                  {{ coordinator.email }}</span
                ></q-item-label
              >
              <q-item-label>
                {{ t('specialists') }} :
                <span class="text-grey-8">{{
                  coordinator.specialists
                }}</span></q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <!-- JSON -->
    <q-card flat bordered>
      <q-card-section>
        <q-expansion-item label="View JSON" v-model="expandJSON">
          <q-separator class="q-my-sm"></q-separator>
          <div class="row justify-end">
            <q-btn
              flat
              padding="xs"
              :icon="alreadyCopied ? 'check' : matContentCopy"
              @click="copyToClipboard"
            >
              <q-tooltip> {{ alreadyCopied ? 'Copied' : 'Copy' }}</q-tooltip>
            </q-btn>
          </div>
          <vue-json-pretty :data="store.form"></vue-json-pretty>
        </q-expansion-item>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import CustomTreeSkill from 'src/components/CustomTreeSkill.vue';
import { useCurriculumStore } from 'src/stores/curriculum';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import VueJsonPretty from 'vue-json-pretty';
import { matContentCopy } from '@quasar/extras/material-icons';
import { useRoute, useRouter } from 'vue-router';
import type { MenuProps } from 'src/components/MenuLink.vue';

const store = useCurriculumStore();
const expandJSON = ref(false);
const route = useRoute();
const router = useRouter();

const alreadyCopied = ref(false);
const copyToClipboard = () => {
  navigator.clipboard.writeText(JSON.stringify(store.form));
  alreadyCopied.value = true;
};

const { t } = useI18n();
const details = [
  { label: t('engName'), value: store.form.engName },
  {
    label: t('degree'),
    value: `${store.form.thaiDegree} ${store.form.engDegree}`,
  },
  { label: t('description'), value: store.form.thaiDescription },
  { label: t('period'), value: store.form.period },
  { label: t('minimumGrade'), value: store.form.minimumGrade },
];

const basePath = `/curriculums/${route.params.id}`;

onMounted(async () => {
  console.log(route.params.id);
  await store.fetchOne(route.params.id as string);
  console.log(store.form);
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
