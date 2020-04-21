<template>
  <div style="height: 100%">
    <router-view />
  </div>
</template>

<script>
import lodash from "lodash";
import base from "@/api/base";

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
      baseAddress: base.defaultBaseUrl,
      baseWsAddress: base.defaultWsUrl,
      layim: "",
      layer: "",
      info: {
        data: {},
        param: {
          userid: this.$store.state.userInfo.userid
        }
      }
    };
  },
  mounted() {
    if (
      this.$store.state.userInfo &&
      +this.$store.state.userInfo.roleTypeId === 300 &&
      this.$route.path !== "/login"
    ) {
      this.$api.imManageAPI
        .getCustomerServiceInfo(this.info.param)
        .then(res => {
          if (lodash.isEqual(res.code, "success")) {
            this.info.data = res.data;
            this.info.data.data.mine.avatar =
              this.baseAddress + this.info.data.data.mine.avatar;
            for (let i = 0; i < this.info.data.data.friend.length; i++) {
              for (
                let j = 0;
                j < this.info.data.data.friend[i].list.length;
                j++
              ) {
                this.info.data.data.friend[i].list[j].avatar =
                  this.baseAddress +
                  this.info.data.data.friend[i].list[j].avatar;
              }
            }
            this.createLayim();
          }
        });
    }
  },
  methods: {
    createLayim() {
      const self = this;
      layui.use(["layim"], function() {
        self.layim = layui.layim;

        //基础配置
        self.layim.config({
          title: self.info.data.data.mine.username,
          initSkin: "2.jpg", //1-5 设置初始背景
          // 初始化个人信息、好友、分组
          init: self.info.data.data,
          // 是否开启群组
          isgroup: false,
          notice: true, //是否开启桌面消息提醒，默认false
          chatLog: "/layim/demo/chatlog.html" //聊天记录页面地址，若不开启，剔除该项即可
        });

        // 打开一个 web socket
        if ("WebSocket" in window) {
          let websocket = new WebSocket(
            self.baseWsAddress +
              "/chatHandler?id=" +
              self.info.data.data.mine.id
          );
          self.$store.commit("wsData", websocket);
        }
        //					else if('MozWebSocket' in window) {
        //						self.websocket = new MozWebSocket(self.baseWsAddress + "/Bank/webSocketServer");
        //					} else {
        //						self.websocket = new SockJS(self.baseAddress + "/sockjs/webSocketServer");
        //					}

        self.$store.state.websocket.onopen = function() {
          // Web Socket 已连接上，使用 send() 方法发送数据
          // self.websocket.send("发送数据");
          // alert("数据发送中...");
        };

        // self.websocket.onerror = function(evnt) {
        // 	console.log('错误', evnt)
        // };
        //
        self.$store.state.websocket.onclose = function(ev) {
          console.log("关闭 WebSocket 连接", ev);
          self.$store.commit("wsData", null);
        };

        // 监听发送消息
        self.layim.on("sendMessage", function(data) {
          // 接收消息人员信息
          var mine = data.mine; // 发送人的信息，
          var to = data.to; // 接收人的信息

          var paramMap = {
            username: mine.username,
            content: mine.content,
            avatar: mine.avatar,
            emit: "chatMessage",
            sendPersonId: mine.id, // 发送人
            receivePersonId: to.id, // 接收人
            temporary: to.temporary // true：临时的
          };

          // 保存消息
          self.$api.imManageAPI.sendMessage(paramMap);
          // .then(res => {
          //    if(lodash.isEqual(res.code, "success")) {
          //    	console.log('发送成功');
          //    }
          // });
        });

        // 接收消息
        self.$store.state.websocket.onmessage = function(res) {
          var data = res.data;
          data = JSON.parse(data);

          if (data.emit === "chatMessage") {
          	
          	let avatar;
          	if (data.sendPersonId) {
          		avatar = data.avatar
          	}
          	else {
          		avatar = data.avatar.indexOf(self.baseAddress) == -1 ? self.baseAddress + data.avatar : data.avatar 
          	}
          	
            // res.data 即你发送消息传递的数据（阅读：监听发送的消息）
            self.layim.getMessage({
              // 消息来源用户名
              username: data.username,
              // 消息来源用户头像
              avatar: avatar,
              // 消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
              id: data.sendPersonId,
              // 聊天窗口来源类型，从发送消息传递的to里面获取
              type: "friend",
              // 消息内容
              content: data.content,
              // 消息id，可不传。除非你要对消息进行一些操作（如撤回）
              cid: 0,
              // 是否我发送的消息，如果为 true，则会显示在右方
              mine: false,
              // 消息的发送者 id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
              fromid: data.sendPersonId,
              // 服务端时间戳毫秒数。注意：如果你返回的是标准的 unix 时间戳，记得要 *1000
              timestamp: data.timestamp != null ? new Date(data.timestamp) : new Date()
            });
          }
        };
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/content-body.scss";
</style>
