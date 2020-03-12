<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "content-body",
  props: ["menuName"],
  created() {
    // 默认跳转首屏
    this.$router.push({
      name: "firstScreen"
    });
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/content-body.scss";
</style>
