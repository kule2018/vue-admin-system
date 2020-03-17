/* 订单管理接口 */
import services from "../plugins/axios";
import base from "./base"; // 导入接口域名列表

const orderManageAPI = {
  // 获取订单列表
  getOrderList(params) {
    return services._axios.get(`${base.defaultBaseUrl}/sys/material/search`, {
      params
    });
  },
  // 获取订单详情
  getOrderInfo(params) {
    return services._axios.get(`${base.defaultBaseUrl}/sys/material/info`, {
      params
    });
  },
  // 新增订单
  addOrderInfo(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/material/add`,
      params
    );
  }
};

export default orderManageAPI;
