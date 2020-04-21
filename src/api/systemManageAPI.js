/*系统管理接口表*/
import services from "../plugins/axios";
import base from "./base"; // 导入接口域名列表

const systemManageAPI = {
  // 侧边导航栏
  getMenuList(params) {
    return services._axios.get(`${base.defaultBaseUrl}/sys/home/menu`, params);
  },
  // 待处理订单数量
  getStayProcessed(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/sys/home/stayProcessed`,
      params
    );
  },
  // 今日发货数量
  getTodayDelivery(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/sys/home/todayDelivery`,
      params
    );
  },
  // 待收货数量
  getStayReceivedCargo(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/sys/home/stayReceivedCargo`,
      params
    );
  },
  // 待处理订单图表
  getStayProcessedChart(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/sys/home/stayProcessedChart`,
      params
    );
  },
  // 待收货订单图表
  getStayReceivedCargoChart(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/sys/home/stayReceivedCargoChart`,
      params
    );
  }
};

export default systemManageAPI;
