<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useUserStore } from 'src/stores/user';
import { UserService } from 'src/services/user';
const props = defineProps<{ visible: boolean; item: unknown | null }>();
const emit = defineEmits(['close-dialog']);
const userStore = useUserStore();
const localVisible = ref(props.visible);
const users = computed(() => userStore.editedUser);

watch(
  () => props.visible,
  (newVal) => {
    localVisible.value = newVal;
  }
);

function closeDialog() {
  // userStore.clearForm();
  emit('close-dialog');
}

async function saveUser() {
  let user = { ...users.value };
  const payload: object = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    password: user.password,
    gender: user.gender,
    googleId: user.googleId,
    phone: user.phone,
    role: user.role,
  };
  console.log(payload);
  await UserService.createOne(payload);
  closeDialog();
}
</script>

<template>
  <q-dialog v-model="localVisible" persistent>
    <q-card class="q-pa-md" style="min-width: 1000px">
      <q-card-section>
        <div class="row justify-between">
          <div>
            <div style="font-size: 20px; margin-top: 6px">Add New User</div>
          </div>
          <div>
            <q-btn flat round icon="close" @click="closeDialog" />
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="row justify-between">
          <div class="col-6">
            <!-- <q-input
              v-model="userStore.editedUser"
              label="Name"
              hide-bottom-space
              dense
              outlined
            ></q-input> -->
          </div>
          <div class="col-4">
            <!-- <q-select
              v-model="users.domain"
              label="User Type"
              :options="Object.values(LearningDomain)"
              outlined
              dense
            ></q-select> -->
          </div>
          <div class="col-12">
            <!-- <q-input
              v-model="users.description"
              type="textarea"
              label="Description"
              hide-bottom-space
              dense
              outlined
              class="q-mt-lg"
            ></q-input> -->
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Cancel"
          color="negative"
          @click="closeDialog"
          style="width: 70px"
        />
        <q-btn
          flat
          label="Save"
          color="primary"
          @click="saveUser"
          style="width: 70px"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
