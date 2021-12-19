<template>
  <q-page class="q-pa-md">
    <q-form autofocus @submit="onSubmit">
      <q-input
        standout="bg-teal text-white"
        label="Jenis Tanaman"
        stack-label
        :dense="dense"
      >
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ form.vegetabletype }}
          </div>
        </template>
      </q-input>

      <q-input
        standout="bg-teal text-white"
        label="Berat tanaman"
        type="number"
        stack-label
        :dense="dense"
      >
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ form.weight }}
          </div>
        </template>
        <template v-slot:after> KG </template>
      </q-input>

      <q-input
        standout="bg-teal text-white"
        label="KELUASAN DIUSAHAKAN MENGIKUT JENIS SAYUR (Hektar)"
        stack-label
        :dense="dense"
      >
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ form.hectar }}
          </div>
        </template>
        <template v-slot:after> Hektar </template>
      </q-input>

      <q-input
        standout="bg-teal text-white"
        label="HARGA HASIL DI LADANG / UNIT (B$/KG)"
        stack-label
        :dense="dense"
      >
        <template v-slot:before> B$ </template>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ form.revenue }}
          </div>
        </template>
        <template v-slot:after> KG </template>
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
  name: 'vegelist',
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
        vegetabletype: null,
        hectar: null,
        revenue: 0,
        weight: 0,
      },
    };
  },
};
</script>
