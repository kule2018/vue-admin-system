import Vue from "vue";
import VueRouter from "vue-router";
import IndexPage from "@/views/index";
import LoginPage from "@/views/login";
import ContentBody from "@/components/content-body";
import FirstScreen from "@/views/first-screen";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    name: "index",
    path: "/index",
    components: {
      index: IndexPage
    },
    props: {
      index: true
    },
    children: [
      {
        name: "contentBody",
        path: "contentBody",
        components: {
          contentBody: ContentBody
        },
        props: {
          contentBody: true
        },
        children: [
          {
            name: "firstScreen",
            path: "firstScreen",
            components: {
              firstScreen: FirstScreen
            }
          }
        ]
      }
    ]
  },
  {
    name: "login",
    path: "/login",
    components: {
      login: LoginPage
    }
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
