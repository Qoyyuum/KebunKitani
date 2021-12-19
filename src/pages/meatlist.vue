<template>
  <q-page class="q-pa-md">
    <q-form autofocus @submit="onSubmit">
      <q-input
        standout="bg-teal text-white"
        label="Jenis Ternakan"
        stack-label
        :dense="dense"
      >
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ form.animaltype }}
          </div>
        </template>
      </q-input>

      Indong
      <q-input
        standout="bg-teal text-white"
        label="Jantan"
        stack-label
        :dense="dense"
        type="number"
      >
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ form.parent.male }}
          </div>
        </template>
      </q-input>

      <q-input
        standout="bg-teal text-white"
        label="Betina"
        stack-label
        :dense="dense"
        type="number"
      >
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ form.parent.female }}
          </div>
        </template>
      </q-input>

      Mendara
      <q-input
        standout="bg-teal text-white"
        label="Jantan"
        stack-label
        :dense="dense"
        type="number"
      >
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ form.mendara.male }}
          </div>
        </template>
      </q-input>

      <q-input
        standout="bg-teal text-white"
        label="Betina"
        stack-label
        :dense="dense"
        type="number"
      >
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ form.mendara.female }}
          </div>
        </template>
      </q-input>

      Anak Binating
      <q-input
        standout="bg-teal text-white"
        label="Jantan"
        stack-label
        :dense="dense"
        type="number"
      >
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ form.baby.male }}
          </div>
        </template>
      </q-input>

      <q-input
        standout="bg-teal text-white"
        label="Betina"
        stack-label
        :dense="dense"
        type="number"
      >
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ form.baby.female }}
          </div>
        </template>
      </q-input>

      <q-btn
        :ripple="{ center: true }"
        color="secondary"
        icon="mdi-arrow-left-top-bold"
        label="Balik"
        no-caps
        :to="{ path: '/' }"
      />
      <q-btn
        round
        color="secondary"
        icon="mdi-content-save"
        label="Hantar"
        type="submit"
      />
    </q-form>
  </q-page>
</template>
<script>
import { useQuasar } from 'quasar';

export default {
  name: 'meatlist',
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
      dense: false,
      form: {
        animaltype: null,
        parent: {
          male: 0,
          female: 0,
        },
        mendara: {
          male: 0,
          female: 0,
        },
        baby: {
          male: 0,
          female: 0,
        },
      },
      onSubmit,
    };
  },
};
</script>
