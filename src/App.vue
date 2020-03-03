<template>
  <div id="app" :style="{ height: screenHeight }">
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
  },
  mounted() {
    this.screenHeight = this.getThisWindowHeight() + "px";
  },
  methods: {
    // 获取当前屏幕高度
    getThisWindowHeight: () => window.innerHeight
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
}
</style>
