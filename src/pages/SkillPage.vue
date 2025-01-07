<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useSkillStore } from 'src/stores/skill';
import DialogForm from 'src/components/DialogForm.vue';
import { LearningDomain } from 'src/types/learning-domain.enum';
import { requireField } from 'src/utils/field-rules';
import { useMeta } from 'quasar';
import { useRoute } from 'vue-router';
import MainHeader from 'src/components/Header/main-header.vue';
import { useI18n } from 'vue-i18n';
import ContextMenu from 'src/components/ContextMenu.vue';

const store = useSkillStore();
const { t } = useI18n();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
onMounted(store.fetchData);
useMeta({
  title: title.value,
});
</script>

<template>
  <q-page padding>
    <MainHeader
      v-model:search-text="store.search"
      :label-search="`${t('search')}`"
      @open-dialog="store.toggleDialog({ title: 'New Skill' })"
      @enter-search="store.fetchData"
    />
    <q-separator class="q-my-md" />
    <!-- Top -->
    <div class="q-py-md">
      <q-icon name="info" class="q-mr-sm" />{{
        t('Right click to open menu of each row')
      }}
    </div>
    <q-toggle v-model="store.onlyHaveSubs">{{
      t('showOnlyWithSubSkill')
    }}</q-toggle>
    <!-- Content -->
    <q-card flat bordered class="q-animate--fade">
      <q-tree :nodes="store.getSkills" node-key="id" class="q-pa-sm">
        <template v-slot:default-header="props">
          <q-tr class="full-width q-py-xs hover-row" style="cursor: pointer">
            <!-- Header -->
            <q-td style="user-select: none">
              <span class="text-body1">
                {{ props.node.name }}
              </span>
            </q-td>
            <ContextMenu
              :custom-create="{
                label: t('insertSubSkill'),
                icon: 'subdirectory_arrow_right',
              }"
              :create-fn="
                () =>
                  store.toggleDialog({
                    title: 'Insert Sub-Skill',
                    parentId: props.node.id,
                  })
              "
              :edit-fn="
                () =>
                  store.toggleDialog({ form: props.node, title: 'Edit Skill' })
              "
              :delete-fn="() => store.handleRemove({ id: props.node.id })"
            ></ContextMenu>
          </q-tr>
        </template>
      </q-tree>
    </q-card>
    <div class="flex q-my-lg" v-show="store.getMaxPage > 1">
      <q-pagination
        class="q-mx-auto"
        v-model="store.pagination!.page!"
        @update:model-value="store.fetchData()"
        :max="store.getMaxPage"
        direction-links
      />
    </div>
    <!-- All in One Dialog -->
    <DialogForm
      :title="store.getTitleForm"
      @save="store.handleSave"
      v-model="store.dialogForm"
    >
      <template #body>
        <q-input
          v-show="store.parentId"
          v-model="store.parentId"
          label="Parent ID - Readonly"
          borderless
          readonly
        />
        <q-input
          v-show="store.form.id"
          v-model="store.form.id"
          label="ID - Readonly"
          borderless
          readonly
        />
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
</style>
