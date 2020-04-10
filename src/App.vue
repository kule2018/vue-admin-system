<template>
  <div id="app">
    <main-content />
  </div>
</template>

<script>
import mainContent from "@/components/main-content.vue";
import lodash from "lodash";
export default {
  name: "app",
  components: {
    mainContent
  },
  created() {
    const self = this;
    // 给vuex中的userInfo赋值
    if (!lodash.isUndefined(localStorage.getItem("userInfo"))) {
      this.$store.state.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    }
    setInterval(() => {
      self.$api.systemManageAPI.getMenuList({
        headers: {
          tieck: self.$store.state.userInfo.tieck
        }
      });
    }, 1200000);
    console.log("layui集成成功");
    console.log(layui);
    layui.use("layim", layim => {
      console.log("layim集成成功");
      console.log(layim);
    });
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
body {
  box-sizing: border-box;
}
#app {
  width: 100%;
  height: 100%;
  position: fixed;
}
/*整体部分*/
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/*滑动轨道*/
::-webkit-scrollbar-track {
  border-radius: 0;
  background: none;
}
/*滑块*/
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #ddd;

  &:hover {
    background-color: #d3d3d3;
  }
}

.el-image-viewer__wrapper {
  top: 42px !important;
}
</style>
