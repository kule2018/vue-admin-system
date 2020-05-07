<template>
  <div class="detail-box" :class="parentData.colNum" v-loading="loading">
    <div>
      <div>品牌名</div>
      <div>{{ detailsInfo.brandName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailsInfo: {},
      loading: true
    };
  },
  mounted() {
    const self = this;
    this.$api.commodityBrandMangeAPI
      .getCommodityBrandInfo({ brandId: this.parentData.brandId })
      .then(res => {
        self.detailsInfo = res.data;
        this.loading = false;
      });
  },
  props: {
    // 父组件传的数据
    parentData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    layerid: {
      // 当前弹层id，用于关闭弹层
      type: String,
      default: ""
    },
    lydata: {
      // 该值为父组件data的浅拷贝,更改父窗口传递的数据的时候，可以直接使用lydata来修改
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/user/user-list-details-page.scss";
</style>
