<template>
  <div class="q-pa-md">
    <NetworkCheck />
    <q-markup-table flat bordered>
      <thead class="bg-teal">
        <tr>
          <th colspan="6">
            <div class="row no-wrap items-center">
              <q-img style="width: 70px" :ratio="1" class="rounded-borders" />

              <div class="text-h4 q-ml-md text-white">Ladang Saya</div>
            </div>
          </th>
        </tr>
        <tr>
          <th class="text-left">Ternakan/Tanaman</th>
          <th class="text-right">Berat(KG)</th>
          <th class="text-right">Jantina(M/F)</th>
          <th class="text-right">
            Keluasan Diusahakan Megikut Jenis Tanaman(Hektar)
          </th>
          <th class="text-right">Hasil Di Ladang($/KG)</th>
          <th class="text-right">Tarikh</th>
        </tr>
      </thead>
      <tbody class="bg-grey-3">
        <tr>
          <td class="text-left">Kerbau</td>
          <td class="text-right">10</td>
          <td class="text-right">M</td>
          <td class="text-right">-</td>
          <td class="text-right">5.5</td>
          <td class="text-right">11/9/2021</td>
        </tr>

        <tr>
          <td class="text-left">Lembu</td>
          <td class="text-right">5</td>
          <td class="text-right">F</td>
          <td class="text-right">-</td>
          <td class="text-right">7.3</td>
          <td class="text-right">25/8/2021</td>
        </tr>

        <tr>
          <td class="text-left">Kambing</td>
          <td class="text-right">6</td>
          <td class="text-right">F</td>
          <td class="text-right">-</td>
          <td class="text-right">9.5</td>
          <td class="text-right">12/10/2021</td>
        </tr>

        <tr>
          <td class="text-left">Biri-Biri</td>
          <td class="text-right">7</td>
          <td class="text-right">M</td>
          <td class="text-right">-</td>
          <td class="text-right">9.1</td>
          <td class="text-right">22/11/2021</td>
        </tr>

        <tr>
          <td class="text-left">Rusa</td>
          <td class="text-right">8</td>
          <td class="text-right">M</td>
          <td class="text-right">-</td>
          <td class="text-right">3.5</td>
          <td class="text-right">18/8/2021</td>
        </tr>

        <tr>
          <td class="text-left">Tarap</td>
          <td class="text-right">20</td>
          <td class="text-right">-</td>
          <td class="text-right">7</td>
          <td class="text-right">5.5</td>
          <td class="text-right">10/9/2021</td>
        </tr>

        <tr>
          <td class="text-left">Bayam</td>
          <td class="text-right">15</td>
          <td class="text-right">-</td>
          <td class="text-right">4</td>
          <td class="text-right">3</td>
          <td class="text-right">8/12/2021</td>
        </tr>
      </tbody>
    </q-markup-table>
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
