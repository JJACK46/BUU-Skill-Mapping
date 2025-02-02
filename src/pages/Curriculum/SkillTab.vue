<script setup lang="ts">
import { computed, ref } from 'vue';
import { useSkillStore } from 'src/stores/skill';
import DialogForm from 'src/components/DialogForm.vue';
import { LearningDomain } from 'src/types/learning-domain.enum';
import { requireField } from 'src/utils/field-rules';
import { QTree, useMeta } from 'quasar';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useCurriculumStore } from 'src/stores/curriculum';
import type { Skill } from 'src/types/skill';

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
  if (curr.form.skills.find((s) => s.id === sk.id)) {
    return;
  }
  curr.form.skills.push(sk);
  store.toggleDialog({});
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
                  store.toggleDialog({ form: props.node, title: 'Edit Skill' })
                "
                icon="edit"
                padding="none"
                class="hover-btn"
                flat
              ></q-btn>
              <q-btn
                @click="store.handleRemove({ id: props.node.id })"
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
      {{ curr.form }}
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
      @save="insertSkill(store.form as Skill)"
      v-model="store.dialogForm"
    >
      <template #body>
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
      </template>
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
