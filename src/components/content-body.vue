<template>
  <div>
    <router-view name="firstScreen" />
  </div>
</template>

<script>
export default {
  name: "content-body",
  props: ["menuName"],
  created() {
    console.log(this.$route.params.menuName);
    this.$router.push({ name: this.menuName });
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/content-body.scss";
</style>
