<template>
  <q-page class="q-pa-md">
    <q-form autofocus @submit="onSubmit">
      <q-input
        standout="bg-teal text-white"
        label="Kategori Tanaman"
        stack-label
        :dense="dense"
        type="text"
      >
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ form.category }}
          </div>
        </template>
      </q-input>

      <q-input
        standout="bg-teal text-white"
        label="Jumlah Pohon"
        stack-label
        :dense="dense"
        type="number"
      >
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ form.quantityType }}
          </div>
        </template>
      </q-input>

      <q-input
        standout="bg-teal text-white"
        label="Jumlah Hasil"
        stack-label
        :dense="dense"
        type="number"
      >
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ form.revenue }}
          </div>
        </template>
      </q-input>
      <q-btn
        :ripple="{ center: true }"
        color="secondary"
        label="Balik"
        no-caps
        :to="{ path: '/' }"
      />
      <q-btn round color="secondary" icon="mdi-content-save" type="submit" />
    </q-form>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar';

export default {
  name: 'Flowerlist',
  setup() {
    const $q = useQuasar();
    const onSubmit = () => {
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        position: 'center',
        icon: navigator.onLine ? 'cloud_done' : 'mdi-cloud-question',
        message: navigator.onLine ? 'Submitted' : 'Saved locally',
      });
      onReset();
      formFilled = true;
    };

    const onReset = () => {
      form = null;
    };

    return {
      onSubmit,
      dense: false,
      form: {
        category: null,
        // hectar: null,
        revenue: 0,
        quantityType: 0,
      },
    };
  },
};
</script>
