<template>
  <div id="contentPanel">
    <div class="header-panel">
      <div class="main-panel">
        <div class="logo-panel">
          <img
            src="https://static.oschina.net/new-osc/img/logo_new.svg"
            alt=""
          />
        </div>
        <div class="contracted-state-panel" @click="zoom">
          <i class="el-icon-s-fold" v-if="isCollapse === false" />
          <i class="el-icon-s-unfold" v-else />
        </div>
        <div class="greetings-panel">
          <p>你好! 用户名</p>
        </div>
        <div class="headPortrait-panel">
          <div class="img-panel">
            <img
              src="https://oscimg.oschina.net/oscnet/up-01124e45c80b44b517b193304da773df.jpg!/both/50x50?t=1569379619000"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div class="content-panel">
      <div class="main-panel">
        <div
          class="side-panel"
          :style="{ width: isCollapse === false ? '10%' : 'auto' }"
        >
          <el-menu
            default-active="1-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location" />
                <span slot="title">导航一</span>
              </template>
              <el-menu-item-group>
                <span slot="title">分组一</span>
                <el-menu-item index="1-1" @click="showContent('选项一')">
                  选项1
                </el-menu-item>
                <el-menu-item index="1-2" @click="showContent('选项二')">
                  选项2
                </el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3" @click="showContent('选项三')">
                  选项3
                </el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1" @click="showContent('选项一')">
                  选项1
                </el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2" @click="showContent('导航二')">
              <i class="el-icon-menu" />
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" @click="showContent('导航三')">
              <i class="el-icon-setting" />
              <span slot="title">导航三</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="main-content">
          <router-view name="contentBody" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      current: 0,
      currentMore: 0,
      tabPosition: "left",
      // 控制侧栏缩放状态
      isCollapse: false
    };
  },
  mounted() {
    if (this.$route.params.menuName !== "选项1") {
      this.showContent("选项1");
    }
  },
  methods: {
    showContent(val, index) {
      this.currentMore = index;
      // 路由切换
      if (val !== this.$route.params.menuName) {
        this.$router.push({ name: "contentBody", params: { menuName: val } });
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    zoom() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/index.scss";
</style>
