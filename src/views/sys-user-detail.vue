<template>
  <div class="detail-box" :class="parentData.colNum">
    <div>
      <div>用户头像</div>
      <div>
        <el-avatar :src="baseUrl + sysUserInfo.iconPath" />
      </div>
    </div>
    <div>
      <div>用户ID</div>
      <div>{{ sysUserInfo.userid }}</div>
    </div>
    <div>
      <div>用户名</div>
      <div>{{ sysUserInfo.loginName }}</div>
    </div>
    <div>
      <div>用户类型</div>
      <div>{{ sysUserInfo.roleName }}</div>
    </div>
    <div>
      <div>用户昵称</div>
      <div>{{ sysUserInfo.nickName }}</div>
    </div>
  </div>
</template>

<script>
import baseUrl from "@/api/base";
export default {
  name: "sys-user-detail",
  data() {
    return {
      sysUserInfo: {},
      baseUrl: ""
    };
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
  },
  mounted() {
    const self = this;
    this.$api.sysUserInfoAPI
      .getUserInfo({ userid: this.parentData.userid })
      .then(res => {
        self.sysUserInfo = res.data;
        this.baseUrl = baseUrl.defaultBaseUrl;
      });
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/detail-page.scss";
</style>
