"use strict";

import Vue from "vue";
import axios from "axios";
import baseAddress from "@/api/base";

let config = {
  // baseURL在此处省略配置,考虑到项目可能由多人协作完成开发，域名也各不相同，此处通过对api的抽离，域名单独配置在base.js中

  // 请求超时时间
  timeout: 60 * 1000,
  heards: {
    get: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      // 将普适性的请求头作为基础配置。当需要特殊请求头时，将特殊请求头作为参数传入，覆盖基础配置
    },
    post: {
      "Content-Type": "application/json;charset=utf-8"
      // 将普适性的请求头作为基础配置。当需要特殊请求头时，将特殊请求头作为参数传入，覆盖基础配置
    }
  }
};

/**
 * 请求失败后的错误统一处理，当然还有更多状态码判断，根据自己业务需求去扩展即可
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      // 跳转登录页
      break;
    // 403 token过期
    case 403:
      // 如果不需要自动刷新token，可以在这里移除本地存储中的token，跳转登录页

      break;
    // 404请求不存在
    case 404:
      // 提示资源不存在
      break;
    default:
      console.log(other);
  }
};

// 创建实例
const _axios = axios.create(config);
// 默认请求的URL
_axios.defaults.baseURL = baseAddress.defaultBaseUrl;
// 请求拦截器
_axios.interceptors.request.use(
  function(config) {
    // 判断token是否存在，请求头添加token
    return config;
  },
  function(error) {
    // 服务器异常处理
    error.data = {};
    error.data.msg = "服务器异常";
    return Promise.reject(error);
  }
);

// 响应拦截器
_axios.interceptors.response.use(
  function(response) {
    // 判断token是否过期，如果过期则获取新的token
    // 返回token中的data数据
    return response.data;
  },
  function(error) {
    if (error) {
      // 请求已发出，但不在2xx范围内
      errorHandle(error.status, error.data);
      return Promise.reject(error);
    } else {
      // 断网
      return Promise.reject(error);
    }
  }
);

// eslint-disable-next-line no-unused-vars
Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);
// 导出插件和_axios
export default { Plugin, _axios };
