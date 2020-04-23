/* 订单管理接口 */
import services from "../plugins/axios";
import base from "./base"; // 导入接口域名列表

const orderManageAPI = {
  // 获取未分配订单列表
  getOrderList(params) {
    return services._axios.get(`${base.defaultBaseUrl}/sys/order/search`, {
      params
    });
  },
  // 获取已分配订单列表
  getAllotOrderList(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/sys/order/searchAllocated`,
      {
        params
      }
    );
  },
  // 获取订单详情
  getOrderDetail(params) {
    return services._axios.get(`${base.defaultBaseUrl}/sys/order/info`, {
      params
    });
  },
  // 获取订单状态
  getOrderState(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/common/orderState/list`,
      {
        params
      }
    );
  },
  // 分配供应商
  allotSupplierToOrder(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/order/allocationSupplier`,
      params
    );
  },
  // 接收
  agreeReceiveOrder(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/order/agreeReceive`,
      params
    );
  },
  // 退回
  rejectReceiveOrder(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/order/rejectReceive`,
      params
    );
  },
  // 发货
  deliveryOrder(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/order/delivery`,
      params
    );
  },
  // 收回
  withdraw(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/order/withdraw`,
      params
    );
  }
};

export default orderManageAPI;
