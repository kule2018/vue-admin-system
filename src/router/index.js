import Vue from "vue";
import VueRouter from "vue-router";
import IndexPage from "@/views/index";
import LoginPage from "@/views/login";
import ContentBody from "@/components/content-body";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index"
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
        path: "contentBody/:menuName",
        components: {
          contentBody: ContentBody
        },
        props: {
          contentBody: true
        }
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
