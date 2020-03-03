<template>
  <div id="contentPanel">
    <div class="header-panel">
      <div class="main-panel">
        <div class="logo-panel">
          <div class="logo-content">
            <p>logo</p>
          </div>
        </div>
        <div class="content-panel">
          <div class="search-panel">
            <el-input v-model="searchText" placeholder="请输入内容" />
          </div>
          <div class="menu-panel">
            <el-menu
              :default-active="activeIndex"
              mode="horizontal"
              @select="handleSelect"
            >
              <el-menu-item index="1" @click="showContent('菜单1')">
                菜单1
              </el-menu-item>
              <el-menu-item index="2" @click="showContent('菜单2')">
                菜单2
              </el-menu-item>
              <el-menu-item index="3" @click="showContent('菜单3')">
                菜单3
              </el-menu-item>
              <el-menu-item index="4" @click="showContent('菜单4')">
                菜单4
              </el-menu-item>
              <el-menu-item index="5" @click="showContent('菜单5')">
                菜单5
              </el-menu-item>
            </el-menu>
          </div>
        </div>
      </div>
    </div>
    <div class="content-panel">
      <div class="main-panel">
        <router-view name="contentBody" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      searchText: ""
    };
  },
  mounted() {
    this.showContent("菜单1");
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    showContent(val) {
      // 路由切换
      this.$router.push({ name: "contentBody", params: { menuName: val } });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/index.scss";
</style>
