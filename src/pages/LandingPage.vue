<template>
  <AppHeader landing />
  <q-page :padding="$q.screen.lt.md">
    <section
      class="flex justify-evenly items-center"
      :style="{
        marginTop: $q.screen.lt.md ? '0' : '50px',
        flexDirection: $q.screen.lt.md ? 'column-reverse' : 'row',
      }"
    >
      <div :style="{ maxWidth: '500px' }" class="q-space">
        <div :class="$q.screen.lt.md ? 'text-h4' : 'text-h3'">
          Skill Mapping
        </div>
        <div
          :class="$q.screen.lt.md ? 'text-body1 q-mt-sm' : ' text-h6 q-mt-lg'"
        >
          ออกแบบพัฒนาหลักสูตรและวิเคราะห์ทักษะได้อย่างชาญฉลาดด้วย Skill Mapping
          พร้อมยกระดับศักยภาพและความสามารถของเด็กรุ่นใหม่ให้ตรงกับความต้องการของตลาด
        </div>
      </div>
      <q-img
        src="https://placehold.co/500x400"
        alt="image"
        :draggable="false"
        :width="$q.screen.lt.md ? '400px' : '500px'"
        height="auto"
        fit="cover"
      />
    </section>
    <section
      style="margin-top: 100px"
      class="bg-accent q-pa-xl fit"
      :style="{ borderRadius: '300px 100px' }"
    >
      <div :class="['text-center', $q.screen.lt.md ? 'text-h5' : 'text-h3']">
        จัดการหลักสูตรโดยมุ่งเน้นผลลัพธ์การเรียนรู้
      </div>
      <div class="flex justify-center q-gutter-xl q-mt-sm">
        <q-card
          class="q-pa-md text-h5"
          flat
          v-for="item in outcomes"
          :key="item.title"
        >
          <q-card-section>
            <div class="text-h5">
              {{ item.title }}
            </div>
            <span class="text-body1">
              {{ item.fullName }}
            </span>
          </q-card-section>
        </q-card>
      </div>
    </section>

    <section
      class="flex justify-evenly items-center"
      :style="{ margin: '100px 0' }"
    >
      <q-img
        v-if="!$q.screen.lt.md"
        src="https://placehold.co/500x800"
        alt="image"
        :draggable="false"
        width="500px"
        height="auto"
        fit="cover"
      />
      <div :style="{ maxWidth: '610px' }" class="q-space">
        <div
          :class="$q.screen.lt.md ? 'text-h5' : 'text-h4'"
          style="line-height: 1.7"
        >
          ทักษะที่เด็กรุ่นใหม่ต้องมีในศตวรรษที่ 21
        </div>
        <div>
          <q-list>
            <div class="text-h5 q-mt-md">Soft Skills 🧑🏻‍🎓</div>

            <q-item v-for="item in softSkills[0].children" :key="item.title">
              <q-item-section>
                <q-item-label class="text-h6"
                  >✔︎ {{ item.title }}</q-item-label
                >
                <q-item-label caption
                  ><span class="text-body2">
                    {{ item.description }}
                  </span></q-item-label
                >
              </q-item-section>
            </q-item>
            <div class="text-h5 q-mt-md">Hard Skills ⚙️</div>
            <q-item v-for="item in hardSkills[0].children" :key="item.title">
              <q-item-section>
                <q-item-label class="text-h6"
                  >✔︎ {{ item.title }}</q-item-label
                >
                <q-item-label caption
                  ><span class="text-body2">
                    {{ item.description }}
                  </span></q-item-label
                >
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </section>
  </q-page>
  <footer class="q-py-md bg-grey-4">
    <div class="text-center">
      © 2025 Burapha University. Skill Mapping. All Rights Reserved.
    </div>
  </footer>
</template>

<script setup lang="ts">
import AppHeader from 'src/components/AppHeader.vue';

// import { useI18n } from 'vue-i18n';

// const { t } = useI18n();

defineOptions({
  name: 'LandingPage',
});

type OutcomeLearn = {
  title: string;
  fullName: string;
};

type Skill = {
  title: string;
  description?: string;
  children?: Skill[];
};

const outcomes: OutcomeLearn[] = [
  { title: 'PLOs', fullName: 'Program Learning Outcomes' },
  { title: 'CLOs', fullName: 'Course Learning Outcomes' },
];

const softSkills: Skill[] = [
  {
    title: 'Soft Skills',
    children: [
      {
        title: 'Critical Thinking and Problem Solving',
        description: 'ทักษะด้านการคิดอย่างมีวิจารณญาณ และทักษะในการแก้ปัญหา',
      },
      {
        title: 'Creativity and Innovation',
        description: 'ทักษะด้านการสร้างสรรค์ และนวัตกรรม',
      },
      {
        title: 'Cross-cultural',
        description: 'ทักษะด้านความเข้าใจความต่างวัฒนธรรม ต่างกระบวนทัศน์',
      },
      {
        title: 'Collaboration, Teamwork and Leadership',
        description: 'ทักษะด้านความร่วมมือ การทำงานเป็นทีม และภาวะผู้นำ',
      },
      {
        title: 'Communications, Information, and Media Literacy',
        description: 'ทักษะด้านการสื่อสารสารสนเทศ และรู้เท่าทันสื่อ',
      },
      {
        title: 'Computing and ICT Literacy',
        description: 'ทักษะด้านคอมพิวเตอร์ และเทคโนโลยีสารสนเทศและการสื่อสาร',
      },
      {
        title: 'Career and Learning Skills',
        description: 'ทักษะอาชีพ และทักษะการเรียนรู้',
      },
      {
        title: 'Compassion',
        description: 'มีความเมตตากรุณา มีคุณธรรม และระเบียบวินัย',
      },
    ],
  },
];

const hardSkills: Skill[] = [
  {
    title: 'Hard Skills',
    children: [
      {
        title: 'Reading',
        description: 'อ่านจับใจความได้ มีนิสัยรักการอ่าน',
      },
      {
        title: 'Writing',
        description: 'สามารถสื่อสารได้ สรุปใจความสำคัญได้',
      },
      {
        title: 'Arithmetic',
        description: 'คิดเลขเป็น มีทักษะในการคิดแบบนามธรรม',
      },
    ],
  },
];
</script>
