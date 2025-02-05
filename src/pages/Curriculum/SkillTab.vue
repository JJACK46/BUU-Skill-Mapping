<script setup lang="ts">
import { computed, ref } from 'vue';
import { useSkillStore } from 'src/stores/skill';
import DialogForm from 'src/components/DialogForm.vue';
import { LearningDomain } from 'src/types/learning-domain.enum';
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
        node.id,
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
  const index = curr.form.skills.findIndex((s) => s.id === sk.id);
  if (index >= 0) {
    curr.form.skills.splice(index, 1, sk);
  } else {
    curr.form.skills.push(sk);
  }
};

const insertSubSkill = (sk: Skill, parentId: number) => {
  const index = curr.form.skills.findIndex((s) => s.id === parentId);
  if (index >= 0) {
    const parent = curr.form.skills[index];
    if (parent.children) {
      curr.form.skills[index].children.push(sk);
    } else {
      curr.form.skills[index].children = [sk];
    }
  }
};

const handleSave = (title: string) => {
  if (title === 'Insert Sub-Skill') {
    insertSubSkill(store.form as Skill, store.parentId as number);
  }
  if (title === 'New Skill') {
    insertSkill(store.form as Skill);
  }
  store.dialogForm = false;
};

const handleRemove = (id: number) => {
  const deepFilter = (skills, idToRemove) => {
    return skills.reduce((acc, skill) => {
      if (skill.id !== idToRemove) {
        if (skill.children) {
          skill.children = deepFilter(skill.children, idToRemove);
        }
        acc.push(skill);
      }
      return acc;
    }, []);
  };

  q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to delete this item?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    curr.form.skills = deepFilter(curr.form.skills, id);
  });
};

useMeta({
  title: title.value,
});
</script>

<template>
  <q-page>
    <!-- Page Title -->
    <div class="text-h4 text-primary">
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
        node-key="id"
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
                    parentId: props.node.id,
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
                @click="handleRemove(props.node.id)"
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
    <div class="flex justify-end">
      <q-btn
        :label="t('save')"
        @click="curr.handleSave()"
        color="primary"
        unelevated
      ></q-btn>
    </div>

    <!-- All in One Dialog -->
    <DialogForm
      :title="store.getTitleForm"
      @save="handleSave(store.getTitleForm)"
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
