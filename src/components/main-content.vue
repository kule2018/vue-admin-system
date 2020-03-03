<!--主体内容组件：控制登录组件和系统主页面的加载-->
<template>
  <!--加载登录组件-->
  <div v-if="currentComponentName === 'login'" class="main-content">
    <router-view name="login" />
  </div>
  <!--加载登录后的页面-->
  <div v-else class="main-content">
    <router-view name="index" />
  </div>
</template>

<script>
export default {
  name: "main-content",
  data() {
    return {
      // 当前路由使用的组件
      currentComponentName: null
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        // 路由发生改变时，更改当前组件名称
        this.currentComponentName = route.name;
      },
      immediate: true
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/main-content.scss";
</style>
