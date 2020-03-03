<template>
  <div>{{ menuName }}，对应的内容</div>
</template>

<script>
export default {
  name: "content-body",
  props: ["menuName"]
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/content-body.scss";
</style>
