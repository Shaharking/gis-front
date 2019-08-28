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
          <li>
            <a href="#messages" role="tab">
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
            Actions
            <span class="leaflet-sidebar-close">
              <i class="fa fa-caret-left"></i>
            </span>
          </h1>

          <v-ons-list>
            <v-ons-list-header>Default</v-ons-list-header>
            <v-ons-list-item class="menu-item">Home</v-ons-list-item>
            <v-ons-list-item class="menu-item">Existing travel</v-ons-list-item>
            <v-ons-list-item class="menu-item">Create a new trip</v-ons-list-item>
            <v-ons-list-item class="menu-item">List of attractions</v-ons-list-item>
          </v-ons-list>
        </div>

        <div class="trip-attractions" id="autopan">
          <h1 class="leaflet-sidebar-header">
            Menu
            <span class="leaflet-sidebar-close">
              <i class="fa fa-caret-left"></i>
            </span>
          </h1>
          <new-trip></new-trip>
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
import NewTrip from "../components/newTrip";
// import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";
import "leaflet.featuregroup.subgroup";
import "leaflet-sidebar-v2/js/leaflet-sidebar";
import "leaflet-search/dist/leaflet-search.src";

function myFunction() {
  console.log("i got clicked");
}

export default {
  components: {
    NewTrip
  },
  data() {
    return {
      map: undefined,
      attractionsCluster: undefined,
      attractionGroups: [],
      control: undefined,
      zoom: 13,
      center: L.latLng(47.41322, -1.219482),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.41322, -1.219482),
      selectedCategories: []
    };
  },

  computed: {
    // ...mapGetters(["center", "cityName", "cities", "getMap", "attractions"]) //
    attractions() {
      const attractions = this.$store.getters["attractions"];
      return attractions;
    },
    categories() {
      const categories = this.$store.getters["categories"];
      console.log(categories);
      return categories;
    }
  },

  mounted() {
    // this.SET_HEADER({
    //   title: this.$t("Map"),
    //   rightOption: { show: true, name: "城市", link: "cities" }
    // });
    // // this.addControl(new locateControl());
    this.SET_HEADER({ title: this.$t("Map") });
    this.loadAttractionsAndCategories();
    var mymap = L.map("map").setView([52.37403, 4.88969], 13);
    this.map = mymap;
    const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const streetMapUrl = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
    L.tileLayer(url, {
      attribution: "OpenStreetMap",
      maxZoom: 15,
      id: "mapbox.streets"
    }).addTo(mymap);

    L.control.locate().addTo(mymap);
    var control = L.control.layers(null, null, { collapsed: false });
    this.control = control;

    var cluster = L.markerClusterGroup({
      maxClusterRadius: 80,
      chunkedLoading: true
    });

    cluster.addTo(mymap);

    this.attractionsCluster = cluster;

    //
    try {
      var sidebar = L.control
        .sidebar({ container: "sidebar" })
        .addTo(mymap)
        .open("profile");
    } catch (ex) {}

    // var searchLayer = L.layerGroup().addTo(mymap);
    mymap.addControl(new L.Control.Search({ layer: cluster }));

    document.addEventListener(
      "click",
      event => {
        if (event.target.matches(".add-attraction-trip")) {
          // Run your code to open a modal
          let attributes = event.target.attributes;
          attributes = Object.keys(attributes).reduce((acc, x) => {
            Object.assign(acc, {
              [attributes[x].name]: attributes[x].value
            });
            return acc;
          }, {});
          const attractionId = attributes["data-attraction-id"];
          this.$store.dispatch("addTripAttraction", {
            attraction_id: attractionId,
            date_from: undefined,
            date_to: undefined
          });
        }
      },
      false
    );
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
    },
    myFunction() {
      console.log("saasds");
    }
  },
  watch: {
    attractions() {
      console.log(this.attractions);
      this.categories.forEach(category => {
        if (!this.attractionGroups[category.category_name]) {
          var group = L.featureGroup.subGroup(this.attractionsCluster);
          this.attractionGroups[category.category_name] = group;
          this.control.addOverlay(group, category.category_name);
          group.addTo(this.map);
        }
      });
      //var markers = L.markerClusterGroup({ chunkedLoading: true });
      var cities = [];
      this.attractions.forEach(attraction => {
        var a = attraction.position;
        var title = attraction.name;
        var marker = L.marker(L.latLng(a[0], a[1]), {
          title: title,
          icon: this.getIcon(attraction.category)
        });
        marker.bindPopup(
          `${title} <br/> ${attraction.category} </br> Loading...`
        );
        (attraction => {
          marker.on("click", e => {
            var popup = e.target.getPopup();
            var url = attraction.description;
            fetch(url)
              .then(response => {
                return response.json();
              })
              .then(data => {
                var links = Object.keys(data.external_urls)
                  .filter(key => {
                    return !!data.external_urls[key];
                  })
                  .map(key => {
                    return `<a href=" ${data.external_urls[key]}" target="_blank"> ${data.external_urls[key]} </a> <br/>`;
                  });

                popup.setContent(`
                  ${attraction.name} <br/>
                  ${data.address ? `Address: ${data.address} <br/> ` : ""}
                  Category: ${data.category}  <br/>
                  ${data.description.en}  <br/>
                  More information on:  <br/>
                  ${links}
                  <button class="add-attraction-trip" data-attraction-id="${
                    attraction.id
                  }" >Click me</button>
                `);

                popup.update();
              });
          });
        })(attraction);

        var group = this.attractionGroups[attraction.category];
        //marker.addTo(this.attractionsCluster);
        marker.addTo(group);
        //markers.addLayer(marker);
      });
      this.control.addTo(this.map);
      // this.map.addLayer(markers);
    }
  },
  categories() {}
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

.menu-item {
  cursor: pointer;
}

.trip-attractions {
  /* width: 1000px; */
}

.menu {
  color: black;
  font-size: 120%;
}

.leaflet-sidebar-header {
  margin: 0 0px 0;
}

.leaflet-sidebar-pane {
  padding: 0 0 0;
}
</style>
