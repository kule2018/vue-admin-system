<template>
  <div class="detail-box" :class="parentData.colNum" v-loading="loading">
    <div>
      <div>用户头像</div>
      <div>
        <el-avatar :src="sysUserInfo.iconPath" />
      </div>
    </div>
    <div>
      <div>用户昵称</div>
      <div>{{ sysUserInfo.nickName }}</div>
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
      <div>状态</div>
      <div>{{ sysUserInfo.statusName }}</div>
    </div>
    <div v-if="+sysUserInfo.roleTypeId === 450">
      <div>供应商</div>
      <div>{{ sysUserInfo.supplierName }}</div>
    </div>
  </div>
</template>

<script>
import baseUrl from "@/api/base";
import _ from "lodash";
export default {
  name: "sys-user-detail",
  data() {
    return {
      sysUserInfo: {},
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
    this.$api.sysUserInfoAPI
      .getUserInfo({ userid: this.parentData.userid })
      .then(res => {
        if (_.isEqual(res.code, "success")) {
          res.data.iconPath = baseUrl.defaultBaseUrl + res.data.iconPath;
          this.sysUserInfo = res.data;
        } else {
          this.$layer.close(this.layerid);
          this.$vb.plugin.message.error(`获取系统用户信息失败:${res.code}`);
        }
        this.loading = false;
      });
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/user/user-list-details-page.scss";
</style>
