<template>
  <div>
    订单详情
  </div>
</template>

<script>
import lodash from "lodash";
export default {
  name: "order-list-details-page",
  data() {
    return {
      detailsInfo: {},
      baseUrl: ""
    };
  },
  mounted() {
    this.$api.orderManageAPI
      .getOrderInfo({
        materialId: this.parentData.materialId
      })
      .then(res => {
        if (lodash.isEqual(res.code, "success")) {
          this.detailsInfo = res.data;
          this.detailsInfo = Object.assign({}, this.detailsInfo);
        } else {
          this.$vb.plugin.message.error(`获取订单信息失败:${res.code}`);
        }
      });
  },
  props: {
    // 父组件传的数据
    parentData: {
      type: Object,
      default: () => {
        return {};
      }
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
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/order-list-details-page.scss";
</style>
