<script lang="ts" setup>
import { QTableColumn, useMeta } from 'quasar';
import DialogForm from 'src/components/DialogForm.vue';
import MainHeader from 'src/components/Header/main-header.vue';
import { UserRole } from 'src/enums/roles';
import { useAuthStore } from 'src/stores/auth';
import { useGlobalStore } from 'src/stores/global';
import { useUserStore } from 'src/stores/user';
import { requireField } from 'src/utils/field-rules';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
const { t } = useI18n();
const auth = useAuthStore();
const store = useUserStore();
const route = useRoute();
const title = computed(() => route.matched[1].name as string);
const global = useGlobalStore();

const columns = ref(<QTableColumn[]>[
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'left',
    sortable: true,
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    align: 'left',
  },
  {
    name: 'role',
    label: 'Role',
    field: 'role',
    align: 'left',
  },
]);

watch(
  () => store.search,
  () => {
    store.fetchData();
  }
);

useMeta({
  title: title.value,
});
</script>

<template>
  <q-page padding>
    <MainHeader
      v-model:search-text="store.search"
      @open-dialog="store.toggleDialog({ title: 'New User' })"
      @enter-search="store.fetchData"
      hide-filter
    />
    <q-separator class="q-my-md" />
    <!-- Table -->
    <q-table
      flat
      bordered
      class="q-animate--fade"
      :filter="store.search"
      v-model:pagination="store.pagination"
      @update:pagination="store.fetchData"
      separator="cell"
      wrap-cells
      row-key="id"
      :rows="store.users"
      :columns="columns"
      :loading="global.getLoadingState"
      :nodes="store.fetchData"
    >
      <template v-slot:body-cell="props">
        <q-td>
          <div>
            {{ props.value ?? 'Unknown' }}
          </div>
          <!-- <q-select
            v-else
            dense
            :options="Object.values(UserRole)"
            outlined
            v-model="props.row.role"
            label="Role"
            @update:model-value="store.handleSave(props.row)"
          /> -->
        </q-td>
        <q-menu v-if="auth.isAdmin" context-menu touch-position auto-close>
          <q-list dense style="min-width: 100px">
            <q-item
              clickable
              v-close-popup
              @click="
                store.toggleDialog({
                  form: props.row,
                  title: 'Edit User',
                })
              "
            >
              <q-item-section>{{ t('edit') }}</q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="store.handleRemove(props.row.id)"
            >
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
      </template>

      <template v-slot:pagination="scope">
        <q-btn
          v-if="scope.pagesNumber > 2"
          icon="first_page"
          color="grey-5"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="() => {
            store.pagination!.page! = 1
            store.fetchData()
            scope.firstPage
          }"
        />
        <q-btn
          icon="chevron_left"
          color="grey-5"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="() => {
          store.pagination!.page!--
          store.fetchData()
          scope.prevPage
        }"
        />
        <q-btn
          icon="chevron_right"
          color="grey-5"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="() => {
          store.pagination!.page!++
          store.fetchData()
          scope.nextPage
        }"
        />
        <q-btn
          v-if="scope.pagesNumber > 2"
          icon="last_page"
          color="grey-5"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="() => {
            store.pagination!.page! = scope.pagesNumber
            store.fetchData()
            scope.lastPage
          }"
        />
      </template>
    </q-table>
    <!-- Dialog Form -->
    <DialogForm
      v-model="store.dialogState"
      :title="store.titleForm"
      @save="store.handleSave"
      v-model="store.dialogForm"
    >
      <template #body>
        <q-input
          v-show="store.parentId"
          v-model="store.parentId"
          label="Parent ID"
          hint="Readonly"
          outlined
          readonly
        />
        <q-input
          v-model="store.form.id"
          label="ID"
          outlined
          readonly
          hint="Readonly"
        />
        <div>
          <q-input
            type="password"
            outlined
            v-model="store.form.password"
            label="Password *"
            :rules="[requireField]"
          />
        </div>

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

