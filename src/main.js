import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./api/index";
import "./plugins/element.js";

Vue.config.productionTip = false;

// 挂载到原型
Vue.prototype.$api = api;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
