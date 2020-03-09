<template>
  <div id="contentPanel" @click="showFuncMenu = false">
    <div class="header-panel">
      <div class="main-panel">
        <div class="logo-panel">
          <img
            src="https://static.oschina.net/new-osc/img/logo_new.svg"
            alt=""
          />
        </div>
        <div class="contracted-state-panel" @click="zoom">
          <icon class="el-icon-s-fold" v-if="isCollapse === false" />
          <icon class="el-icon-s-unfold" v-else />
        </div>
        <div
          class="headPortrait-panel"
          @click.stop="showFuncMenu = !showFuncMenu"
        >
          <div class="img-panel">
            <img
              src="https://oscimg.oschina.net/oscnet/up-01124e45c80b44b517b193304da773df.jpg!/both/50x50?t=1569379619000"
              alt=""
            />
          </div>
          <div class="greetings-panel">
            <p>{{ user }}</p>
            <icon class="el-icon-caret-bottom" />
          </div>
          <transition name="func-menu">
            <dl class="func-menu" v-if="showFuncMenu">
              <dd><icon class="el-icon-s-custom" /><span>个性设置</span></dd>
              <!--<dd><icon class="el-icon-s-open" /><span>主题修改</span></dd>-->
              <dd><icon class="el-icon-lock" /><span>密码修改</span></dd>
              <dd @click="testAdd()">
                <icon class="el-icon-plus" /><span>录入页面测试</span>
              </dd>
              <dd @click="testNotify()">
                <icon class="el-icon-warning-outline" />
                <span>测试通知气泡</span>
              </dd>
              <dd @click="testResult()">
                <icon class="el-icon-bangzhu" /><span>操作结果测试</span>
              </dd>
              <dd @click="logout">
                <icon class="el-icon-switch-button" /><span>退出登录</span>
              </dd>
            </dl>
          </transition>
        </div>
      </div>
    </div>
    <div class="content-panel">
      <div class="main-panel">
        <div class="side-panel">
          <el-menu
            class="el-menu-vertical"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            default-active="1-1"
          >
            <el-submenu
              v-for="item in menu.subMenu"
              :key="item.index"
              index="1"
            >
              <template slot="title">
                <icon :class="`el-icon-${item.icon}`" />
                <span slot="title">{{ item.name }}</span>
              </template>
              <el-menu-item-group
                v-for="group in item.group"
                :key="group.title"
                :title="group.title"
              >
                <el-menu-item
                  v-for="groupItem in group.item"
                  :key="groupItem.index"
                  :index="groupItem.index"
                  @click="showContent(groupItem.link)"
                  >{{ groupItem.name }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item
              v-for="item in menu.subItem"
              :key="item.index"
              :index="item.index"
              @click="showContent(item.link)"
            >
              <icon :class="`el-icon-${item.icon}`" />
              <span slot="title">{{ item.name }}</span>
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
import { Icon } from "element-ui";
import menu from "@/config/menu.json";
import addDataPage from "@/views/add-data-page";
export default {
  name: "index",
  components: {
    Icon
  },
  data() {
    return {
      current: 0,
      tabPosition: "left",
      showFuncMenu: false, // 头像功能菜单显示状态
      isCollapse: false, // 控制侧栏缩放状态
      menu: menu,
      user: "开发者"
    };
  },
  mounted() {},
  methods: {
    showContent(val) {
      // 路由切换
      this.$router.push({ name: val });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    zoom() {
      this.isCollapse = !this.isCollapse;
    },
    logout() {
      this.$router.push("/login");
    },
    testAdd() {
      this.$vb.plugin.openAddLayer(
        addDataPage,
        this,
        { name: "传值测试" },
        900,
        600,
        "录入"
      );
    },
    testNotify() {
      this.$vb.plugin.message.success("测试", "测试内容");
    },
    testResult() {
      this.$store.commit("changeResultState", "error");
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/index.scss";
</style>
