<template>
  <q-page padding>
    <div class="q-gutter-lg row">
      <div class="col col-md">
        <q-card class="full-width flex flex-center" flat bordered>
          <q-card-section horizontal>
            <q-card-section>
              <q-avatar size="150px" class="col-auto q-mx-auto">
                <img
                  draggable="false"
                  :src="`${
                    usr.profile?.avatarUrl ||
                    'https://placehold.co/32x32?text=nopic'
                  } `"
                />
              </q-avatar>
            </q-card-section>

            <q-card-section class="flex items-center text-body1">
              <q-list>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="email" class="q-mr-sm"
                  /></q-item-section>
                  <q-item-section>{{ usr.profile?.email }}</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="person" class="q-mr-sm"
                  /></q-item-section>
                  <q-item-section>{{ usr.profile?.name }}</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="build_circle" class="q-mr-sm"
                  /></q-item-section>
                  <q-item-section>{{ usr.profile?.role }}</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card-section>
        </q-card>
        <q-card class="full-width q-mt-md" flat bordered>
          <q-card-section>
            <div class="text-h6">Biology</div>
            <div class="text-body2" style="line-height: 1.6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Veritatis eligendi incidunt modi optio commodi ut? Ullam,
              voluptatum, ipsum pariatur natus sed labore similique nesciunt
              commodi cum neque iure vel praesentium!
            </div>
          </q-card-section>
        </q-card>
        <!-- <q-tree :nodes="treeData" node-key="id">
          <template v-slot:body-story="prop">
            <span style="padding-left: 20px">Gained:</span>
            {{ prop.node.gainlevel }}
            <span style="padding-left: 20px">Expected:</span>
            {{ prop.node.expectedlevel }}
          </template></q-tree
        > -->
        <q-card flat bordered class="q-animate--fade"> </q-card>
      </div>

      <q-card class="col-12 col-md" style="height: fit-content" flat bordered>
        <q-card-section>
          <q-expansion-item
            label="Skill Collection"
            icon="school"
            class="text-h5 text-bold"
            extended
          >
            <q-tree :nodes="skillsExample" node-key="id" class="q-pa-sm">
              <template v-slot:default-header="props">
                <div class="text-h6">
                  {{ props.node.name }}
                </div>
                <div v-if="props.node.gainedLevel" style="padding-left: 20px">
                  <q-badge
                    outline
                    align="middle"
                    :color="props.node.passed ? 'positive' : 'negative'"
                  >
                    {{ props.node.passed ? 'Achieved' : 'Needs Improvement' }}
                  </q-badge>
                </div>
              </template>
              <template v-slot:default-body="props">
                <div class="text-body2" v-if="props.node.gainedLevel">
                  <span style="padding-left: 10px">Gained:</span>
                  {{ props.node.gainedLevel }}
                  <span style="padding-left: 10px">Expected:</span>
                  {{ props.node.expectedLevel }}
                </div>
              </template>
            </q-tree>
          </q-expansion-item>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth';

const skillsExample = [
  {
    id: 1,
    skillId: 101,
    name: 'Frontend Development',
    gainedLevel: 3,
    expectedLevel: 5,
    passed: false,
    children: [
      {
        id: 2,
        skillId: 102,
        name: 'Vue.js',
        gainedLevel: 2,
        expectedLevel: 4,
        passed: false,
        children: [],
      },
    ],
  },
  {
    id: 3,
    skillId: 103,
    name: 'Backend Development',

    children: [
      {
        id: 4,
        skillId: 104,
        name: 'Node.js',
        gainedLevel: 4,
        expectedLevel: 4,
        passed: true,
        children: [
          {
            id: 5,
            skillId: 105,
            name: 'Nest.js',
            gainedLevel: 4,
            expectedLevel: 4,
            passed: true,
            children: [],
          },
        ],
      },
    ],
  },
];

const usr = useAuthStore();
</script>
