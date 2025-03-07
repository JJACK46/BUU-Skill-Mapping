<script lang="ts" setup>
import type { QTableColumn } from 'quasar';
import { useMeta } from 'quasar';
import ContextMenu from 'src/components/ContextMenu.vue';
import DialogForm from 'src/components/DialogForm.vue';
import MainHeader from 'src/components/PageHeader.vue';
import { EnumUserRole } from 'src/data/roles';
import { useAuthStore } from 'src/stores/auth';
import { useGlobalStore } from 'src/stores/global';
import { useUserStore } from 'src/stores/user';
import { requireField } from 'src/utils/field-rules';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
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
  },
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
        </q-td>
        <ContextMenu
          v-if="auth.isAdmin"
          :edit-fn="
            () => {
              store.toggleDialog({
                form: props.row,
                title: 'Edit User',
              });
            }
          "
          :delete-fn="
            () => {
              store.handleRemove(props.row.id);
            }
          "
        >
        </ContextMenu>
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
          @click="
            () => {
              store.pagination!.page! = 1;
              store.fetchData();
              scope.firstPage;
            }
          "
        />
        <q-btn
          icon="chevron_left"
          color="grey-5"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="
            () => {
              store.pagination!.page!--;
              store.fetchData();
              scope.prevPage;
            }
          "
        />
        <q-btn
          icon="chevron_right"
          color="grey-5"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="
            () => {
              store.pagination!.page!++;
              store.fetchData();
              scope.nextPage;
            }
          "
        />
        <q-btn
          v-if="scope.pagesNumber > 2"
          icon="last_page"
          color="grey-5"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="
            () => {
              store.pagination!.page! = scope.pagesNumber;
              store.fetchData();
              scope.lastPage;
            }
          "
        />
      </template>
    </q-table>
    <!-- Dialog Form -->
    <DialogForm
      v-model="store.dialogState"
      :title="store.titleForm"
      @save="store.handleSave"
    >
      <q-input
        v-model="store.form.id"
        label="ID"
        outlined
        readonly
        hint="Readonly"
      />
      <q-input
        type="email"
        outlined
        v-model="store.form.email"
        label="Email *"
        :rules="[requireField]"
      />
      <q-input
        type="password"
        outlined
        v-model="store.form.password"
        label="Password *"
        :rules="[requireField]"
      />
      <q-select
        outlined
        v-model="store.form.role"
        label="Role *"
        :options="Object.values(EnumUserRole)"
        :rules="[requireField]"
      />
    </DialogForm>
  </q-page>
</template>
