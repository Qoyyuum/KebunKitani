<template>
  <div>My component</div>
</template>

<script>
import { useQuasar } from 'quasar'
export default {
  name: 'SuccessSaveButton',
  setup () {
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
    },

    const onReset = () => {
      useLocalAreas = false;
      isWorking = false;
      localAreas = [];
      showAllCategories = false;
      currentQuant = -1;
      formFilled = false;
      weight = 0;
      saleamount = 0;
      vegetabletype = null;
    },

    return {
      onSubmit,
      onReset,
      formFilled: false
    }
  }
}
</script>
