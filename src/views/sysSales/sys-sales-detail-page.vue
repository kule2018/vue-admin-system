<template>
  <div class="detail-box" :class="parentData.colNum" v-loading="loading">
    <div>
      <div>活动封面</div>
      <div>
        <el-image
          style="width: 100px; height: 100px"
          v-if="detail.coverFigurePath"
          :src="detail.coverFigurePath"
          :preview-src-list="[detail.coverFigurePath]"
        >
        </el-image>
      </div>
    </div>
    <div>
      <div>活动标题</div>
      <div>{{ detail.title }}</div>
    </div>
    <div>
      <div>开始时间</div>
      <div>{{ detail.startTime }}</div>
    </div>
    <div>
      <div>结束时间</div>
      <div>{{ detail.endTime }}</div>
    </div>
    <div>
      <div>活动详情</div>
      <div v-html="detail.detailContent" style="display: block;"></div>
    </div>
  </div>
</template>

<script>
import base from "@/api/base";
import _ from "lodash";

export default {
  name: "sys-bulletin-detail",
  data() {
    return {
      detail: {},
      baseUrl: "",
      loading: true
    };
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
  },
  mounted() {
    this.baseUrl = base.defaultBaseUrl;
    this.$api.sysSalesManageAPI
      .getSysSalesInfo({ salesPromotionId: this.parentData.salesPromotionId })
      .then(res => {
        if (_.isEqual(res.code, "success")) {
          res.data.coverFigurePath = this.baseUrl + res.data.coverFigurePath;
          this.detail = res.data;
        } else {
          this.$layer.close(this.layerid);
          this.$vb.plugin.message.error(`获取活动信息失败:${res.code}`);
        }
        this.loading = false;
      });
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/user/user-list-details-page.scss";
</style>
