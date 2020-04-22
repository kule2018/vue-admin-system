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
    return services._axios.get(
      `${base.defaultBaseUrl}/sys/supplier/defriendSearch`,
      {
        params
      }
    );
  },
  // 查询冻结供应商
  queryFreezeSuppliers(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/sys/supplier/freezeSearch`,
      {
        params
      }
    );
  },
  // 获取供应商信息 {supplierId:""}
  getSupplierInfo(params) {
    return services._axios.get(`${base.defaultBaseUrl}/sys/supplier/info`, {
      params
    });
  },
  // 获取证件类型
  getCertificateType(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/common/certificateType/list`,
      {
        params
      }
    );
  },
  // 更新供应商信息 {}
  updateSupplierInfo(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/supplier/update`,
      params
    );
  },
  // 增加供应商
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
  },
  // 分配供应商查询
  allotSupplier(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/common/supplier/search`,
      { params }
    );
  },
  // 审核供应商:同意
  auditAgreeSupplier(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/supplier/auditAgree`,
      params
    );
  },
  // 审核供应商:退回
  auditRejectSupplier(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/supplier/auditReject`,
      params
    );
  }
};

export default supplierManageAPI;
