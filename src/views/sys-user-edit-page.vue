<template>
  <div id="layerContent" class="sys-user-edit">
    <div class="content-panel">
      <div class="main-content">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="头像" style="height: 40px;">
            <div class="upload-avatar">
              <span
                ref="upload"
                class="avatar-box"
                @click="$refs.uploadFile.click()"
              >
                <el-avatar :src="form.iconPath" class="avatar"></el-avatar>
              </span>
              <input
                type="file"
                class="upload"
                accept="image/png,image/jpeg"
                @change="upload($event)"
                ref="uploadFile"
              />
              <el-button
                style="margin-left: 15px;"
                plain
                size="mini"
                @click="$refs.uploadFile.click()"
                >上传</el-button
              >
            </div>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input
              v-model="form.nickName"
              placeholder="请输入昵称"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input
              v-model="form.loginName"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" v-if="!(parentData.state === 'update')">
            <el-input
              :type="showPwdType"
              placeholder="请输入密码"
              v-model="form.loginPwd"
            >
              <i
                slot="suffix"
                class="el-input__icon el-icon-view"
                @mousedown="showPwd = true"
                @mouseup="showPwd = false"
                :style="{ color: showPwdIcon }"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item label="角色类型">
            <el-select
              v-model="form.roleName"
              placeholder="请选择角色类型"
              value=""
            >
              <el-option
                v-for="(item, index) in roleList"
                :key="index"
                :label="item.name"
                :value="item.roleTypeId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
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
  name: "sys-user-edit",
  data() {
    return {
      form: {
        iconPath: "",
        nickName: "",
        loginName: "",
        loginPwd: "",
        roleTypeid: "",
        roleName: ""
      },
      roleList: [],
      defaultRole: "",
      showPwd: false,
      showPwdType: "password",
      baseUrl: ""
    };
  },
  watch: {
    showPwd() {
      this.showPwdType = this.showPwd ? "text" : "password";
    }
  },
  computed: {
    showPwdIcon() {
      return this.showPwd ? "#409eff" : "#c2c9d3";
    }
  },
  methods: {
    onSubmit() {
      const self = this;
      if (!_.isNaN(+this.form.roleName)) {
        this.form.roleTypeId = this.form.roleName;
      }
      if (this.parentData.state === "add") {
        this.$api.sysUserInfoAPI.addUserInfo(this.form).then(res => {
          if (res.code === "success") {
            self.$vb.plugin.message.success("成功", "增加成功");
            this.$parent.search();
            this.$layer.close(this.layerid);
          }
        });
      } else {
        this.$api.sysUserInfoAPI.updateUserInfo(this.form).then(res => {
          if (res.code === "success") {
            self.$vb.plugin.message.success("成功", "修改成功");
            this.updateLocal(this.form);
            this.$parent.search();
            this.$layer.close(this.layerid);
          }
        });
      }
    },
    cancel() {
      this.$layer.close(this.layerid);
    },
    upload(ev) {
      console.log(ev);
      const self = this;
      this.form.iconPath = "";
      this.form = Object.assign({}, this.form);
      let file = ev.target.files[0];
      let formData = new FormData();
      formData.append("file", file, file.name);
      this.$nextTick(() => {
        this.$api.fileManageAPI.singleFileUpload(formData).then(res => {
          self.form.iconPath = baseUrl.defaultBaseUrl + res.data.path;
          self.form = Object.assign({}, self.form);
        });
      });
    },
    updateLocal(obj) {
      let localData = JSON.parse(localStorage.getItem("userInfo"));
      if (obj.userid === localData.userid) {
        localStorage.setItem(
          "userInfo",
          JSON.stringify(Object.assign(localData, obj))
        );
        this.$store.commit(
          "setUserInfo",
          JSON.parse(localStorage.getItem("userInfo"))
        );
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
    },
    content: {}
  },
  mounted() {
    const self = this;
    this.$api.sysUserInfoAPI.getRoleList({}).then(res => {
      self.roleList = res.data;
    });
    this.baseUrl = baseUrl.defaultBaseUrl;
    if (this.parentData.state === "update") {
      this.$api.sysUserInfoAPI
        .getUserInfo({ userid: this.parentData.userid[0] })
        .then(res => {
          res.data.iconPath = baseUrl.defaultBaseUrl + res.data.iconPath;
          self.form = Object.assign({}, res.data);
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/sys-user-edit.scss";
</style>
