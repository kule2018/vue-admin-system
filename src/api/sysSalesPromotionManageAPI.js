/*系统公告接口*/
import services from "../plugins/axios";
import base from "./base"; // 导入接口域名列表

const sysSalesManageAPI = {
  // 获取公告列表
  getSysSalesList(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/sys/salesPromotion/search`,
      {
        params
      }
    );
  },
  // 获取公告详情
  getSysSalesInfo(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/sys/salesPromotion/info`,
      { params }
    );
  },
  // 新增公告
  addSysSales(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/salesPromotion/add`,
      params
    );
  },
  // 变动公告
  updateSysSales(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/salesPromotion/update`,
      params
    );
  }
};

export default sysSalesManageAPI;
