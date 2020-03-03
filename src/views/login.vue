<!--登录组件-->
<template>
  <div id="loginArea">
    <div class="login-panel">
      <div class="title-panel">
        <p>海南篮子项目</p>
      </div>
      <div class="user-input-panel">
        <div class="row-panel">
          <div class="tips-panel">
            <p>用户名</p>
          </div>
          <div class="input-panel">
            <el-input v-model="userInfo.userName" placeholder="请输入用户名" />
          </div>
        </div>
        <div class="row-panel">
          <div class="tips-panel">
            <p>密码</p>
          </div>
          <div class="input-panel">
            <el-input v-model="userInfo.password" placeholder="请输入用户名" />
          </div>
        </div>
        <div class="row-panel">
          <div class="input-panel">
            <div class="left-panel">
              <el-radio v-model="rememberPasswordStatus" label="1">
                记住密码
              </el-radio>
            </div>
            <div class="right-panel">
              <el-link type="warning">忘记密码</el-link>
            </div>
          </div>
        </div>
        <div class="row-panel">
          <el-button
            @click="login"
            type="primary"
            style="width:100%;height: 60px"
          >
            登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      // 用户信息
      userInfo: {
        userName: "",
        password: ""
      },
      // 记住密码状态
      rememberPasswordStatus: ""
    };
  },
  methods: {
    login: function() {
      this.$router.push({ name: "index" });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/login.scss";
</style>
