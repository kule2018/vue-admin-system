import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    resultFlag: "",
    resultShow: false,
    userInfo: {},
    errorTimes: 0
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
    },
    reduceErrorTimes(state) {
      state.errorTimes++;
    },
    resetErrorTimes(state) {
      state.errorTimes = 0;
    }
  },
  actions: {},
  modules: {}
});
