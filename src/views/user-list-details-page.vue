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
    </div>
  </div>
</template>

<script>
import lodash from "lodash";
export default {
  name: "user-list-details-page",
  data() {
    return {
      userInfo: {},
      baseUrl: ""
    };
  },
  created() {
    this.$api.weChatUserInfoAPI
      .getUserInfo({
        personId: this.parentData.personId
      })
      .then(res => {
        if (lodash.isEqual(res.code, "success")) {
          this.userInfo = res.data;
        } else {
          this.$vb.plugin.message.error(`获取用户信息失败:${res.code}`);
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
@import "~@/assets/scss/user-list-details-page.scss";
</style>
