/*系统管理接口表*/
import services from "../plugins/axios";
import base from "./base"; // 导入接口域名列表

const systemManageAPI = {
  getMenuList(params) {
    return services._axios.get(`${base.defaultBaseUrl}/sys/home/menu`, {
      params: params
    });
  }
};

export default systemManageAPI;
