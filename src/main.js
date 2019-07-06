// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import FastClick from "fastclick";
import vuexI18n from "vuex-i18n";
import VueLeaflet from "vueleaflet";
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
// const componentsLocales = require('json-loader!yaml-loader!vux/src/locales/components.yml')
import locales from "./locales/locales";

Vue.use(DevicePlugin);
Vue.use(AjaxPlugin);
Vue.use(vuexI18n.plugin, store);
Vue.use(VueLeaflet.plugin, store);
Vue.use(VueMeta);
Vue.use(VueOnsen);

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
    title: "小好应用",
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
