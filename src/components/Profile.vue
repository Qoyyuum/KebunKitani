<template>
  <q-item v-if="loggedIn()">
    <q-item-section side>
      <q-avatar rounded size="70px">
        <img src="https://cdn.quasar.dev/img/avatar.png" />
        <q-badge floating :color="connectionStatus" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>Dayang Siti</q-item-label>
      <q-item-label caption>Ladang Dayang Siti dan Anak-Anak</q-item-label>
    </q-item-section>
  </q-item>
  <q-item v-else>
    <q-item-section side>
      <q-avatar rounded size="70px">
        KK
        <!-- <q-badge floating :color="connectionStatus" /> -->
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>------</q-item-label>
      <q-item-label caption>---------------</q-item-label>
    </q-item-section>
  </q-item>
  <!-- TODO: Get the Settings to work later
  <q-btn
    color="primary"
    icon="mdi-cog"
    label="TETAPAN"
    @click="settings = true"
  /> -->
  <!-- TODO: Get the Logout to work -->
  <div v-if="loggedIn()">
    <q-btn
      color="red-5"
      class="full-width"
      icon="mdi-logout"
      label="LOG KELUAR"
      @click="logout"
    />
  </div>
  <div v-else>
    <q-btn
      color="green-5"
      class="full-width"
      icon="mdi-login"
      label="LOG MASUK"
      @click="openLogin = true"
    />
  </div>
  <!-- <q-dialog v-model="settings" persistent>
    <Settings />
  </q-dialog> -->
  <q-dialog v-model="openLogin">
    <Login />
  </q-dialog>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import Login from 'components/Login.vue';
// import Settings from 'components/Settings.vue';

export default defineComponent({
  name: 'Profile',
  components: {
    Login,
    // Settings,
  },
  setup() {
    const $q = useQuasar();
    const getToken = ref($q.localStorage.getItem('token'));
    const settings = ref(false);

    const loggedIn = () => {
      return getToken.value != null;
    };

    const connectionStatus = () => {
      navigator.onLine ? 'green' : 'red';
    };

    // $q.dialog({
    //   component: Settings,
    // })
    //   .onOk(() => {
    //     console.log('OK');
    //   })
    //   .onCancel(() => {
    //     console.log('Cancel');
    //   });

    const store = useStore();

    const logout = () => {
      // Call logout function from farmos.js
      void store.dispatch('authModule/logout');

      // Remove logs, assets, areas, user info & site info from store & local persistance
      store.commit('farmModule/deleteAllLogs');
      void store.dispatch('farmModule/deleteAllCachedLogs');
      store.commit('farmModule/deleteAllAssets');
      void store.dispatch('farmModule/deleteAllCachedAssets');
      store.commit('farmModule/deleteAllAreas');
      void store.dispatch('farmModule/deleteAllCachedAreas');
      store.commit('farmModule/deleteAllUnits');
      void store.dispatch('farmModule/deleteAllCachedUnits');
      store.commit('farmModule/deleteAllCategories');
      void store.dispatch('farmModule/deleteAllCachedCategories');
      void store.dispatch('farmModule/deleteCachedUserAndSiteInfo');

      // Set login status to false and return to login screen
      store.commit('authModule/setLoginStatus', false);
      // $router.push({ path: '/' });
      console.log('Logged out...');
    };

    return {
      openLogin: ref(false),
      loggedIn,
      logout,
      connectionStatus,
      settings,
    };
  },
});
</script>
