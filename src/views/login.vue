<!--登录组件-->
<template>
  <div id="loginArea">
    <div class="login-panel">
      <div class="left-banner"></div>
      <div class="right-panel">
        <div class="login-logo">
          <img src="http://v10.e-office.cn/eoffice10/server/public/login/logo/logo.png?123456" alt="">
        </div>
        <div class="tools-bar">
          <svg t="1583293612513" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2255" width="16" height="16"><path d="M810.542274 1023.573511a42.648896 42.648896 0 0 1 0-85.297793h85.297793a42.648896 42.648896 0 0 0 42.648896-42.648896v-85.297792a42.648896 42.648896 0 0 1 85.297793 0v85.297792a127.946689 127.946689 0 0 1-127.946689 127.946689zM213.457726 1023.573511H128.159933a127.946689 127.946689 0 0 1-127.946689-127.946689v-85.297792a42.648896 42.648896 0 0 1 85.297793 0v85.297792a42.648896 42.648896 0 0 0 42.648896 42.648896h85.297793a42.648896 42.648896 0 0 1 0 85.297793z m767.680133-469.137859H42.862141a42.648896 42.648896 0 0 1 0-85.297793h938.275718a42.648896 42.648896 0 0 1 0 85.297793z m0-298.542274a42.648896 42.648896 0 0 1-42.648896-42.648897V127.946689a42.648896 42.648896 0 0 0-42.648896-42.648896h-85.297793a42.648896 42.648896 0 0 1 0-85.297793h85.297793a127.946689 127.946689 0 0 1 127.946689 127.946689v85.297792a42.648896 42.648896 0 0 1-42.648897 42.648897zM42.862141 239.686797a42.648896 42.648896 0 0 1-42.648897-42.648896V127.946689a127.946689 127.946689 0 0 1 127.946689-127.946689h85.297793a42.648896 42.648896 0 0 1 0 85.297793H128.159933a42.648896 42.648896 0 0 0-42.648896 42.648896v69.091212a42.648896 42.648896 0 0 1-42.648896 42.648896z" p-id="2256"></path></svg>
        </div>
        <div class="login-form">
          <label>
            <Icon class="el-icon-user"></Icon>
            <input type="text" ref="username" placeholder="账号" v-model="userInfo.userName">
          </label>
          <label>
            <Icon class="el-icon-unlock"></Icon>
            <input type="text" ref="password" placeholder="密码" v-model="userInfo.password">
          </label>
          <label style="width: 60%">
            <Icon class="el-icon-key"></Icon>
            <input type="text" ref="keycode" placeholder="验证码" v-model="userInfo.code">
          </label>
          <div class="key-code"></div>
          <button @click="login">登录</button>
        </div>
        <div class="scan-code-panel">
          <div ref="scanQrCode"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Icon } from 'element-ui'
export default {
  name: "login",
  components: {
    Icon
  },
  data() {
    return {
      // 用户信息
      userInfo: {
        userName: "",
        password: "",
        code: ""
      },
      // 记住密码状态
      rememberPasswordStatus: "",
      state: {
        showLanguages: false
      }
    };
  },
  methods: {
    login: function() {
      this.$router.push({ name: "index" });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.username.focus()
    })
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/login.scss";
</style>
