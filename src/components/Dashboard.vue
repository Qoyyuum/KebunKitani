<template>
  <div class="q-pa-md">
    <NetworkCheck />
    <q-table
      class="sticky-header-column-dashboard-table"
      separator="cell"
      :dense="$q.screen.lt.md"
      :rows="rows"
      :pagination="initialPagination"
      :columns="columns"
      row-key="title"
      no-data-label="Belum ada data log untuk ladang kita. Sila bermula dengan tekan + di sebelah bawah kanan kita"
      title="Ladang Saya"
    />
    <CreateButton />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NetworkCheck from 'components/NetworkCheck.vue';
import CreateButton from 'components/CreateButton.vue';
// import { isUnsynced } from '../utils/farmLog';

export default defineComponent({
  name: 'Dashboard',
  components: {
    NetworkCheck,
    CreateButton,
  },
  setup() {
    const initialPagination = {
      rowsPerPage: 10,
    };

    const columns = ref([
      {
        name: 'title',
        required: true,
        label: 'Borang ID',
        align: 'left',
        field: (row: { title: string }) => row.title,
        format: (val: string) => `${val}`,
        sortable: true,
      },
      {
        name: 'date',
        required: true,
        label: 'Tarikh dihantar',
        align: 'left',
        field: 'date',
        sortable: true,
      },
      {
        name: 'produce',
        required: true,
        label: 'Ternakan/Tanaman',
        field: 'produce',
        sortable: true,
      },
      {
        name: 'weight',
        required: false,
        label: 'Berat(KG)',
        field: 'weight',
        sortable: true,
      },
      {
        name: 'area',
        required: false,
        label: 'Hasil Di Ladang($/KG)',
        field: 'area',
        sortable: true,
      },
      // {
      //   name: 'status',
      //   required: true,
      //   label: 'Status',
      //   field: 'status',
      //   sortable: true,
      // },
    ]);

    const rows = ref([
      {
        title: 'Hasil Ternakan #01',
        date: '02/01/2021',
        produce: 'Kambing',
        weight: '250 KG',
        area: '4 Hectar',
        // status: `<q-icon name="mdi-cloud-check" />`,
      },
      {
        title: 'Hasil Ternakan #02',
        date: '03/01/2021',
        produce: 'Ayam',
        weight: '500 KG',
        area: '4 Hectar',
        // // status: 'mdi-cloud-check',
      },
      {
        title: 'Hasil Ternakan #03',
        date: '04/02/2021',
        produce: 'Kerbau',
        weight: '750 KG',
        area: '4 Hectar',
        // // status: 'mdi-cloud-check',
      },
      {
        title: 'Hasil Tanaman #04',
        date: '04/02/2021',
        produce: 'Bayam',
        weight: '120 KG',
        area: '2 Hectar',
        // // status: 'mdi-cloud-check',
      },
      {
        title: 'Hasil Tanaman #05',
        date: '04/03/2021',
        produce: 'Bayam',
        weight: '135 KG',
        area: '2 Hectar',
        // // status: 'mdi-cloud-check',
      },
      {
        title: 'Hasil Tanaman #06',
        date: '04/03/2021',
        produce: 'Bayam',
        weight: '135 KG',
        area: '2 Hectar',
        // // status: 'mdi-cloud-check',
      },
      {
        title: 'Hasil Ternakan #07',
        date: '04/04/2021',
        produce: 'Rusa',
        weight: '70 KG',
        area: '0.25 Hectar',
        // // status: 'mdi-cloud-check',
      },
      {
        title: 'Hasil Ternakan #08',
        date: '04/03/2021',
        produce: 'Biri-Biri',
        weight: '55 KG',
        area: '0.15 Hectar',
        // // status: 'mdi-cloud-check',
      },
      {
        title: 'Hasil Ternakan #09',
        date: '04/06/2021',
        produce: 'Kambing',
        weight: '170 KG',
        area: '1 Hectar',
        // // status: 'mdi-cloud-check',
      },
      {
        title: 'Hasil Tanaman #10',
        date: '04/07/2021',
        produce: 'Bayam',
        weight: '135 KG',
        area: '2 Hectar',
        // status: 'mdi-cloud-check',
      },
      {
        title: 'Hasil Tanaman #11',
        date: '06/08/2021',
        produce: 'Bayam',
        weight: '112 KG',
        area: '2 Hectar',
        // status: 'mdi-cloud-check',
      },
      {
        title: 'Hasil Tanaman #12',
        date: '04/03/2021',
        produce: 'Bayam',
        weight: '135 KG',
        area: '2 Hectar',
        // status: 'mdi-cloud-check',
      },
    ]);
    return {
      initialPagination,
      columns,
      rows,
    };
  },
});
</script>

<style lang="sass">
.sticky-header-column-dashboard-table
  /* height or max-height is important */
  height: 310px

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 600px

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #c1f4cd !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style>
