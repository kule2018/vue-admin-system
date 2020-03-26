/*微信用户接口*/
import services from "../plugins/axios";
import base from "./base"; // 导入接口域名列表

const weChatUserInfoAPI = {
  // 获取用户列表 {name:"",nickName:""}
  getUserInfoList(params) {
    return services._axios.get(`${base.defaultBaseUrl}/sys/person/search`, {
      params
    });
  },
  // 获取用户详情 {personId:""}
  getUserInfo(params) {
    return services._axios.get(`${base.defaultBaseUrl}/sys/person/info`, {
      params
    });
  },
  // 获取用户冻结列表 {name:"",nickName:""}
  getUserFreezeList(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/sys/person/freezeSearch`,
      {
        params
      }
    );
  },
  // 获取用户黑名单列表 {name:"",nickName:""}
  getUserBlockList(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/sys/person/defriendSearch`,
      {
        params
      }
    );
  },
  // 冻结用户 {personId:""}
  freezeUserInfo(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/person/freeze`,
      params
    );
  },
  // 拉黑用户 {personId:""}
  defriendUserInfo(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/person/defriend`,
      params
    );
  },
  // 解冻用户 {personId:""}
  unfreezeUser(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/person/unfreeze`,
      params
    );
  },
  // 移除黑名单 {personId:""}
  unblockUser(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/person/relieve`,
      params
    );
  },
  // 清空用户余额 {personId:""}
  clearBalance(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/person/clearBalance`,
      params
    );
  },
  // 清空用户积分 {personId:""}
  clearIntegral(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/person/clearIntegral`,
      params
    );
  }
};

export default weChatUserInfoAPI;
