import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    resultFlag: "",
    resultShow: false
  },
  mutations: {
    changeResultState(state, val) {
      state.resultFlag = val;
      state.resultShow = true;
    },
    changeResultClose(state) {
      state.resultShow = false;
    }
  },
  actions: {},
  modules: {}
});
