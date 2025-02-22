<template>
  <q-page :padding="$q.screen.lt.md">
    <q-header class="bg-primary" reveal :reveal-offset="20">
      <q-toolbar class="container">
        <q-toolbar-title>
          <router-link
            to="/"
            class="cursor-pointer text-grey-10"
            style="text-decoration: none"
          >
            <q-img
              src="logos/buu-white.svg"
              alt="logo"
              height="auto"
              width="50px"
              fit="contain"
            >
            </q-img>
            <span class="q-ml-sm text-weight-bold text-white"
              >Skill Mapping</span
            >
          </router-link>
        </q-toolbar-title>
        <q-btn
          v-if="!auth.getAccessToken"
          label="login"
          to="/login"
          outline
          class="text-bold"
          color="white"
        />
        <q-btn
          v-if="auth.getAccessToken"
          label="app"
          to="/"
          outline
          class="text-bold"
          color="white"
        />
      </q-toolbar>
    </q-header>
    <section
      class="flex justify-around items-center container"
      :style="{
        padding: $q.screen.lt.md ? '50px 0' : '100px 0',
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
        src="landing/gen1.webp"
        alt="image"
        :draggable="false"
        :width="$q.screen.lt.md ? '300px' : '400px'"
        :img-style="{ borderRadius: '10px' }"
        height="auto"
        id="custom-img-card"
        fit="cover"
      />
    </section>
    <section
      class="bg-secondary q-pa-xl fit"
      :style="{ borderRadius: '100px 100px 0 0' }"
    >
      <div
        :class="[
          'text-center text-white text-weight-medium',
          $q.screen.lt.md ? 'text-h5' : 'text-h3',
        ]"
      >
        จัดการการศึกษาโดยมุ่งเน้นผลลัพธ์ของผู้เรียน
      </div>
      <div class="flex justify-center q-gutter-xl q-mt-sm">
        <div v-for="item in outcomes" :key="item.title">
          <CustomCard
            :head-text="item.title"
            :sub-text="item.name"
            hide-options
            hide-actions
          >
            <template #body>
              <div class="text-grey-9">
                {{ item.description }}
              </div>
            </template>
          </CustomCard>
        </div>
      </div>
    </section>

    <section
      class="flex justify-evenly items-center"
      :style="{ margin: '100px 0' }"
    >
      <q-img
        v-if="!$q.screen.lt.md"
        src="landing/gen2.webp"
        alt="image"
        id="custom-img-card-2"
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
    <footer class="q-py-md bg-dark">
      <div class="container text-white">
        <div class="flex justify-around items-center">
          <q-card flat class="bg-grey-9 q-pa-md">
            <div class="text-weight-medium">Contact</div>
            <q-list>
              <q-item>
                <q-item-section>Email: informatics@go.buu.ac.th</q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
        <div class="text-center q-mt-lg">
          © 2025 Burapha University. Skill Mapping. All Rights Reserved.
          <br />
        </div>
      </div>
    </footer>
  </q-page>
</template>

<script setup lang="ts">
import CustomCard from 'src/components/CustomCard.vue';
import { useAuthStore } from 'src/stores/auth';

// import { useI18n } from 'vue-i18n';

// const { t } = useI18n();

defineOptions({
  name: 'LandingPage',
});

type OutcomeLearn = {
  title: string;
  name: string;
  description: string;
};

type Skill = {
  title: string;
  description?: string;
  children?: Skill[];
};

const auth = useAuthStore();

const outcomes: OutcomeLearn[] = [
  {
    title: 'PLOs',
    name: 'Program Learning Outcomes',
    description:
      'ผลการเรียนรู้ที่คาดหวังของหลักสูตร มีจุดประสงค์เพื่อระบุว่าเมื่อจบหลักสูตรแล้ว นักศึกษาจะบรรลุผลการเรียนรู้อะไรบ้าง',
  },
  {
    title: 'CLOs',
    name: 'Course Learning Outcomes',
    description: 'ผลการเรียนรู้ในระดับรายวิชา ซึ่งรวมถึงกิจกรรมการเรียนการสอน',
  },
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

<style scoped>
.custom-bg {
  background: url('backdrop/hero.webp');
}
#custom-img-card {
  border-radius: 10px;
  box-shadow: 0 12px 50px 2px rgba(36, 105, 243, 0.5);
}
#custom-img-card-2 {
  border-radius: 10px;
  box-shadow: 0 12px 50px 2px rgba(187, 209, 246, 0.5);
}
</style>
