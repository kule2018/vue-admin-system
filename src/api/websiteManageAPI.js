/*网站管理接口*/

import services from "../plugins/axios";
import base from "./base"; // 导入接口域名列表

const websiteManageAPI = {
  // 登录
  login(params) {
    return services._axios.post(`${base.defaultBaseUrl}/sys/login`, params);
  },
  testLogin() {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/login?name=hdtest&pwd=123456`,
      {}
    );
  },
  // 注册
  registered(params) {
    return services._axios.post(``, params);
  }
};

export default websiteManageAPI;
