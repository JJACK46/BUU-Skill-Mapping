<template>
  <q-page padding>
    <MainHeader
      v-model:search-text="store.search"
      @open-dialog="store.toggleDialog({ title: 'New Faculty' })"
      hide-filter
      @enter-search="store.fetchData"
    />
    <!-- Content -->
    <q-tree
      :nodes="store.getFaculties"
      node-key="thaiName"
      children-key="branch"
      :no-nodes-label="t('noData')"
    >
      <template #default-header="props">
        <q-tr class="full-width q-py-xs hover-row cursor-pointer">
          <q-td>
            <span class="text-body1">{{ props.node.thaiName }} </span>
          </q-td>
          <q-td class="q-gutter-x-sm">
            <q-btn
              @click="
                store.toggleDialog({
                  form: props.node,
                  title: 'New Branch',
                })
              "
              icon="arrow_left"
              padding="none"
              class="hover-btn"
              flat
            ></q-btn>
            <q-btn
              @click="
                store.toggleDialog({
                  form: props.node,
                })
              "
              icon="edit"
              padding="none"
              class="hover-btn"
              flat
            ></q-btn>
            <q-btn
              @click="
                store.handleRemove({ id: props.node.id, node: props.node })
              "
              icon="delete"
              padding="none"
              class="hover-btn"
              flat
            ></q-btn>
          </q-td>
          <ContextMenu
            :custom-create="{
              label: t('newBranch'),
              icon: 'subdirectory_arrow_right',
            }"
            :create-fn="
              () =>
                store.toggleDialog({
                  title: 'New Branch',
                  form: props.node,
                })
            "
            :edit-fn="
              () => {
                store.toggleDialog({
                  form: props.node,
                });
              }
            "
            :delete-fn="
              () => {
                store.handleRemove({
                  id: props.node.id,
                  node: props.node,
                });
              }
            "
          ></ContextMenu>
        </q-tr>
      </template>
      <template #default-body="node">
        <q-td v-show="node.node.engName" class="text-body2 q-pl-lg">
          {{ node.node?.abbrev }} | {{ node.node.engName }}
        </q-td>
      </template>
    </q-tree>
    <!-- pagination -->
    <div class="flex q-my-lg" v-show="store.getMaxPage > 1">
      <q-pagination
        class="q-mx-auto"
        v-model="store.pagination!.page!"
        @update:model-value="store.fetchData()"
        :max="store.getMaxPage"
        direction-links
      />
    </div>
    <!-- Dialog -->
    <DialogForm
      :title="t(store.titleForm)"
      v-model="store.dialogState"
      @save="store.handleSave"
      :cta-text="computedCtaText"
      :json="store.getJsonForm"
    >
      <div>
        <!-- Faculty -->
        <div class="q-gutter-y-md" v-if="store.isFacultyForm">
          <q-input
            outlined
            dense
            :label="t('name')"
            v-model="store.formFaculty.thaiName"
            :rules="[requireField, onlyThai]"
          />
          <q-input
            outlined
            dense
            :label="t('engName')"
            v-model="store.formFaculty.engName"
            :rules="[requireField, onlyEnglish]"
          />
          <q-input
            outlined
            dense
            label="Abbreviation"
            hint="Optional"
            v-model="store.formFaculty.abbrev"
          />
          <q-input
            outlined
            dense
            :label="t('description')"
            hint="Optional"
            type="textarea"
            counter
            maxlength="500"
            v-model="store.formFaculty.thaiDescription"
          />
          <q-input
            outlined
            dense
            :label="t('englishDescription')"
            hint="Optional"
            type="textarea"
            counter
            maxlength="500"
            v-model="store.formFaculty.engDescription"
          />
        </div>
        <!-- Branch -->
        <div class="q-gutter-y-md" v-if="!store.isFacultyForm">
          <q-input
            outlined
            dense
            :label="t('name')"
            v-model="store.formBranch.thaiName"
            :rules="[requireField, onlyThai]"
          />
          <q-input
            outlined
            dense
            :label="t('engName')"
            v-model="store.formBranch.engName"
            :rules="[requireField, onlyEnglish]"
          />
          <q-input
            outlined
            dense
            :label="t('abbrev')"
            hint="Optional"
            v-model="store.formBranch.abbrev"
          />
          <q-input
            outlined
            dense
            :label="t('description')"
            type="textarea"
            counter
            :rules="[requireField]"
            maxlength="500"
            v-model="store.formBranch.thaiDescription"
          />
          <q-input
            outlined
            dense
            :label="t('englishDescription')"
            hint="Optional"
            type="textarea"
            counter
            maxlength="500"
            v-model="store.formBranch.engDescription"
          />
        </div>
      </div>
    </DialogForm>
  </q-page>
</template>

<script lang="ts" setup>
import ContextMenu from 'src/components/ContextMenu.vue';
import DialogForm from 'src/components/DialogForm.vue';
import MainHeader from 'src/components/PageHeader.vue';
import { useFacultyStore } from 'src/stores/faculty-branch';
import { onlyEnglish, onlyThai, requireField } from 'src/utils/field-rules';
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const store = useFacultyStore();

const computedCtaText = computed(() => {
  if (store.titleForm === 'New Faculty') {
    return t('createFaculty');
  } else if (store.titleForm === 'New Branch') {
    return t('createBranch');
  }
  return undefined;
});

onMounted(async () => {
  await store.fetchData();
});
</script>

<style lang="scss">
.hover-row:hover {
  color: $secondary;
}
</style>
