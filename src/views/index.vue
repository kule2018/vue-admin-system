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
        <div class="side-panel">
          <div class="menu-panel">
            <div
              class="row-panel"
              @click="switchMenu(index)"
              v-for="(item, index) in menus"
              v-bind:key="item.id"
              v-bind:class="{ active: index === current }"
            >
              <i class="el-icon-menu" />
              <p>
                {{ item.title }}
              </p>
            </div>
          </div>
          <div class="more-panel">
            <div
              class="row-panel"
              v-for="(item, index) in menuList"
              v-bind:key="item.id"
              v-bind:class="{ active: index === currentMore }"
              @click="showContent(item.title, index)"
            >
              <p>{{ item.title }}</p>
            </div>
          </div>
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
      menus: [
        {
          title: "菜单1",
          id: "1"
        },
        {
          title: "菜单2",
          id: "2"
        },
        {
          title: "菜单3",
          id: "3"
        }
      ],
      menuList: [
        {
          title: "选项1",
          id: "12901"
        },
        {
          title: "选项2",
          id: "12902"
        },
        {
          title: "选项3",
          id: "12903"
        }
      ]
    };
  },
  mounted() {
    if (this.$route.params.menuName === "导航1") {
      this.currentMore = 0;
      this.showContent("导航1");
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
    switchMenu(index) {
      this.current = index;
      console.log(index);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/index.scss";
</style>
