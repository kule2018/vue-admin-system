/*即时通讯管理接口表*/
import services from "../plugins/axios";
import base from "./base"; // 导入接口域名列表

const imManageAPI = {
  getCustomerServiceInfo(params) {
    return services._axios.get(`${base.defaultBaseUrl}/im/user/info`, {
      params
    });
  },
  sendMessage(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/im/user/sendMessage`,
      params
    );
  }
};

export default imManageAPI;
