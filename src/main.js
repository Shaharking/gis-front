// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import FastClick from "fastclick";
import vuexI18n from "vuex-i18n";
// import VueLeaflet from "vueleaflet";
// import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet-sidebar-v2/css/leaflet-sidebar.min.css";
import "leaflet-search/src/leaflet-search.css";

import VueMeta from "vue-meta";
import { sync } from "vuex-router-sync";
import objectAssign from "object-assign";
import DevicePlugin from "vux/src/plugins/device";
import AjaxPlugin from "vux/src/plugins/ajax";
import vuxLocales from "json-loader!yaml-loader!vux/src/locales/all.yml";
import router from "./router";
import store from "./store";
import App from "./App";

import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";
import VueOnsen from "vue-onsenui";

import "./assets/leaflet.awesome-markers.min.js";
import "./assets/leaflet.awesome-markers.css";
// const componentsLocales = require("json-loader!yaml-loader!vux/src/locales/components.yml");
import locales from "./locales/locales";
import PortalVue from "portal-vue";

import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

import axios from "axios";
import VModal from 'vue-js-modal';

axios.interceptors.request.use(
  config => {
    let token = store.getters.user.token;
    if (token) {
      config.headers["authorization"] = `${token}`;
    }
    return config;
  },

  error => {
    return Promise.reject(error);
  }
);

Vue.component("VueCtkDateTimePicker", VueCtkDateTimePicker);

Vue.use(DevicePlugin);
Vue.use(AjaxPlugin);
Vue.use(vuexI18n.plugin, store);
// Vue.use(VueLeaflet.plugin, store);
Vue.use(VueMeta);
Vue.use(VueOnsen);
Vue.use(PortalVue);
Vue.use(VModal, { dynamic: true, injectModalsContainer: true });
// Vue.use(Antd);

// Vue.component("l-map", LMap);
// Vue.component("l-tile-layer", LTileLayer);
// Vue.component("l-marker", LMarker);

// delete Icon.Default.prototype._getIconUrl;

// Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png")
// });

Vue.config.productionTip = false;

FastClick.attach(document.body);

const finalLocales = {
  en: objectAssign(vuxLocales.en, locales.en),
  "zh-CN": objectAssign(vuxLocales["zh-CN"], locales["zh-CN"])
};
Vue.i18n.add("en", finalLocales.en);
Vue.i18n.add("zh-CN", finalLocales["zh-CN"]);
Vue.i18n.set("en");

const history = window.sessionStorage;
history.clear();
let historyCount = history.getItem("count") * 1 || 0;
history.setItem("/", 0);

router.beforeEach((to, from, next) => {
  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);

  if (toIndex) {
    if (
      toIndex > fromIndex ||
      !fromIndex ||
      (toIndex === "0" && fromIndex === "0")
    ) {
      store.commit("UPDATE_DIRECTION", { direction: "forward" });
    } else {
      store.commit("UPDATE_DIRECTION", { direction: "reverse" });
    }
  } else {
    ++historyCount;
    history.setItem("count", historyCount);
    to.path !== "/" && history.setItem(to.path, historyCount);
    store.commit("UPDATE_DIRECTION", { direction: "forward" });
  }

  if (/\/http/.test(to.path)) {
    const url = to.path.split("http")[1];
    window.location.href = `http${url}`;
  } else {
    next();
  }
});

sync(store, router);

new Vue({
  router,
  store,
  metaInfo: () => ({
    title: "GIS PRO",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ]
  }),
  render: h => h(App)
}).$mount("#app");

// if (window.addEventListener) {
//   window.addEventListener("resize", setFont, false)
//   setFont();
// }

// service worker
// if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/service-worker.js')
// }
