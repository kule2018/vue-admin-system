# vue-admin-system

## 项目概述
* 基于Vue Cli4.0搭建
* 使用ElementUI作为UI框架
* 使用Vuex进行数据管理
* 使用vue-router进行路由管理
* 使用scss作为css扩展语言
* 使用lodash库进行非空校验等验证

## 项目运行
* 使用**yarn run service**命令运行
* 使用**yarn run build**命令打包
* 在vue.config.js中修改端口号，默认端口为8020

## 项目目录
* **dist** 编译后的项目文件，可直接部署在服务器
* **node_modules** node环境相关的依赖包
* **public** 公用文件夹，用于存放当前项目需要引用的公用文件
    * index.html 模版文件，用于引入一些cdn文件，以及网站的一些基础配置。
    * static 静态资源文件夹，配置css分离和js分离后，vue项目引用的图片以及混淆后的css和js将自动打包近这个文件夹中
    * favicon.ico 网站ico图标
* **src** 源代码文件夹，Vue所有代码都在此文件夹中
    * api 当前项目用到的所有接口，都在此处定义。
        * 当前项目针对axios进行了封装
    * base.js 接口域名管理，应对后端多个开发者的场景。
    * index.js api统一出口，将api接口根据功能划分为多个模块，在此处进行导出
    * websiteManageAPI.js 每一个功能模块需要用的接口，文件命名格式为：${module}API
* **assets** 静态资源文件夹
    * img 存放图片
    * json 存放项目中需要用到的json配置文件
    * scss 存放css预处理文件
        * main-content.scss 主内容页面样式文件
        * login.scss 登录页面样式文件
        * index.scss 项目主页样式文件
    * logo.png 当前项目logo
* **components** 公用组件文件夹
    * main-content.vue 用于登录页面和后台主页面的跳转
* **plugins** 插件配置文件夹，用于存储当前项目所使用插件的自定义配置
    * axios.js axios库的相关封装
    * element.js,elementUI插件配置文件
* **router** 路由的配置文件夹
    * index.js 配置当前项目用到的所有路由
* **store** vuex的配置文件夹
    * index.js vuex的相关配置
* **views** 普通组件文件夹
    * login.vue 登录组件
    * index.vue 项目主页组件
* **App.vue** Vue主文件，该文件的代码最终会被编译到**public/index.html**下
* main.js Vue入口文件，渲染的时候会被webpack引入变成app.js文件 app.js文件在index.html中会被引入
* element-variables.scss，elementUI样式配置文件
* vue.config.js，Vue环境配置文件