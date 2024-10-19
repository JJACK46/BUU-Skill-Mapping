<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import skillService from 'src/services/skill';
import { useSkillStore } from 'src/stores/skills';
import type { Skill } from 'src/types/skill'; // Import ประเภท Skill

// ปรับประเภทของ props.item ให้ชัดเจนขึ้น
const props = defineProps<{ visible: boolean; item: Skill | null }>();
const emit = defineEmits(['close-dialog']);
const skillStore = useSkillStore();

const initialSkill: Skill = {
  id: 0,
  name: '',
  description: '',
  domain: '',
  parent: [],
  children: [],
  techSkills: [],
};

const inputSkill = ref<Skill>({ ...initialSkill });
const skills = computed(() => skillStore.editedSkill);
const localVisible = ref(props.visible);

watch(
  () => props.visible,
  async (newVal) => {
    localVisible.value = newVal;
    if (props.item) {
      try {
        await skillStore.fetchSkill(props.item.id);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    }
  }
);

function closeDialog() {
  skillStore.clearForm();
  emit('close-dialog');
}

async function saveSkill() {
  console.log(skills.value.id, skills.value.children);

  let skill = { ...inputSkill.value };
  const payload: { name: string; description: string; domain: string } = {
    name: skill.name,
    description: skill.description,
    domain: skill.domain,
  };

  await skillService.addSubSkill(skills.value.id, payload);
  closeDialog();
}

onMounted(async () => {
  await skillStore.fetchSkills();
  if (props.item) {
    console.log(props.item);
    skillStore.clearForm();
  }
});
</script>

<template>
  <q-dialog v-model="localVisible" persistent>
    <q-card class="q-pa-md" style="min-width: 1000px">
      <q-card-section>
        <div class="row justify-between">
          <div>
            <div style="font-size: 20px; margin-top: 6px">Add Sub Skill</div>
          </div>
          <div>
            <q-btn flat round icon="close" @click="closeDialog" />
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="row justify-between">
          <div class="col-6">
            <q-input
              v-model="inputSkill.name"
              label="Name"
              hide-bottom-space
              dense
              outlined
            ></q-input>
          </div>
          <div class="col-4">
            <q-select
              v-model="inputSkill.domain"
              label="Skill Type"
              :options="['ความรู้', 'คุณลักษณะบุคคล', 'จริยธรรม', 'ทักษะ']"
              outlined
              dense
            ></q-select>
          </div>
          <div class="col-12">
            <q-input
              v-model="inputSkill.description"
              type="textarea"
              label="Description"
              hide-bottom-space
              dense
              outlined
              class="q-mt-lg"
            ></q-input>
          </div>
        </div>
      </q-card-section>

      <!-- Sub Skill Treeview (Commented out as per the original code) -->
      <!-- <q-card-section>
        <q-tree
          :nodes="skills.children"
          node-key="id"
        >
          <template v-slot:default-header="props">
            <q-item>
              <q-item-section>{{ props.node.name }}</q-item-section>
              <q-item-section side>
                <q-btn flat round dense icon="close" @click="removeSubSkill(props.node.id)" />
              </q-item-section>
            </q-item>
          </template>
        </q-tree>
        <q-select
          v-model="subSkillInput"
          label="Sub Skill"
          :options="filterSkills()"
          outlined
          dense
          class="q-mt-md"
        ></q-select>
        <q-btn @click="addSubSkill" label="Add Sub Skill" class="q-mt-md" />
      </q-card-section> -->

      <q-card-actions align="right">
        <q-btn
          flat
          label="Cancel"
          color="negative"
          @click="closeDialog"
          style="width: 70px"
        />

        <q-btn
          flat
          label="Save"
          color="primary"
          @click="saveSkill"
          style="width: 70px"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
