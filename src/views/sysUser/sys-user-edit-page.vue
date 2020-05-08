<template>
  <div id="layerContent" class="sys-user-edit" v-loading="loading">
    <div class="content-panel">
      <div class="main-content">
        <el-form :model="form" :rules="rules" ref="form" label-width="80px">
          <el-form-item label="头像" style="height: 40px;" prop="iconPath">
            <div class="upload-avatar">
              <span
                ref="upload"
                class="avatar-box"
                @click="$refs.uploadFile.click()"
              >
                <el-avatar
                  v-if="form.iconPath"
                  :src="baseUrl + form.iconPath"
                  class="avatar"
                ></el-avatar>
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
          <el-form-item label="昵称" prop="nickName">
            <el-input
              v-model="form.nickName"
              placeholder="请输入昵称"
              size="small"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="loginName">
            <el-input
              v-if="parentData.state === 'add'"
              v-model="form.loginName"
              placeholder="请输入用户名"
              size="small"
              clearable
            ></el-input>
            <span v-else>{{ form.loginName }}</span>
          </el-form-item>
          <el-form-item
            label="密码"
            v-if="!(parentData.state === 'update')"
            prop="loginPwd"
          >
            <el-input
              :type="showPwdType"
              placeholder="请输入密码"
              v-model="form.loginPwd"
              size="small"
              clearable
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
          <el-form-item label="角色类型" prop="roleTypeId">
            <el-select
              v-model="defaultRole"
              placeholder="请选择角色类型"
              value=""
              size="small"
              @change="roleChange"
              clearable
            >
              <el-option
                v-for="(item, index) in roleList"
                :key="index"
                :label="item.name"
                :value="item.roleTypeId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供应商" v-if="+defaultRole === 450">
            <el-input
              :readonly="true"
              v-model="supplierName"
              size="small"
              style="width: 215px"
            ></el-input>
            <el-button
              size="small"
              style="margin-left: 10px;"
              @click="allot"
              type="primary"
              >分配</el-button
            >
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
import allotSupplierPage from "@/views/supplier/allot-supplier-page";

export default {
  name: "sys-user-edit",
  data() {
    return {
      form: {
        iconPath: "",
        nickName: "",
        loginName: "",
        loginPwd: "",
        roleTypeId: "",
        supplierId: ""
      },
      rules: {
        iconPath: [{ required: true, message: "请上传头像" }],
        nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        loginName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        loginPwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        roleTypeId: [
          { required: true, message: "请选择角色类型", trigger: "change" }
        ]
      },
      roleList: [],
      defaultRole: "",
      showPwd: false,
      showPwdType: "password",
      baseUrl: "",
      defaultSupplierId: "",
      supplierName: "",
      roleChangeFlag: 0,
      loading: false
    };
  },
  watch: {
    showPwd() {
      this.showPwdType = this.showPwd ? "text" : "password";
    },
    defaultRole() {
      this.form.roleTypeId = this.defaultRole;
    },
    defaultSupplierId(val) {
      this.form.supplierId = val;
    }
  },
  computed: {
    showPwdIcon() {
      return this.showPwd ? "#409eff" : "#c2c9d3";
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (!this.form.supplierId && +this.defaultRole === 450) {
          valid = false;
          this.$layer.msg("请分配供应商");
        }
        if (valid) {
          if (this.parentData.state === "add") {
            this.$api.sysUserInfoAPI.addUserInfo(this.form).then(res => {
              if (_.isEqual(res.code, "success")) {
                this.$layer.msg(res.msg);
                this.$parent.search();
                this.$layer.close(this.layerid);
              } else {
                this.$vb.plugin.message.error("失败", res.msg);
              }
            });
          } else {
            this.$api.sysUserInfoAPI.updateUserInfo(this.form).then(res => {
              if (_.isEqual(res.code, "success")) {
                this.$layer.msg(res.msg);
                this.updateLocal(this.form);
                this.$parent.search();
                this.$layer.close(this.layerid);
              } else {
                this.$vb.plugin.message.error("失败", res.msg);
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.$layer.close(this.layerid);
    },
    upload(ev) {
      const self = this;
      let file = ev.target.files[0];
      if (file.size > 1024 * 1024) {
        this.$layer.msg("头像大小不能超过1M");
        ev.target.value = "";
        return;
      }
      this.form.iconPath = "";
      this.form = Object.assign({}, this.form);
      let formData = new FormData();
      formData.append("file", file, file.name);
      this.$nextTick(() => {
        this.$api.fileManageAPI.singleFileUpload(formData).then(res => {
          self.form.iconPath = res.data.path;
          self.form = Object.assign({}, self.form);
        });
      });
    },
    updateLocal(obj) {
      this.baseUrl = baseUrl.defaultBaseUrl;
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
    },
    allot() {
      this.$vb.plugin.openLayer(
        allotSupplierPage,
        this,
        { state: "user" },
        "分配供应商",
        1200,
        "80%"
      );
    },
    roleChange() {
      if (this.roleChangeFlag === 0) {
        this.roleChangeFlag++;
        return;
      }
      this.defaultSupplierId = "";
      this.form.supplierId = "";
      this.supplierName = "";
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
      this.loading = true;
      this.$api.sysUserInfoAPI
        .getUserInfo({ userid: this.parentData.userid })
        .then(res => {
          this.defaultRole = res.data.roleTypeId;
          this.defaultSupplierId = res.data.supplierId;
          this.supplierName = res.data.supplierName;
          self.form = Object.assign({}, res.data);
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/sys-user-edit.scss";
</style>
