import services from "../plugins/axios";
import base from "./base"; // 导入接口域名列表

const userInfoAPI = {
  // 获取用户列表
  getUserList(params) {
    return services._axios.get(`${base.mock}/getUserList`, params);
  }
};

export default userInfoAPI;
