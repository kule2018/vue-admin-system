import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./api/index";
import "./plugins/element.js";
import layer from "vue-layer";
import "vue-layer/lib/vue-layer.css";
import utils from "./utils";

Vue.config.productionTip = false;

// 挂载到原型
Vue.prototype.$api = api;
Vue.prototype.$layer = layer(Vue);
Vue.prototype.$vb = utils;
const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

export default vue;
