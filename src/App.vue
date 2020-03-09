<template>
  <div id="app">
    <main-content />
  </div>
</template>

<script>
import mainContent from "@/components/main-content.vue";
export default {
  name: "app",
  components: {
    mainContent
  },
  data() {
    return {
      screenHeight: 0
    };
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
</style>
