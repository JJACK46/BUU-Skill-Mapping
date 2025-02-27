<script setup lang="ts">
/*
    imports
*/
import { computed, onMounted, ref } from 'vue';
// import { type TitleFormSkill, useSkillStore } from 'src/stores/skill';
import DialogForm from 'src/components/DialogForm.vue';
import { LearningDomain } from 'src/data/learning_domain';
import { requireField } from 'src/utils/field-rules';
import { QTree, useMeta } from 'quasar';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { Skill } from 'src/types/skill';
import { useSkillStore } from 'src/stores/skill';
import JSON_Card from 'src/components/JSON_Card.vue';
/*
    states
*/
const store = useSkillStore();
const { t } = useI18n();
const route = useRoute();
const title = computed(() => route.matched[1]?.name as string);
const searchText = ref('');
const selectedItem = ref<Skill | null>(null);
/*
    methods
*/
useMeta({
  title: title.value,
});
onMounted(async () => {
  await store.fetchDataInCurr();
});
</script>

<template>
  <q-page>
    <!-- Page Title -->
    <div class="text-h4 text-primary q-py-md">
      {{ t('Skill Management') }}
    </div>
    <!-- Operator -->
    <div class="flex justify-end">
      <div class="flex q-gutter-x-sm">
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
        <q-btn
          @click="store.toggleDialog({ title: 'New Skill' })"
          color="primary"
          :label="t('add')"
          style="width: 80px"
          unelevated
        >
        </q-btn>
      </div>
    </div>

    <!-- Content -->
    <div class="row q-mt-md">
      <q-tree
        :nodes="store.getSkills"
        node-key="thaiName"
        children-key="subs"
        class="q-pa-sm col q-animate--fade q-mr-lg"
        :no-nodes-label="t('noData')"
        default-expand-all
      >
        <template v-slot:default-header="props">
          <q-tr
            class="justify-between full-width flex hover-row"
            style="cursor: pointer"
            @click="selectedItem = props.node"
          >
            <!-- Header -->
            <q-td style="user-select: none">
              <div class="text-body1">
                {{ props.node.thaiName ?? 'No Thai Name' }}
              </div>
              <div class="text-caption">
                {{ props.node.engName ?? 'No Eng Name' }}
              </div>
            </q-td>
            <q-td class="q-gutter-x-sm flex">
              <q-btn
                @click="
                  store.toggleDialog({
                    parent: props.node,
                    title: 'Insert Sub-Skill',
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
                    title: 'Edit Skill',
                  })
                "
                icon="edit"
                padding="none"
                class="hover-btn"
                flat
              ></q-btn>
              <q-btn
                @click="store.handleRemove(props.node)"
                icon="delete"
                padding="none"
                class="hover-btn"
                flat
              ></q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-tree>
      <q-card class="col bg-grey-2 q-pa-md" flat>
        <!-- ส่วนหัว -->
        <q-card-section
          v-if="selectedItem && Object.keys(selectedItem).length > 0"
        >
          <div class="text-h5">{{ selectedItem.thaiName }}</div>
          <!-- ขยายขนาด -->
          <div class="text-subtitle1">{{ selectedItem.engName }}</div>
          <q-separator class="q-my-sm" />
          <!-- เส้นคั่น -->
        </q-card-section>

        <!-- ข้อความเริ่มต้นถ้ายังไม่เลือกข้อมูล -->
        <q-card-section v-else>
          <div class="text-grey-6 text-center">กรุณาเลือกข้อมูล</div>
        </q-card-section>

        <!-- Domain (Chip) -->
        <q-card-section v-if="selectedItem && selectedItem.domain">
          <q-chip
            square
            color="primary"
            text-color="white"
            style="
              border-radius: 12px;
              padding: 6px 12px;

              text-align: center;
            "
          >
            {{ selectedItem.domain }}
          </q-chip>
        </q-card-section>

        <!-- คำอธิบาย -->
        <q-card-section
          v-if="selectedItem && Object.keys(selectedItem).length > 0"
        >
          <div
            class="text-body1 q-mb-md"
            style="
              white-space: pre-line;
              text-indent: 1.5em;
              word-wrap: break-word;
              overflow-wrap: break-word;
            "
          >
            {{ selectedItem.thaiDescription }}
          </div>
          <div
            class="text-body1 q-mb-md"
            style="
              white-space: pre-line;
              text-indent: 1.5em;
              word-wrap: break-word;
              overflow-wrap: break-word;
            "
          >
            {{ selectedItem.engDescription }}
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 q-mt-md">
      <JSON_Card :data="store.getSkills" />
    </div>
    <!-- All in One Dialog -->
    <DialogForm
      :title="store.getTitleForm"
      @save="store.handleSave"
      v-model="store.dialogForm"
      :json="store.form"
    >
      <div class="q-gutter-y-md">
        <q-input
          v-model="store.form.thaiName"
          :label="t('name')"
          outlined
          :rules="[requireField]"
        />
        <q-input
          v-model="store.form.engName"
          :label="t('engName')"
          outlined
          :rules="[requireField]"
        />
        <q-select
          :options="Object.values(LearningDomain)"
          v-model="store.form.domain"
          label="Domain"
          outlined
          :rules="[requireField]"
        />
        <q-input
          v-model="store.form.thaiDescription"
          :label="t('description')"
          outlined
          type="textarea"
          counter
          maxlength="1000"
          :rules="[requireField]"
        />
        <q-input
          v-model="store.form.engDescription"
          :label="t('engDescription')"
          outlined
          counter
          maxlength="1000"
          type="textarea"
          :rules="[requireField]"
        />
      </div>
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
