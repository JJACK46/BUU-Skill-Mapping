<script setup lang="ts">
import { computed, ref } from 'vue';
import { type TitleFormSkill, useSkillStore } from 'src/stores/skill';
import DialogForm from 'src/components/DialogForm.vue';
import { LearningDomain } from 'src/data/learning_domain';
import { requireField } from 'src/utils/field-rules';
import { QTree, useMeta, useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useCurriculumStore } from 'src/stores/curriculum';
import type { Skill } from 'src/types/skill';

const q = useQuasar();
const store = useSkillStore();
const curr = useCurriculumStore();
const { t } = useI18n();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const searchText = ref('');

// Get all node IDs to expand initially
const expandedNodes = computed(() => {
  const getAllNodeIds = (nodes) =>
    nodes.reduce(
      (ids, node) => [
        ...ids,
        node.name,
        ...(node.children ? getAllNodeIds(node.children) : []),
      ],
      [],
    );
  return getAllNodeIds(curr.getSkills);
});

const insertSkill = (sk: Skill) => {
  if (!curr.form.skills) {
    curr.form.skills = [];
  }
  const index = curr.form.skills.findIndex((s) => s.name === sk.name);
  if (index >= 0) {
    curr.form.skills.splice(index, 1, sk);
  } else {
    curr.form.skills.push(sk);
  }
};

const insertSubSkill = (sk: Skill, parentName: string) => {
  const index = curr.form.skills.findIndex((s) => s.name === parentName);
  if (index > -1) {
    const parent = curr.form.skills[index];
    if (parent.children) {
      curr.form.skills[index].children.push(sk);
    } else {
      parent.children = [sk];
    }
  }
};

const handleAdd = (title: TitleFormSkill) => {
  if (title === 'Insert Sub-Skill') {
    insertSubSkill(store.form as Skill, store.getParentName);
  }
  if (title === 'New Skill') {
    insertSkill(store.form as Skill);
  }
  store.dialogForm = false;
};

const handleRemove = (name: string) => {
  if (!Array.isArray(curr.form.skills)) return;

  const deepFilter = (skills: Skill[], nameToRemove: string): Skill[] =>
    skills
      .map((skill) => ({
        ...skill,
        children: skill.children
          ? deepFilter(skill.children, nameToRemove)
          : [],
      }))
      .filter((skill) => skill.name !== nameToRemove);

  q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to delete this item?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    const filteredSkills = deepFilter(curr.form.skills, name);
    curr.form.skills.splice(0, curr.form.skills.length, ...filteredSkills);
  });
};

useMeta({
  title: title.value,
});
</script>

<template>
  <q-page>
    <!-- Page Title -->
    <div class="text-h4 text-primary q-py-md">
      {{ t('Skill Management') }}
    </div>
    <!-- Operator -->
    <div class="flex justify-end">
      <div class="flex q-gutter-x-sm">
        <q-input
          outlined
          clearable
          v-model="searchText"
          @keyup.enter="$emit('enterSearch')"
          :label="t('search')"
          class="col rounded-borders"
          bg-color="white"
          dense
          debounce="500"
          style="width: 300px"
        >
          <template #prepend>
            <q-icon name="search"></q-icon>
          </template>
        </q-input>
        <q-btn
          @click="store.toggleDialog({ title: 'New Skill' })"
          color="primary"
          :label="t('add')"
          style="width: 80px"
          unelevated
        >
        </q-btn>
      </div>
    </div>

    <!-- Content -->
    <q-card flat bordered class="q-animate--fade q-my-md">
      <q-tree
        :nodes="curr.getSkills"
        node-key="name"
        class="q-pa-sm"
        :no-nodes-label="t('noData')"
        :expanded="expandedNodes"
      >
        <template v-slot:default-header="props">
          <q-tr class="full-width q-py-xs hover-row" style="cursor: pointer">
            <!-- Header -->
            <q-td style="user-select: none">
              <span class="text-body1">
                {{ props.node.name }}
              </span>
            </q-td>
            <q-td class="q-gutter-x-sm">
              <q-btn
                @click="store.toggleDialog({ form: props.node, title: 'View' })"
                icon="info"
                padding="none"
                class="hover-btn"
                flat
              ></q-btn>
              <q-btn
                @click="
                  store.toggleDialog({
                    parent: props.node,
                    title: 'Insert Sub-Skill',
                  })
                "
                icon="arrow_left"
                padding="none"
                class="hover-btn"
                flat
              ></q-btn>
              <q-btn
                @click="
                  store.toggleDialog({ form: props.node, title: 'Edit Skill' })
                "
                icon="edit"
                padding="none"
                class="hover-btn"
                flat
              ></q-btn>
              <q-btn
                @click="handleRemove(props.node.name)"
                icon="delete"
                padding="none"
                class="hover-btn"
                flat
              ></q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-tree>
    </q-card>

    <!-- All in One Dialog -->
    <DialogForm
      :title="store.getTitleForm"
      @save="handleAdd(store.getTitleForm)"
      v-model="store.dialogForm"
    >
      <q-input
        v-model="store.form.name"
        :label="t('name') + ' *'"
        outlined
        :rules="[requireField]"
      />
      <q-select
        :options="Object.values(LearningDomain)"
        v-model="store.form.domain"
        label="Domain *"
        outlined
        :rules="[requireField]"
      />
      <q-input
        v-model="store.form.description"
        :label="t('description') + ' *'"
        outlined
        type="textarea"
        :rules="[requireField]"
      />
    </DialogForm>
  </q-page>
</template>

<style lang="scss">
.hover-row:hover {
  color: $secondary;
}
.hover-btn {
  color: $grey-6;
}
.hover-btn:hover {
  color: $grey-5;
}
</style>
