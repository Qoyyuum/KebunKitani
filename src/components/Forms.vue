<template>
  <div class="q-pa-md">
    <div class="text-h6">Borang Hasil</div>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        standout="bg-teal text-white"
        label="Jenis Tanaman"
        stack-label
        :dense="dense"
        type="text"
      >
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ vegetabletype }}
          </div>
        </template>
      </q-input>

      <q-input
        standout="bg-teal text-white"
        label="Berat tanaman dalam KG "
        stack-label
        :dense="dense"
      >
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ weight }}
          </div>
        </template>
      </q-input>

      <q-input
        standout="bg-teal text-white"
        label="KELUASAN DIUSAHAKAN MENGIKUT JENIS SAYUR (Hektar)"
        stack-label
        :dense="dense"
      >
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ localAreas }}
          </div>
        </template>
      </q-input>

      <q-input
        standout="bg-teal text-white"
        label="HARGA HASIL DI LADANG / UNIT (B$/KG)"
        stack-label
        :dense="dense"
      >
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ saleamount }}
          </div>
        </template>
      </q-input>

      <q-btn
        :ripple="{ center: true }"
        color="primary"
        label="Balik"
        no-caps
        :to="{ path: '/' }"
      />
      <q-btn round color="secondary" icon="mdi-content-save" type="submit" />
    </q-form>
    <div v-if="formFilled">
      <CreateButton />
    </div>
  </div>
</template>

