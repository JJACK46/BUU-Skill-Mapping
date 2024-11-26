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
            <q-menu context-menu touch-position auto-close>
              <q-list dense style="min-width: 100px">
                <q-item
                  v-show="props.node.isFaculty"
                  clickable
                  @click="
                    store.toggleDialog({
                      title: 'New Branch',
                      form: props.node,
                    })
                  "
                >
                  <q-item-section side>
                    <q-icon
                      size="16px"
                      name="subdirectory_arrow_right"
                    ></q-icon>
                  </q-item-section>
                  <q-item-section>{{ t('newBranch') }}</q-item-section>
                </q-item>
                <q-item
                  clickable
                  @click="
                    store.toggleDialog({
                      form: props.node,
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
                  @click="
                    store.handleRemove({
                      id: props.node.id,
                      node: props.node,
                    })
                  "
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
        <template #default-body="node">
          <q-td v-show="node.node.engName" class="text-body2 q-pl-lg">
            {{ node.node.engName }} {{ node.node?.abbrev }}
          </q-td>
        </template>
      </q-tree>
    </q-card>
    <!-- Dialog -->
    <DialogForm
      :title="store.titleForm"
      v-model="store.dialogState"
      @save="store.handleSave"
    >
      <template #body>
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
      </template>
    </DialogForm>
  </q-page>
</template>

<script lang="ts" setup>
import DialogForm from 'src/components/DialogForm.vue';
import MainHeader from 'src/components/Header/main-header.vue';
import { useFacultyStore } from 'src/stores/faculty';
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
