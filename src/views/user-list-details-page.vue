<template>
  <div>
    <div class="detail-box" :class="parentData.colNum">
      <div>
        <div>用户头像</div>
        <div><el-avatar :src="userInfo.avatarUrl" /></div>
      </div>
      <div>
        <div>昵称</div>
        <div>{{ userInfo.nickName }}</div>
      </div>
      <div>
        <div>手机号</div>
        <div>{{ userInfo.phone }}</div>
      </div>
      <div>
        <div>单位</div>
        <div>{{ userInfo.unit }}</div>
      </div>
      <div>
        <div>余额</div>
        <div>{{ userInfo.balance }}</div>
      </div>
      <div>
        <div>积分</div>
        <div>{{ userInfo.integral }}</div>
      </div>
      <div>
        <div>状态</div>
        <div>{{ userInfo.statusName }}</div>
      </div>
    </div>
    <div class="button__bottom">
      <el-button
        type="danger"
        size="small"
        @click="handleClick('clearIntegral')"
        >清空积分</el-button
      >
      <el-button type="danger" size="small" @click="handleClick('clearBalance')"
        >清空余额</el-button
      >
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "user-list-details-page",
  data() {
    return {
      userInfo: {},
      baseUrl: ""
    };
  },
  mounted() {
    this.$api.weChatUserInfoAPI
      .getUserInfo({
        personId: this.parentData.personId
      })
      .then(res => {
        if (_.isEqual(res.code, "success")) {
          this.userInfo = res.data;
        } else {
          this.$vb.plugin.message.error(`获取用户信息失败:${res.code}`);
        }
      });
  },
  methods: {
    handleClick(state) {
      switch (state) {
        case "clearIntegral":
          this.$confirm("确认清空用户积分吗?", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$api.weChatUserInfoAPI
                .clearIntegral({
                  personId: this.parentData.personId
                })
                .then(res => {
                  if (_.isEqual(res.code, "success")) {
                    this.$layer.msg(res.msg);
                    this.$parent.search();
                    this.$layer.close(this.layerid);
                  } else {
                    this.$vb.plugin.message.error("失败", res.msg);
                  }
                });
            })
            .catch(() => {});
          break;
        case "clearBalance":
          this.$confirm("确认清空用户余额吗?", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$api.weChatUserInfoAPI
                .clearBalance({
                  personId: this.parentData.personId
                })
                .then(res => {
                  if (_.isEqual(res.code, "success")) {
                    this.$layer.msg(res.msg);
                    this.$parent.search();
                    this.$layer.close(this.layerid);
                  } else {
                    this.$vb.plugin.message.error("失败", res.msg);
                  }
                });
            })
            .catch(() => {});
          break;
        default:
          break;
      }
    }
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
@import "~@/assets/scss/user-list-details-page.scss";
</style>