<script>
// import { isNearby, mergeGeometries, removeGeometry } from 'src/utils/geometry';
import parseNotes from 'src/utils/parseNotes';
import { defineComponent } from 'vue';
import { CreateButton } from 'components/CreateButton';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'Form',
  components: {
    CreateButton,
  },
  data() {
    return {
      useLocalAreas: false,
      isWorking: false,
      localAreas: [],
      showAllCategories: false,
      currentQuant: -1,
      quantMeasures: [
        'count',
        'length',
        'weight',
        'area',
        'volume',
        'time',
        'temperature',
        'water_content',
        'value',
        'rating',
        'ratio',
        'probability',
      ],
      dense: false,
      formFilled: false,
      weight: 0,
      saleamount: 0,
      vegetabletype: '',
      q: useQuasar(),
    };
  },

  props: [
    'id',
    'logs',
    'logTypes',
    'areas',
    'assets',
    'useGeolocation',
    'units',
    'categories',
    'equipment',
    'areaGeoJSON',
  ],

  methods: {
    onSubmit() {
      this.q.notify({
        color: 'green-4',
        textColor: 'white',
        position: 'center',
        icon: navigator.onLine ? 'cloud_done' : 'mdi-cloud-question',
        message: navigator.onLine ? 'Submitted' : 'Saved locally',
      });
      this.onReset();
      this.formFilled = true;
    },
    onReset() {
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
    forceSync() {
      if (localStorage.getItem('host') !== null) {
        this.$store.dispatch('updateAssets');
        this.$store.dispatch('updateAreas');
        return;
      }
      this.$router.push('/login');
    },

    updateCurrentLog(key, val) {
      const props = {
        [key]: val,
        localID: +this.id,
      };
      this.updateLog(props);
    },

    updateNotes(value) {
      this.updateCurrentLog('notes', { value, format: 'farm_format' });
    },
    updateQuantity(key, value, index) {
      const currentQuants = this.currentLog.quantity || [];
      const storedVal =
        key === 'unit' ? { id: value, resource: 'taxonomy_term' } : value;
      let updatedQuant;
      let updatedQuants;
      if (index >= 0) {
        updatedQuant = { ...currentQuants[index], [key]: storedVal };
        updatedQuants = [
          ...currentQuants.slice(0, index),
          updatedQuant,
          ...currentQuants.slice(index + 1),
        ];
      } else {
        updatedQuant = {
          measure: null,
          value: null,
          unit: null,
          label: null,
        };
        updatedQuants = [...currentQuants, updatedQuant];
      }
      this.updateCurrentLog('quantity', updatedQuants);
      if (index < 0) {
        this.currentQuant = updatedQuants.length - 1;
      }
    },

    addCategory(id) {
      const catReference = { id, resource: 'taxonomy_term' };
      const oldCats = this.currentLog.log_category;
      const newCats = oldCats ? oldCats.concat(catReference) : [catReference];
      this.updateCurrentLog('log_category', newCats);
    },

    addEquipment(id) {
      if (id !== '') {
        const equipReference = { id, resource: 'farm_asset' };
        const oldEquip = this.currentLog.equipment;
        const newEquip = oldEquip
          ? oldEquip.concat(equipReference)
          : [equipReference];
        this.updateCurrentLog('equipment', newEquip);
      }
    },

    addAsset(id) {
      const assetReference = { id, resource: 'farm_asset' };
      const newAssets = this.currentLog.asset.concat(assetReference);
      this.updateCurrentLog('asset', newAssets);
    },

    // addMovementArea(id) {
    //   const areaReference = { id, resource: 'taxonomy_term' };
    //   const areaGeometry = this.areas.find((area) => area.tid === id)
    //     .geofield[0]
    //     ? this.areas.find((area) => area.tid === id).geofield[0].geom
    //     : null;
    //   const prevMovement = this.currentLog.movement;
    //   const newGeometry = prevMovement
    //     ? mergeGeometries([areaGeometry, prevMovement.geometry])
    //     : areaGeometry;
    //   const newMovement = {
    //     area: prevMovement
    //       ? prevMovement.area.concat(areaReference)
    //       : [areaReference],
    //     geometry: newGeometry,
    //   };
    //   this.updateCurrentLog('movement', newMovement);
    // },

    addArea(id) {
      if (id !== '') {
        const areaReference = { id, resource: 'taxonomy_term' };
        const newAreas = this.currentLog.area.concat(areaReference);
        this.updateCurrentLog('area', newAreas);
      }
    },

    removeAsset(asset) {
      const newAssets = this.currentLog.asset.filter(
        (_asset) => _asset.id !== asset.id
      );
      this.updateCurrentLog('asset', newAssets);
    },

    removeArea(area) {
      // Update the current log with a new array of areas, sans the removed one.
      const newAreas = this.currentLog.area.filter(
        (_area) => _area.id !== area.tid
      );
      this.updateCurrentLog('area', newAreas);

      // Also remove the area's geofield from the current log.
      const removedGeofields = this.areas.find(
        (_area) => _area.tid === area.tid
      )?.geofield;
      const newGeofields = this.currentLog.geofield?.filter(
        (geofield) =>
          !removedGeofields.some(
            (_geofield) => geofield.geom === _geofield.geom
          )
      );
      this.updateCurrentLog('geofield', newGeofields);
    },

    // removeMovementArea(area) {
    //   const newAreas = this.currentLog.movement.area.filter(
    //     (_area) => _area.id !== area.tid
    //   );
    //   const prevGeometry = this.currentLog.movement.geometry;
    //   let areaGeometry = null;
    //   if (area.geofield[0]) {
    //     areaGeometry = area.geofield[0].geom;
    //   }
    //   const newGeometry = removeGeometry(prevGeometry, areaGeometry);
    //   const newMovement = {
    //     geometry: newGeometry,
    //     area: newAreas,
    //   };
    //   this.updateCurrentLog('movement', newMovement);
    // },

    removeQuant(index) {
      if (this.currentQuant >= index) {
        this.currentQuant -= 1;
      }
      const newQuant = [
        ...this.currentLog.quantity.slice(0, index),
        ...this.currentLog.quantity.slice(index + 1),
      ];
      this.updateCurrentLog('quantity', newQuant);
    },

    removeCategory(index) {
      const newCat = this.currentLog.log_category;
      newCat.splice(index, 1);
      this.updateCurrentLog('category', newCat);
    },

    removeEquipment(index) {
      const newEquip = this.currentLog.equipment;
      newEquip.splice(index, 1);
      this.updateCurrentLog('equipment', newEquip);
    },

    getPhoto() {
      // Obtains an image location from the camera!
      return this.$store.dispatch('getPhotoFromCamera', this.currentLog);
    },

    loadPhoto(files) {
      for (let i = 0; i < files.length; i += 1) {
        this.$store.dispatch('loadPhotoBlob', {
          file: files[i],
          log: this.currentLog,
        });
      }
    },

    // addLocation() {
    //   let props;
    //   function addGeofield(position) {
    //     const oldGeom = this.currentLog.geofield?.[0]?.geom;
    //     const newGeom = `POINT (${position.coords.longitude} ${position.coords.latitude})`;
    //     props = [{ geom: mergeGeometries([oldGeom, newGeom]) }];
    //   }
    //   function onError(error) {
    //     this.$store.commit('alert', error);
    //     this.isWorking = false;
    //   }
    //   const options = {
    //     enableHighAccuracy: true,
    //     timeout: 10000,
    //     maximumAge: 0,
    //   };

    //   this.isWorking = true;
    //   const watch = navigator.geolocation.watchPosition(
    //     addGeofield.bind(this),
    //     onError.bind(this),
    //     options
    //   );
    //   setTimeout(() => {
    //     navigator.geolocation.clearWatch(watch);
    //     this.updateCurrentLog('geofield', props);
    //     this.isWorking = false;
    //   }, 5000);
    // },

    // removeLocation(index) {
    //   const geofield = [
    //     {
    //       geom: mergeGeometries([
    //         ...this.geofieldAsArrayOfWktPoints.slice(0, index),
    //         ...this.geofieldAsArrayOfWktPoints.slice(index + 1),
    //       ]),
    //     },
    //   ];
    //   this.updateCurrentLog('geofield', geofield);
    // },

    getAttached(attribute, resources, resId) {
      const logAttached = [];
      resources.forEach((resrc) => {
        attribute.forEach((attrib) => {
          if (resrc[resId] === attrib.id) {
            logAttached.push(resrc);
          }
        });
      });
      return logAttached;
    },
    assetsRequired() {
      return this.currentLog.type === 'farm_seeding' && this.selectedAssets < 1;
    },
    parseNotes,
  },

  computed: {
    currentLog() {
      return this.logs.find((log) => log.localID === +this.id) || this.logs[0];
    },
    /*
      In order to avoid duplicates, filteredAssets & filteredAreas remove
      assets/areas from the array of searchable objects if they've already been
      added to the current log.
    */
    filteredAssets() {
      if (this.currentLog.asset) {
        const selectAssetRefs = this.currentLog.asset;
        return this.assets.filter(
          (asset) =>
            !selectAssetRefs.some((selAsset) => asset.id === selAsset.id)
        );
      }
      return this.assets;
    },
    filteredAreas() {
      if (this.currentLog.area) {
        const selectAreaRefs = this.currentLog.area;
        return this.areas.filter(
          (area) => !selectAreaRefs.some((selArea) => area.tid === selArea.id)
        );
      }
      return this.areas;
    },
    filteredMovementAreas() {
      const { movement } = this.currentLog;
      if (movement && movement && movement.area) {
        const selectAreaRefs = this.currentLog.movement.area;
        return this.areas.filter(
          (area) => !selectAreaRefs.some((selArea) => area.tid === selArea.id)
        );
      }
      return this.areas;
    },
    filteredCategories() {
      const selectedCats = this.currentLog.log_category;
      const noCatsAreSelected = !selectedCats || selectedCats.length === 0;
      if (!this.showAllCategories && !noCatsAreSelected) {
        return this.categories.filter((cat) =>
          selectedCats.some((_cat) => cat.tid === _cat.id)
        );
      }
      if (this.showAllCategories) {
        return this.categories;
      }
      return [];
    },
    geofieldAsArrayOfWktPoints() {
      const geom = this.currentLog.geofield?.[0]?.geom;
      if (geom) {
        const geojson = parse(geom);
        if (geojson.type === 'Point') {
          return [
            `POINT (${geojson.coordinates[0]} ${geojson.coordinates[1]})`,
          ];
        }
        if (geojson.type === 'GeometryCollection') {
          return geojson.geometries.map(
            (g) => `POINT (${g.coordinates[0]} ${g.coordinates[1]})`
          );
        }
      }
      return [];
    },
    selectedAssets() {
      if (this.currentLog.asset) {
        return this.getAttached(this.currentLog.asset, this.assets, 'id');
      }
      return [];
    },
    selectedAreas() {
      if (this.currentLog.area) {
        return this.getAttached(this.currentLog.area, this.areas, 'tid');
      }
      return [];
    },
    selectedMovementAreas() {
      const { movement } = this.currentLog;
      if (movement && movement.area) {
        return this.getAttached(
          this.currentLog.movement.area,
          this.areas,
          'tid'
        );
      }
      return [];
    },
    quantUnitNames() {
      if (this.units.length > 0 && this.currentLog?.quantity.length > 0) {
        const unitNames = [];
        this.currentLog.quantity.forEach((quant) => {
          if (quant.unit) {
            this.units.forEach((unit) => {
              if (parseInt(unit.tid, 10) === parseInt(quant.unit.id, 10)) {
                unitNames.push(unit.name);
              }
            });
          } else {
            unitNames.push(null);
          }
        });
        return unitNames;
      }
      return [];
    },
    categoryNames() {
      if (
        this.categories.length > 0 &&
        this.currentLog.log_category.length > 0
      ) {
        const catNames = [];
        this.currentLog.log_category.forEach((logCat) => {
          this.categories.forEach((cat) => {
            if (parseInt(cat.tid, 10) === parseInt(logCat.id, 10)) {
              catNames.push(cat.name);
            }
          });
        });
        return catNames;
      }
      return [];
    },
    equipmentNames() {
      if (
        this.equipment.length > 0 &&
        this.currentLog.equipment &&
        this.currentLog.equipment.length > 0
      ) {
        const equipNames = [];
        this.currentLog.equipment.forEach((logEquip) => {
          this.equipment.forEach((equip) => {
            if (parseInt(equip.id, 10) === parseInt(logEquip.id, 10)) {
              equipNames.push(equip.name);
            }
          });
        });
        return equipNames;
      }
      return [];
    },
    isNative() {
      if (process.env.PLATFORM === 'native' || process.env.PLATFORM === 'dev') {
        return true;
      }
      return false;
    },
    imageUrls() {
      return this.currentLog.images.filter((img) => typeof img === 'string');
    },
    /*
    Assemble layers for display.
    The 'previous' layer is assembled from the geofield plus
    all area geometires associated with the log.
    The 'movement' layer is the geometry in the log's movement field
    */
    // mapLayers() {
    //   const movement = {
    //     title: 'movement',
    //     wkt: this.currentLog.movement?.geometry,
    //     color: 'orange',
    //     visible: true,
    //     weight: 0,
    //     canEdit: !!this.currentLog.movement?.geometry,
    //   };
    //   const previousGeoms = this.currentLog.asset?.map(
    //     (logAsset) =>
    //       this.assets?.find((asset) => asset.id === logAsset.id)?.geometry
    //   );
    //   const previousWKT = previousGeoms
    //     ? mergeGeometries(previousGeoms)
    //     : undefined;
    //   const previous = {
    //     title: 'previous',
    //     wkt: previousWKT,
    //     color: 'green',
    //     visible: true,
    //     weight: 1,
    //     canEdit: false,
    //   };
    //   return [previous, movement];
    // },
  },

  watch: {
    // useLocalAreas() {
    //   function filterAreasByProximity(position) {
    //     this.localAreas = this.filteredAreas.filter(
    //       (area) =>
    //         !!area.geofield[0] &&
    //         isNearby(
    //           [position.coords.longitude, position.coords.latitude],
    //           area.geofield[0].geom,
    //           position.coords.accuracy
    //         )
    //     );
    //   }
    //   function onError(error) {
    //     this.$store.commit('alert', error);
    //   }
    //   // If useLocalAreas is set to true, get geolocation and nearby areas
    //   if (this.useLocalAreas) {
    //     const options = {
    //       enableHighAccuracy: true,
    //       timeout: 10000,
    //       maximumAge: 0,
    //     };
    //     const watch = navigator.geolocation.watchPosition(
    //       filterAreasByProximity.bind(this),
    //       onError.bind(this),
    //       options
    //     );
    //     setTimeout(() => {
    //       navigator.geolocation.clearWatch(watch);
    //     }, 5000);
    //   }
    // },
  },
  name: 'Forms',
  setup() {
    // const tasks = inject('store/tasks');
    // const store = useStore();

    return {
      // tasks,
    };
  },
});
</script>
