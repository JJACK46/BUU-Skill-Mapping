<template>
  <q-page class="q-pa-sm">
    <!-- Curriculum Header -->
    <div class="text-h4 q-mb-lg text-primary">{{ curriculum.name }}</div>

    <!-- Curriculum Details -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Curriculum Details</div>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>English Name</q-item-label>
              <q-item-label caption>{{ curriculum.engName }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Degree</q-item-label>
              <q-item-label caption
                >{{ curriculum.degree }} ({{
                  curriculum.engDegree
                }})</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Description</q-item-label>
              <q-item-label caption>{{ curriculum.description }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Duration</q-item-label>
              <q-item-label caption>{{ curriculum.period }} years</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Minimum Grade</q-item-label>
              <q-item-label caption>{{ curriculum.minimumGrade }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">PLOs</div>
        <q-list>
          <q-item v-for="(plo, index) in curriculum.plos" :key="plo.id">
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
      </q-card-section>
    </q-card>

    <!-- Subjects Section -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">Subjects</div>
        <q-list separator>
          <q-item v-for="subject in curriculum.subjects" :key="subject.id">
            <div class="row full-width q-py-sm items-start">
              <!-- Subject ID and Details Column -->
              <div class="col-12 col-md-2">
                <div class="text-weight-medium">{{ subject.id }}</div>
                <div class="text-caption text-grey">
                  {{ subject.credit }} units
                </div>
                <div class="text-caption text-grey q-mt-xs">
                  {{ subject.type }}
                </div>
              </div>

              <!-- Subject Names Column -->
              <div class="col-12 col-md-4">
                <div class="text-weight-medium">{{ subject.engName }}</div>
                <div class="text-weight-thin">{{ subject.name }}</div>
              </div>

              <!-- Description Column -->
              <div class="col-12 col-md-6">
                <div class="text-caption">{{ subject.description }}</div>
              </div>
            </div>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- Skills Section -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Skills</div>
        <q-list>
          <q-item v-for="skill in curriculum.skills" :key="skill.id">
            <q-item-section>
              <q-item-label>{{ skill.name }}</q-item-label>
              <q-item-label caption>{{ skill.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- Coordinators Section -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Instructors</div>
        <q-list>
          <q-item
            v-for="coordinator in curriculum.coordinators"
            :key="coordinator.id"
          >
            <q-item-section avatar class="q-mr-sm">
              <q-avatar>
                <img :src="coordinator.picture" :alt="coordinator.name" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label
                >{{ coordinator.name }} ({{
                  coordinator.engName
                }})</q-item-label
              >
              <q-item-label caption>{{ coordinator.position }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label caption>
                Email: {{ coordinator.email }}</q-item-label
              >
              <q-item-label caption>
                Specialists: {{ coordinator.specialists }}</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Example curriculum data (replace with your actual data)
const curriculum = ref({
  id: '25480191107226',
  name: 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์',
  engName: 'Bachelor of Science Program in Computer Science',
  degree: 'วิทยาศาสตรบัณฑิต',
  engDegree: 'Bachelor of Science',
  description: 'จํานวนหน่วยกิตรวมตลอดหลักสูตร ไม่น้อยกว่า 123 หน่วยกิต',
  period: 4,
  minimumGrade: 3,
  plos: [
    {
      id: '1',
      description:
        'Description for PLO 1  สามารถวิเคราะห์ปัญหาและออกแบบสำหรับพัฒนาซอฟต์แวร์อัจฉริยะ',
    },
    {
      id: '2',
      description:
        'Description for PLO 2  สามารถต่อยอดองค์ความรู้ทางด้านซอฟต์แวร์อัจฉริยะได้ด้วยตนเอง',
    },
    {
      id: '3',
      description:
        'Description for PLO 3 มีวินัย ตรงต่อเวลา มีจรรยาบรรณทางวิชาการและวิชาชีพ เคารพกฎระเบียบและข้อบังคับต่าง ๆ ขององค์กรและสังคม',
    },
  ],
  subjects: [
    {
      id: '1',
      name: 'หลักโปรแกรมพื้นฐาน',
      engName: 'Programming',
      description: 'Introduction to programming concepts.',
      credit: '1 (2-2-3)',
      type: 'บังคับ',
    },
    {
      id: '2',
      name: 'โครงสร้างข้อมูล',
      engName: 'Data Structures',
      description: 'Learn about data structures and algorithms.',
      credit: '3 (3-0-6)',
      type: 'บังคับ',
    },
    {
      id: '3',
      name: 'ภาษาพื้นฐาน',
      engName: 'Fundamental Language',
      description:
        'Learn the fundamentals of programming languages, including C, Java, Python, and SQL.', // Add this line
      credit: '3 (3-0-6)',
      type: 'บังคับ',
    },
    {
      id: '4',
      name: 'การบริหารสุขภาวะทางกาย',
      engName: 'Physical Well-being Management',
      description:
        'Concepts and guidelines for maintaining in good physical and mental healthgood shape; exercise; food consumption; medicine; behavior and environmental riskspreventions; family life planning', // Add this line
      credit: '2 (1-2-3)',
      type: 'บังคับ',
    },
  ],
  coordinators: [
    {
      id: 1,
      name: 'วิค',
      engName: 'Vic',
      tel: '0999999999',
      picture: 'https://i.pravatar.cc/300',
      position: 'รองศาสตราจารย์',
      email: 'Vic@go.bu.ac.th',
      officeRoom: 'IF900',
      specialists: 'Machine Learning, Software Engineering, Deep Learning',
      socials: '-',
      bio: null,
    },
    {
      id: 7,
      name: 'ปัญญา',
      engName: 'Panya',
      tel: '0776545454',
      picture: 'https://i.pravatar.cc/400',
      position: 'ผู้ช่วยศาสตราจารย์',
      email: 'panya@go.buu.ac.th',
      officeRoom: 'IF900',
      specialists: 'Deep Learning, Machine Learning',
      socials: '-',
      bio: null,
    },
  ],
  skills: [
    {
      id: 1,
      name: 'Programming',
      description: 'Ability to write and understand code.',
      domain: 'Cognitive',
      parent: [],
      children: [],
    },
    {
      id: 2,
      name: 'Problem Solving',
      description: 'Ability to solve complex problems.',
      domain: 'Cognitive',
      parent: [],
      children: [],
    },
  ],
});
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
