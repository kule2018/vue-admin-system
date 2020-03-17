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
  },
  // 变动订单
  updateOrderInfo(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/material/update`,
      params
    );
  },
  // 商品数据状态
  getMaterialStatus(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/common/materialStatus/list`,
      { params }
    );
  },
  // 商品单位
  getMaterialUnit(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/common/materialUnit/list`,
      { params }
    );
  },
  // 商品品牌
  getMaterialBrand(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/common/materialBrand/list`,
      { params }
    );
  },
  // 商品大分类
  getClassify(params) {
    return services._axios.get(`${base.defaultBaseUrl}/common/classify/list`, {
      params
    });
  },
  // 商品小分类
  getMaterialCategory(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/common/materialCategory/list`,
      { params }
    );
  }
};

export default orderManageAPI;
