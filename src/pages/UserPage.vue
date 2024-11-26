<template>
  <q-page padding>
    <MainHeader
      v-model:search-text="store.search"
      @open-dialog="dialogState = true"
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
      :rows="store.users"
      :columns="columns"
      row-key="name"
      :loading="global.getLoadingState"
      wrap-cells
    >
      <template #body-cell-role="props">
        <q-td>
          <div v-if="!auth.isAdmin">
            {{ props.value ?? 'Unknown' }}
          </div>
          <q-select
            v-else
            dense
            :options="Object.values(UserRole)"
            outlined
            bg-color="white"
            v-model="props.row.role"
            label="Role"
            @update:model-value="store.handleSave(props.row)"
          />
        </q-td>
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
            store.fetchData(store.pagination)
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
          store.fetchData(store.pagination)
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
          store.fetchData(store.pagination)
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
            store.fetchData(store.pagination)
            scope.lastPage
          }"
        />
      </template>
    </q-table>
    <!-- Dialog Form -->
    <DialogForm
      v-model="dialogState"
      title="New User *"
      @save="store.handleSave"
    >
      <template #body>
        <q-input
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
          :options="Object.values(UserRole)"
          outlined
          v-model="store.form.role"
          label="Role *"
          :rules="[requireField]"
        />
      </template>
    </DialogForm>
  </q-page>
</template>

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
import { useRoute } from 'vue-router';

const auth = useAuthStore();
const store = useUserStore();
const dialogState = ref(false);
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
    store.fetchData(store.pagination);
  }
);

useMeta({
  title: title.value,
});
</script>
<template>
  <q-page padding>
    <PageHeader
      v-model:search-text="store.search"
      @open-dialog="dialogState = true"
      hide-filter
    />
    <q-separator class="q-my-md" />
    <q-toggle v-model="store.editMode"> Edit Mode </q-toggle>
    <!-- Table -->
    <q-table
      class="q-animate--fade"
      :filter="store.search"
      v-model:pagination="store.pagination"
      @update:pagination="store.fetchData"
      separator="cell"
      :rows="store.users"
      :columns="columns"
      row-key="name"
      :loading="global.getLoadingState"
      wrap-cells
    >
      <template #body-cell-role="props">
        <q-td>
          <div v-if="!store.editMode">
            {{ props.value ?? 'Unknown' }}
          </div>
          <q-select
            v-else
            dense
            :options="Object.values(UserRole)"
            outlined
            v-model="props.row.role"
            label="Role"
            @update:model-value="store.handleSave(props.row)"
          />
        </q-td>
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
            store.fetchData(store.pagination)
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
          store.fetchData(store.pagination)
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
          store.fetchData(store.pagination)
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
            store.fetchData(store.pagination)
            scope.lastPage
          }"
        />
      </template>
    </q-table>

    <!-- Dialog Form -->
    <DialogForm
      v-model="dialogState"
      title="New User *"
      @save="store.handleSave"
    >
      <template #body>
        <q-input
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
          :options="Object.values(UserRole)"
          outlined
          v-model="store.form.role"
          label="Role *"
          :rules="[requireField]"
        />
      </template>
    </DialogForm>
  </q-page>
</template>
