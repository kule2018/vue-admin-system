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
  },
  mounted() {},
  methods: {}
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
</style>
