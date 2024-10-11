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
  id: '',
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
  (newVal) => {
    localVisible.value = newVal;
    if (props.item) {
      skillStore.fetchSkill(props.item.id);
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
    <q-card class="q-pa-md" style="min-width: 200px; max-width: 1000px">
      <q-card-section>
        <div class="row items-center">
          <q-col cols="11">
            <p style="font-size: 20px">{{ skills.name }}</p>
          </q-col>
          <q-col cols="1" align="right">
            <q-btn flat round icon="close" @click="closeDialog" />
          </q-col>
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="inputSkill.name"
          label="Name"
          maxlength="10"
          hide-bottom-space
          dense
          outlined
        ></q-input>

        <q-input
          v-model="inputSkill.description"
          label="Description"
          maxlength="10"
          hide-bottom-space
          dense
          outlined
          class="q-mt-md"
        ></q-input>

        <q-select
          v-model="inputSkill.domain"
          label="Skill Type"
          :options="['ความรู้', 'คุณลักษณะบุคคล', 'จริยธรรม', 'ทักษะ']"
          outlined
          dense
          class="q-mt-md"
        ></q-select>
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
        <q-btn flat label="Cancel" color="negative" @click="closeDialog" />
        <q-btn flat label="Save" color="primary" @click="saveSkill" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
