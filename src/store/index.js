import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    resultFlag: "",
    resultShow: false,
    userInfo: {}
  },
  mutations: {
    changeResultState(state, val) {
      state.resultFlag = val;
      state.resultShow = true;
    },
    changeResultClose(state) {
      state.resultShow = false;
    },
    setUserInfo(state, val) {
      state.userInfo = val;
    }
  },
  actions: {},
  modules: {}
});
