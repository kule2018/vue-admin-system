<template>
  <div class="detail-box" :class="parentData.colNum">
    <div>
      <div>分类图</div>
      <div>
        <el-avatar v-if="detailsInfo.icon" :src="detailsInfo.icon" />
      </div>
    </div>
    <div>
      <div>分类名</div>
      <div>{{ detailsInfo.name }}</div>
    </div>
    <div>
      <div>排序号</div>
      <div>{{ detailsInfo.sortNumber }}</div>
    </div>
  </div>
</template>

<script>
import baseUrl from "@/api/base";
export default {
  data() {
    return {
      detailsInfo: {}
    };
  },
  mounted() {
    const self = this;
    this.$api.commodityClassifyMangeAPI
      .getCommodityClassifyInfo({ classifyId: this.parentData.classifyId })
      .then(res => {
        res.data.icon = baseUrl.defaultBaseUrl + res.data.icon;
        self.detailsInfo = res.data;
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
