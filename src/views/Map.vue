<template>
  <div class="full-height">
    <l-map
      :zoom="zoom"
      :center="center"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      :attributionControl="attributionControl"
      @zoomend="onZoomEnd"
      ref="map"
    >
      <l-tilelayer :url="url" :attribution="attribution"></l-tilelayer>
      <!-- <l-marker :position="center" :title="$t(cityName)" :opacity="opacity" :draggable="draggable">
        <l-popup :content="$t(cityName)"></l-popup>
      </l-marker>-->

      <l-marker
        v-for="attraction in attractions.filter((v, i) => i <= 100)"
        :key="attraction.id"
        :position="attraction.position"
        :title="attraction.name"
        :icon="getIcon(attraction.category)"
      >
        <l-popup :content="`${attraction.name} ${attraction.position}`"></l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import locateControl from "leaflet.locatecontrol";
import IconsDictionary from "./../utils/markerIcons.js";
// import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";

export default {
  // components: {
  //   "v-marker-cluster": Vue2LeafletMarkerCluster
  // },
  data() {
    return {
      zoom: 9,
      minZoom: 1,
      maxZoom: 18,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "brandon.xiang",
      title: "test-marker",
      opacity: 1,
      draggable: false,
      attributionControl: false
    };
  },

  computed: {
    ...mapGetters(["center", "cityName", "cities", "getMap", "attractions"])
  },

  mounted() {
    this.SET_HEADER({
      title: this.$t("Map"),
      rightOption: { show: true, name: "城市", link: "cities" }
    });
    this.addControl(new locateControl());
    this.loadAttractionsAndCategories();
  },

  methods: {
    ...mapMutations(["SET_HEADER", "addControl"]),
    loadAttractionsAndCategories() {
      this.$store.dispatch("fetchCategories").then(res => {
        this.$store.dispatch("fetchAttractions");
      });
      this.locate();
    },
    getIcon(category) {
      const icon = IconsDictionary[category];
      return icon;
    },
    locate() {
      // const map = this.getMap;
      console.log(this.center);
    },
    onZoomEnd(args) {
      console.log("Zoom ended" + this.zoom);
    }
  }
};
</script>

<style>
@import "https://cdn.bootcss.com/leaflet/1.0.3/leaflet.css";
@import "~leaflet.locatecontrol/dist/L.Control.Locate.css";
@import "//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css";

#map {
  width: 100%;
  height: 100%;
}
</style>
