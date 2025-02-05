<template>
  <q-page padding>
    <MainHeader
      v-model:search-text="store.search"
      @open-dialog="store.toggleDialog({ title: 'New Faculty' })"
      hide-filter
      @enter-search="store.fetchData"
    />
    <q-separator class="q-my-md" />
    <div class="q-py-md">
      <q-icon name="info" class="q-mr-sm" />{{
        t('Right click to open menu of each row')
      }}
    </div>
    <!-- Content -->
    <q-card flat bordered class="q-pa-md">
      <q-tree :nodes="store.getNodes" node-key="id" label-key="name">
        <template #default-header="props">
          <q-tr class="full-width q-py-xs hover-row cursor-pointer">
            <q-td>
              <span class="text-body1">{{ props.node.name }}</span>
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
            {{ node.node.engName }} {{ node.node?.abbrev }}
          </q-td>
        </template>
      </q-tree>
    </q-card>
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
      :title="store.titleForm"
      v-model="store.dialogState"
      @save="store.handleSave"
    >
      <!-- Faculty -->
      <q-input
        v-if="store.isFacultyForm"
        outlined
        dense
        label="Name *"
        v-model="store.formFaculty.name"
        :rules="[requireField, onlyThai]"
      />
      <q-input
        v-if="store.isFacultyForm"
        outlined
        dense
        label="English Name *"
        v-model="store.formFaculty.engName"
        :rules="[requireField, onlyEnglish]"
      />
      <q-input
        v-if="store.isFacultyForm"
        outlined
        dense
        label="Description"
        hint="Optional"
        v-model="store.formFaculty.description"
      />
      <q-input
        v-if="store.isFacultyForm"
        outlined
        dense
        label="Abbreviation"
        hint="Optional"
        v-model="store.formFaculty.abbrev"
      />
      <!-- Branch -->
      <q-input
        v-if="!store.isFacultyForm"
        outlined
        dense
        label="Name *"
        v-model="store.formBranch.name"
        :rules="[requireField, onlyThai]"
      />
      <q-input
        v-if="!store.isFacultyForm"
        outlined
        dense
        label="English Name *"
        v-model="store.formBranch.engName"
        :rules="[requireField, onlyEnglish]"
      />
      <q-input
        v-if="!store.isFacultyForm"
        outlined
        dense
        label="Description"
        hint="Optional"
        v-model="store.formBranch.description"
      />
      <q-input
        v-if="!store.isFacultyForm"
        outlined
        dense
        label="Abbreviation"
        hint="Optional"
        v-model="store.formBranch.abbrev"
      />
    </DialogForm>
  </q-page>
</template>

<script lang="ts" setup>
import ContextMenu from 'src/components/ContextMenu.vue';
import DialogForm from 'src/components/DialogForm.vue';
import MainHeader from 'src/components/PageHeader.vue';
import { useFacultyStore } from 'src/stores/faculty-branch';
import { onlyEnglish, onlyThai, requireField } from 'src/utils/field-rules';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const store = useFacultyStore();

onMounted(async () => {
  await store.fetchData();
});
</script>

<style lang="scss">
.hover-row:hover {
  color: $secondary;
}
</style>
