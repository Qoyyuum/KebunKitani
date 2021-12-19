<template>
  <div class="row justify-end">
    <q-fab
      color="secondary"
      vertical-actions-align="right"
      icon="mdi-plus"
      direction="up"
      size="xl"
    >
      <div v-for="type in formTypes" :key="type.id">
        <q-fab-action
          :label="type.label"
          :color="type.color"
          :icon="type.icon"
          size="xl"
          @click="addLog"
          fab
          :to="type.path"
        />
      </div>
    </q-fab>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'src/store';
import { createLog } from 'src/utils/farmLog';

export default defineComponent({
  name: 'CreateButton',
  setup() {
    const store = useStore();
    const newId = ref(0);

    const addLog = () => {
      newId.value = Math.floor(Math.random() * 365);
      createLog({
        type: 'farm_harvest',
        done: true,
        id: newId.value,
      });
    };

    const formTypes = [
      {
        id: 1,
        label: 'Sayur',
        icon: 'mdi-corn',
        color: 'light-green-6',
        path: { path: 'vegelist' },
      },
      {
        id: 2,
        label: 'Buah',
        icon: 'mdi-food-apple',
        color: 'orange-6',
        path: { path: 'fruitlist' },
      },
      {
        id: 3,
        label: 'Bunga',
        icon: 'mdi-flower',
        color: 'pink-6',
        path: { path: 'flowerlist' },
      },
      {
        id: 4,
        label: 'Ternakan',
        icon: 'mdi-food-drumstick',
        color: 'brown-6',
        path: { path: 'meatlist' },
      },
    ];

    return {
      formTypes,
      addLog,
    };
  },
});
</script>
