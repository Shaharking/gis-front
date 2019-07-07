<template>
  <div class="full-height">
    <div id="map" ref="map"></div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import locateControl from "leaflet.locatecontrol";
import IconsDictionary from "./../utils/markerIcons.js";
import { latLng } from "leaflet";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster-src";
import { setTimeout } from "timers";
// import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";

export default {
  data() {
    return {
      map: undefined,
      attractionsCluster: undefined,
      zoom: 13,
      center: L.latLng(47.41322, -1.219482),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.41322, -1.219482)
    };
  },

  computed: {
    // ...mapGetters(["center", "cityName", "cities", "getMap", "attractions"]) //
    attractions() {
      const attractions = this.$store.getters["attractions"];
      return attractions;
    }
  },

  mounted() {
    // this.SET_HEADER({
    //   title: this.$t("Map"),
    //   rightOption: { show: true, name: "城市", link: "cities" }
    // });
    // // this.addControl(new locateControl());

    this.loadAttractionsAndCategories();
    var mymap = L.map("map").setView([51.505, -0.09], 13);
    this.map = mymap;
    const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const streetMapUrl = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
    L.tileLayer(url, {
      attribution: "OpenStreetMap",
      maxZoom: 15,
      id: "mapbox.streets"
    }).addTo(mymap);

    L.control.locate().addTo(mymap);

    var cluster = L.markerClusterGroup({
      maxClusterRadius: 80,
      chunkedLoading: true
    }).addTo(mymap);

    this.attractionsCluster = cluster;
  },

  methods: {
    ...mapMutations(["SET_HEADER"]), //,"addControl"]),
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
    },

    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    }
  },
  watch: {
    attractions() {
      console.log(this.attractions);
      //var markers = L.markerClusterGroup({ chunkedLoading: true });
      var cities = [];
      this.attractions.forEach(attraction => {
        var a = attraction.position;
        var title = attraction.name;
        var marker = L.marker(L.latLng(a[0], a[1]), {
          title: title,
          icon: this.getIcon(attraction.category)
        });
        marker.bindPopup(`${title} <br/> ${attraction.category}`);
        marker.addTo(this.attractionsCluster);
        //markers.addLayer(marker);
      });
      // this.map.addLayer(markers);
    }
  }
};
</script>

<style>
/* @import "https://cdn.bootcss.com/leaflet/1.0.3/leaflet.css";
@import "~leaflet.locatecontrol/dist/L.Control.Locate.css";
@import "//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"; */
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.0/css/font-awesome.min.css");
@import url("//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css");
@import url("//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css");
@import "https://cdnjs.cloudflare.com/ajax/libs/ionicons/1.5.2/css/ionicons.min.css";

#map {
  width: 100%;
  height: 100%;
}
</style>
