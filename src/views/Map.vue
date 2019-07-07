<template>
  <div class="full-height">
    <div id="sidebar" class="leaflet-sidebar collapsed">
      <!-- nav tabs -->
      <div class="leaflet-sidebar-tabs">
        <!-- top aligned tabs -->
        <ul role="tablist">
          <li>
            <a href="#home" role="tab">
              <i class="fa fa-bars active"></i>
            </a>
          </li>
          <li>
            <a href="#autopan" role="tab">
              <i class="fa fa-arrows"></i>
            </a>
          </li>
        </ul>

        <!-- bottom aligned tabs -->
        <ul role="tablist">
          <li>
            <a href="https://github.com/nickpeihl/leaflet-sidebar-v2">
              <i class="fa fa-github"></i>
            </a>
          </li>
        </ul>
      </div>

      <!-- panel content -->
      <div class="leaflet-sidebar-content">
        <div class="leaflet-sidebar-pane" id="home">
          <h1 class="leaflet-sidebar-header">
            sidebar-v2
            <span class="leaflet-sidebar-close">
              <i class="fa fa-caret-left"></i>
            </span>
          </h1>

          <p>
            A responsive sidebar for the mapping library
            <a href="http://leafletjs.com/">Leaflet</a>.
          </p>
          <p>Compatible with version 0.7 and 1.x (tested up to 1.2.0)</p>
          <p>
            <b>Select the other panes for a showcase of each feature.</b>
          </p>

          <h2>More examples</h2>
          <ul>
            <li>
              <a href="./position-right.html">Right aligned</a>
            </li>
            <li>
              <a href="./halfheight.html">The sidebar adapts to map container size</a>
            </li>
            <li>
              <a
                href="./leaflet-latest.html"
              >Proof that it works with the latest leaflet version (if not, please report it!)</a>
            </li>
          </ul>

          <p
            class="lorem"
          >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
          <p
            class="lorem"
          >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
          <p
            class="lorem"
          >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
          <p
            class="lorem"
          >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
        </div>

        <div class="leaflet-sidebar-pane" id="autopan">
          <h1 class="leaflet-sidebar-header">
            autopan
            <span class="leaflet-sidebar-close">
              <i class="fa fa-caret-left"></i>
            </span>
          </h1>
          <p>
            <code>Leaflet.control.sidebar({ autopan: true })</code>
            makes shure that the map center always stays visible.
          </p>
          <p>
            The autopan behviour is responsive as well.
            Try opening and closing the sidebar from this pane!
          </p>
        </div>

        <div class="leaflet-sidebar-pane" id="messages">
          <h1 class="leaflet-sidebar-header">
            Messages
            <span class="leaflet-sidebar-close">
              <i class="fa fa-caret-left"></i>
            </span>
          </h1>
        </div>
      </div>
    </div>

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
import SideMenu from "../components/SideMenu";
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

    var sidebar = L.control
      .sidebar({ container: "sidebar" })
      .addTo(mymap)
      .open("profile");
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
