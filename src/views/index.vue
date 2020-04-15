<template>
  <div id="contentPanel" @click="showFuncMenu = false">
    <div class="header-panel">
      <div class="main-panel">
        <div class="logo-panel">
          <img src="@/assets/img/logo.png" alt="" />
        </div>
        <div class="contracted-state-panel" ref="zoom" @click="zoom">
          <icon class="el-icon-s-fold" v-if="isCollapse === false" />
          <icon class="el-icon-s-unfold" v-else />
        </div>
        <div
          class="headPortrait-panel"
          @click.stop="showFuncMenu = !showFuncMenu"
        >
          <div class="img-panel">
            <!--src="https://oscimg.oschina.net/oscnet/up-01124e45c80b44b517b193304da773df.jpg!/both/50x50?t=1569379619000"-->
            <el-avatar
              :src="baseAddress + $store.state.userInfo.iconPath"
              alt=""
            />
          </div>
          <div class="greetings-panel">
            <p>{{ $store.state.userInfo.nickName }}</p>
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
              <dd @click="testDataTable()">
                <icon class="el-icon-s-help" /><span>数据表格测试</span>
              </dd>
              <dd @click="testDetail()">
                <icon class="el-icon-view" /><span>测试详情页</span>
              </dd>
              <dd @click="testDetailOne()">
                <icon class="el-icon-view" /><span>测试详情页(单列)</span>
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
            :collapse="isCollapse"
            default-active="0"
            :unique-opened="true"
          >
            <el-menu-item index="0" @click="showContent('firstScreen')">
              <icon class="el-icon-s-platform" />
              <span slot="title">工作台</span>
            </el-menu-item>
            <el-submenu
              v-for="item in menu.subMenu"
              :key="item.menuid"
              :index="`${item.menuid}`"
            >
              <template slot="title">
                <icon :class="item.icon" />
                <span slot="title">{{ item.name }}</span>
              </template>
              <el-menu-item
                v-for="subItem in item.group"
                :key="subItem.menuid"
                :index="`${subItem.menuid}`"
                @click="showContent(subItem.link)"
                >{{ subItem.name }}</el-menu-item
              >
            </el-submenu>
            <el-menu-item
              v-for="item in menu.subItem"
              :key="item.menuid"
              :index="`${item.menuid}`"
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
import menu from "@/config/menu";
import addDataPage from "@/views/demo/add-data-page";
import tablePage from "@/views/demo/table-page";
import base from "@/api/base";
import lodash from "lodash";
import detailPage from "@/views/demo/detail-page";
import detailPageOne from "@/views/demo/detail-page-one";

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
      baseAddress: base.defaultBaseUrl
    };
  },
  mounted() {
    // 获取菜单列表
    this.$api.systemManageAPI.getMenuList({}).then(res => {
      if (lodash.isEqual(res.code, "success")) {
        this.menu = res.data;
      }
    });
  },
  methods: {
    showContent(val) {
      // 路由切换
      this.$router.push({ name: val });
    },
    zoom() {
      this.isCollapse = !this.isCollapse;
    },
    logout() {
      localStorage.removeItem("userInfo");
      this.$store.state.userInfo = {};
      this.$router.push("/login");
    },
    testAdd() {
      this.$vb.plugin.openLayer(
        addDataPage,
        this,
        { name: "传值测试" },
        "录入",
        900,
        600
      );
    },
    testNotify() {
      this.$vb.plugin.message.success("测试", "测试内容");
    },
    testResult() {
      this.$store.commit("changeResultState", "error");
    },
    testDataTable() {
      this.$vb.plugin.openLayer(
        tablePage,
        this,
        { name: "传值测试" },
        "数据表格测试",
        900,
        600
      );
    },
    testDetail() {
      this.$vb.plugin.openLayer(
        detailPage,
        this,
        { name: "传值测试", colNum: "two-col" },
        "详情页面测试",
        650,
        520
      );
    },
    testDetailOne() {
      this.$vb.plugin.openLayer(
        detailPageOne,
        this,
        { name: "传值测试", colNum: "one-col" },
        "详情页面测试",
        580,
        820,
        function() {
          // 窗口关闭后执行
        }
      );
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/index.scss";
</style>
