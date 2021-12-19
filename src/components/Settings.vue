<template>
  <div class="q-pa-md">
    <q-separator spaced />
    <q-list bordered padding>
      <q-item-label header>Kontrol-kontrol Pengguna</q-item-label>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Akaun Pentadbiran</q-item-label>
          <q-item-label caption>
            Sila tetapkan tahap isi kandungan aplikasi kepada terhad yang boleh
            dimuat turun
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Tukar Kata-Haluan</q-item-label>
          <q-item-label caption>
            Dimestikan menggunakan kata-haluan untuk mengemaskan data dan muat
            naik data
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Umum</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="generalNotification" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Pemberitahuan</q-item-label>
          <q-item-label caption>
            Sila beri notifikasi tentang kemaskini bagi aplikasi atau
            promosi-promosi
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="enableAutoUpdate" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Kemaskini Aplikasi Secara Automatik</q-item-label>
          <q-item-label caption>
            Kemaskini dengan aplikasi sendirinya pada bila-bila masa. Mungkin
            akan dikenakan caj.
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Tetapan Lanjutan</q-item-label>

      <q-item tag="label" v-ripple @click="$q.dark.toggle()">
        <q-item-section>
          <q-item-label>Mod Gelap</q-item-label>
          <q-item-label caption
            >Ingin menggunakan Mod Gelap atau tidak?</q-item-label
          >
        </q-item-section>
        <q-item-section side>
          <q-toggle color="blue" v-model="darkMode" />
        </q-item-section>
      </q-item>
      <q-separator spaced />
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'Settings',
  setup() {
    const darkMode = ref(false);
    const $q = useQuasar();
    $q.dark.set(darkMode.value);
    let pictureUploadNotification = ref(false);
    let enableAutoUpdate = ref(true);
    let generalNotification = ref(true);

    return {
      darkMode,
      pictureUploadNotification,
      enableAutoUpdate,
      generalNotification,
    };
  },
});
</script>
