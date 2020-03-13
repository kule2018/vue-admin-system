/*供应商管理接口*/
import services from "../plugins/axios";
import base from "./base"; // 导入接口域名列表

const supplierManageAPI = {
  // 获取供应商列表 {name:"",businessLicenseNumber:""}
  getSupplierList(params) {
    return services._axios.get(`${base.defaultBaseUrl}/sys/supplier/search`, {
      params
    });
  },
  // 查询拉黑供应商
  queryPullBlackSuppliers(params) {
    return services._axios.get(`${base.defaultBaseUrl}/sys/supplier/search`, {
      params
    });
  },
  // 查询冻结供应商
  queryFreezeSuppliers(params) {
    return services._axios.get(`${base.defaultBaseUrl}/sys/supplier/search`, {
      params
    });
  },
  // 获取供应商信息 {supplierId:""}
  getSupplierInfo(params) {
    return services._axios.get(`${base.defaultBaseUrl}/sys/supplier/info`, {
      params
    });
  },
  // 更新供应商信息 {}
  updateSupplierInfo(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/supplier/update`,
      params
    );
  },
  // 新增供应商
  addSupplierInfo(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/supplier/add`,
      params
    );
  },
  // 冻结供应商 {supplierId:""}
  freezeSupplierInfo(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/supplier/freeze`,
      params
    );
  },
  // 解冻供应商 {supplierId:""}
  relieveFreezeSupplierInfo(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/supplier/unfreeze`,
      params
    );
  },
  // 拉黑供应商 {supplierId:""}
  defriendSupplierInfo(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/supplier/defriend`,
      params
    );
  },
  // 解除拉黑供应商 {supplierId:""}
  relieveRelieveSupplierInfo(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/supplier/relieve`,
      params
    );
  }
};

export default supplierManageAPI;
