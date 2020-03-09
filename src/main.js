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
import echarts from "echarts";
import ElDataTable from "@femessage/el-data-table";
import ElFormRenderer from "@femessage/el-form-renderer";

Vue.config.productionTip = false;

// 挂载到原型
Vue.prototype.$api = api;
Vue.prototype.$layer = layer(Vue);
Vue.prototype.$vb = utils;
Vue.prototype.$echarts = echarts;
// 注册组件
Vue.component("el-form-renderer", ElFormRenderer);
Vue.component("el-data-table", ElDataTable);
const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

export default vue;
