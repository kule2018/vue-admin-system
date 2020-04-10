<template>
  <div style="height: 100%">
    <router-view />
    <!--<div class="service_ol" @click="openChat">
      <svg
        t="1586484025201"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4786"
        width="28"
        height="28"
      >
        <path
          d="M884.165 451.494c-2.494-203.504-168.046-367.753-372.161-367.753s-369.666 164.249-372.165 367.753c-34.163 27.314-56.096 69.25-56.096 116.37 0 82.254 66.697 148.969 148.96 148.969 35.899 0 68.818-12.726 94.534-33.857l-70.18-261.923c-7.949-1.294-16.045-2.155-24.353-2.155-5.474 0-10.855 0.339-16.183 0.926 17.954-147.35 143.268-261.601 295.488-261.601 152.199 0 277.532 114.25 295.481 261.601-5.306-0.583-10.705-0.926-16.18-0.926-8.305 0-16.421 0.863-24.375 2.155l-70.159 261.801c19.847 16.295 43.981 27.559 70.459 31.868-35.138 37.751-79.825 66.511-130.378 82.068l-6.164 6.156c-15.77-28.99-46.122-48.892-81.442-48.892-51.427 0-93.102 41.674-93.102 93.118 0 51.431 41.673 93.104 93.102 93.104 42.211 0 77.419-28.27 88.852-66.758 102.752-25.189 188.829-92.829 238.272-183.482 38.595-26.917 63.899-71.562 63.899-122.175-0.002-47.108-21.955-89.058-56.102-116.371z"
          p-id="4787"
        ></path>
      </svg>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "content-body",
  props: ["menuName"],
  created() {
    // 默认跳转首屏
    this.$router.push({
      name: "firstScreen"
    });
  },
  data() {
    return {
      layim: "",
      layer: ""
    };
  },
  watch: {
    $route: function() {
      if (this.$store.state.userInfo && this.$route.path !== "/login") {
        this.createLayim();
      }
    }
  },
  mounted() {
    const self = this;
    if (this.$store.state.userInfo && this.$route.path !== "/login") {
      this.createLayim();
    }
    setTimeout(() => {
      self.layim.getMessage({
        username: "纸飞机", //消息来源用户名
        avatar: "http://tp1.sinaimg.cn/1571889140/180/40030060651/1", //消息来源用户头像
        id: "100000", //消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
        type: "friend", //聊天窗口来源类型，从发送消息传递的to里面获取
        content: "嗨，你好！我是灰机。", //消息内容
        cid: 0, //消息id，可不传。除非你要对消息进行一些操作（如撤回）
        mine: false, //是否我发送的消息，如果为true，则会显示在右方
        fromid: "100000", //消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
        timestamp: new Date().getTime() //服务端时间戳毫秒数。注意：如果你返回的是标准的 unix 时间戳，记得要 *1000
      });
    }, 2000);
    setTimeout(() => {
      self.layim.getMessage({
        username: "曾小贤", //消息来源用户名
        avatar: "http://tp1.sinaimg.cn/1571889140/180/40030060651/1", //消息来源用户头像
        id: "100001", //消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
        type: "friend", //聊天窗口来源类型，从发送消息传递的to里面获取
        content: "嗨，你好！啊哈哈哈哈哈哈哈哈。", //消息内容
        cid: 0, //消息id，可不传。除非你要对消息进行一些操作（如撤回）
        mine: false, //是否我发送的消息，如果为true，则会显示在右方
        fromid: "100001", //消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
        timestamp: new Date().getTime() //服务端时间戳毫秒数。注意：如果你返回的是标准的 unix 时间戳，记得要 *1000
      });
    }, 5000);
  },
  methods: {
    createLayim() {
      const self = this;
      layui.use(["layim"], function() {
        self.layim = layui.layim;

        //基础配置
        self.layim.config({
          uploadImage: {
            url: "", //（返回的数据格式见下文）
            type: "" //默认post
          },
          uploadFile: {
            url: "", //（返回的数据格式见下文）
            type: "" //默认post
          },

          isAudio: true, //开启聊天工具栏音频
          isVideo: true, //开启聊天工具栏视频

          //扩展工具栏
          tool: [
            {
              alias: "code",
              title: "代码",
              icon: "&#xe64e;"
            }
          ],

          brief: true, //是否简约模式（若开启则不显示主面板）
          initSkin: "2.jpg", //1-5 设置初始背景
          notice: true, //是否开启桌面消息提醒，默认false
          chatLog: "/layim/demo/chatlog.html" //聊天记录页面地址，若不开启，剔除该项即可
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/content-body.scss";
</style>
