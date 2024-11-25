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
    <!-- Content -->
    <q-card flat bordered class="q-animate--fade">
      <q-tree :nodes="store.skills" node-key="id" class="q-pa-sm">
        <template v-slot:default-header="props">
          <q-tr class="full-width q-py-xs hover-row" style="cursor: pointer">
            <!-- Header -->
            <q-td style="user-select: none">
              <span class="text-body1">
                {{ props.node.name }}
              </span>
            </q-td>
            <!-- Context Menu -->
            <q-menu context-menu touch-position auto-close>
              <q-list dense style="min-width: 100px">
                <q-item
                  clickable
                  @click="
                    store.toggleDialog({
                      title: 'Insert Sub-Skill',
                      parentId: props.node.id,
                    })
                  "
                >
                  <q-item-section side>
                    <q-icon
                      size="16px"
                      name="subdirectory_arrow_right"
                    ></q-icon>
                  </q-item-section>
                  <q-item-section>{{ t('insertSubSkill') }}</q-item-section>
                </q-item>
                <q-item
                  clickable
                  @click="
                    store.toggleDialog({
                      form: props.node,
                      title: 'Edit Skill',
                    })
                  "
                >
                  <q-item-section side>
                    <q-icon size="16px" name="edit"></q-icon>
                  </q-item-section>
                  <q-item-section>{{ t('edit') }}</q-item-section>
                </q-item>
                <q-item
                  clickable
                  @click="store.handleRemove({ id: props.node.id })"
                >
                  <q-item-section side>
                    <q-icon size="16px" name="delete"></q-icon>
                  </q-item-section>
                  <q-item-section>{{ t('delete') }}</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section side>
                    <q-icon size="16px" name="close"></q-icon>
                  </q-item-section>
                  <q-item-section>{{ t('quit') }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-tr>
        </template>
      </q-tree>
    </q-card>
    <div class="flex q-my-lg" v-show="store.getMaxPage > 1">
      <q-pagination
        class="q-mx-auto"
        v-model="store.pagination!.page!"
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
          v-show="store.getParentId"
          v-model="store.getParentId"
          label="Parent ID"
          hint="Readonly"
          outlined
          readonly
        >
        </q-input>
        <q-input
          v-model="store.form.id"
          v-show="store.form.id"
          label="ID"
          outlined
          readonly
          hint="Readonly"
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
