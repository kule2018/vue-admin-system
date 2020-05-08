<template>
  <div class="detail-box" :class="parentData.colNum" v-loading="loading">
    <div>
      <div>公告内容</div>
      <div>{{ detail.content }}</div>
    </div>
    <div>
      <div>开始时间</div>
      <div>{{ detail.startTime }}</div>
    </div>
    <div>
      <div>结束时间</div>
      <div>{{ detail.endTime }}</div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "sys-bulletin-detail",
  data() {
    return {
      detail: {},
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
    this.$api.sysBulletinBoardManageAPI
      .getSysBulletinInfo({ bulletinBoardId: this.parentData.bulletinBoardId })
      .then(res => {
        if (_.isEqual(res.code, "success")) {
          this.detail = res.data;
          this.loading = false;
        } else {
          this.$layer.close(this.layerid);
          this.$vb.plugin.message.error(`获取公告信息失败:${res.code}`);
        }
      });
  }
};
</script>

<style scoped lang="scss"></style>
