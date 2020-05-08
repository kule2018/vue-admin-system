<template>
  <div
    id="layerContent"
    class="detail-box"
    :class="parentData.colNum"
    v-loading="loading"
  >
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
    <div>
      <div required>旧密码</div>
      <div style="overflow: visible;">
        <el-input
          :type="showOldPwdType"
          size="small"
          v-model="form.oldPwd"
          clearable
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-view"
            @mousedown="showOldPwd = true"
            @mouseup="showOldPwd = false"
            :style="{ color: showOldPwdIcon }"
          ></i>
        </el-input>
      </div>
    </div>
    <div>
      <div required>新密码</div>
      <div style="overflow: visible;">
        <el-input
          :type="showNewPwdType"
          size="small"
          v-model="form.newPwd"
          clearable
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-view"
            @mousedown="showNewPwd = true"
            @mouseup="showNewPwd = false"
            :style="{ color: showNewPwdIcon }"
          ></i>
        </el-input>
      </div>
    </div>
    <div class="btn-panel">
      <div class="main-content">
        <el-button @click="cancel" size="small">取消</el-button>
        <el-button type="primary" @click="onSubmit" size="small"
          >确定
        </el-button>
      </div>
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
      form: {
        oldPwd: "",
        newPwd: ""
      },
      sysUserInfo: {},
      loading: true,
      showOldPwd: false,
      showNewPwd: false,
      showOldPwdType: "password",
      showNewPwdType: "password"
    };
  },
  computed: {
    showOldPwdIcon() {
      return this.showOldPwd ? "#409eff" : "#c2c9d3";
    },
    showNewPwdIcon() {
      return this.showNewPwd ? "#409eff" : "#c2c9d3";
    }
  },
  watch: {
    showOldPwd() {
      this.showOldPwdType = this.showOldPwd ? "text" : "password";
    },
    showNewPwd() {
      this.showNewPwdType = this.showNewPwd ? "text" : "password";
    }
  },
  methods: {
    onSubmit() {
      const self = this;
      if (!this.form.oldPwd.toString().trim()) {
        this.$layer.msg("请输入旧密码");
        return;
      }
      if (!this.form.newPwd.toString().trim()) {
        this.$layer.msg("请输入新密码");
        return;
      }
      let sendData = {
        userid: this.parentData.userid
      };
      Object.assign(sendData, this.form);
      this.$api.sysUserInfoAPI.updatePassword(sendData).then(res => {
        if (_.isEqual(res.code, "success")) {
          this.$layer.msg("修改成功, 需重新登录");
          setTimeout(() => {
            self.$parent.logout();
          }, 1000);
          this.$layer.close(this.layerid);
        } else {
          this.$layer.msg(res.msg);
        }
      });
    },
    cancel() {
      this.$layer.close(this.layerid);
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
