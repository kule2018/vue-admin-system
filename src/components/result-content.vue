<template>
  <div class="result-panel">
    <template v-if="$store.state.resultFlag === 'success'">
      <icon class="el-icon-success"></icon>
      <span>操作成功</span>
    </template>
    <template v-if="$store.state.resultFlag === 'error'">
      <icon class="el-icon-error"></icon>
      <span>操作失败</span>
    </template>
    <el-button @click="closeResult" plain>确定</el-button>
  </div>
</template>

<script>
import { Icon } from "element-ui";
export default {
  components: {
    Icon
  },
  methods: {
    closeResult() {
      this.$store.commit("changeResultClose", false);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/result-content.scss";
</style>
