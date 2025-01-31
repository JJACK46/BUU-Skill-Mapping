<script setup lang="ts">
import { computed, ref } from 'vue';
import { useSkillStore } from 'src/stores/skill';
import DialogForm from 'src/components/DialogForm.vue';
import { LearningDomain } from 'src/types/learning-domain.enum';
import { requireField } from 'src/utils/field-rules';
import { useMeta } from 'quasar';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { Skill } from 'src/types/skill';

const store = useSkillStore();
const { t } = useI18n();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const searchText = ref('');

const mock = ref<Skill[]>([
  {
    id: 1,
    name: 'Skill 1',
    domain: LearningDomain.Psychomotor,
    description: 'some info 1',
    children: [
      {
        id: 2,
        name: 'Sub-Skill 1',
        domain: LearningDomain.Psychomotor,
        description: 'some info 2',
      },
      {
        id: 3,
        name: 'Sub-Skill 3',
        domain: LearningDomain.Psychomotor,
        description: 'some info 3',
      },
    ],
  },
]);

useMeta({
  title: title.value,
});
</script>

<template>
  <q-page>
    <!-- Page Title -->
    <div class="text-h4 q-mb-lg">{{ t('Skill Management') }}</div>
    <!-- Operator -->
    <div class="flex justify-between">
      <div>
        <q-btn
          @click="store.toggleDialog({ title: 'New Skill' })"
          color="primary"
          :label="t('add')"
          style="width: 80px"
          unelevated
        >
        </q-btn>
      </div>
      <div>
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
      </div>
    </div>

    <!-- Content -->
    <q-card flat bordered class="q-animate--fade q-my-md">
      <q-tree :nodes="mock" node-key="id" class="q-pa-sm" default-expand-all>
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
    <!-- All in One Dialog -->
    <DialogForm
      :title="store.getTitleForm"
      @save="store.handleSave()"
      v-model="store.dialogForm"
    >
      <template #body>
        <q-input
          v-model="store.form.id"
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
        <q-select
          :options="
            mock
              .filter((item) => item.id !== store.form.id)
              .concat(mock.flatMap((item) => item.children))
          "
          multiple
          v-model="store.form.children"
          option-label="name"
          label="Sub-Skills"
          outlined
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
