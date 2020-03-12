/*微信用户接口*/
import services from "../plugins/axios";
import base from "./base"; // 导入接口域名列表

const weChatUserInfoAPI = {
  // 获取用户列表 {name:"",nickName:""}
  getUserInfoList(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/sys/person/search`,
      params
    );
  },
  // 获取用户详情 {personId:""}
  getUserInfo(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/sys/person/info`,
      params
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
  }
};

export default weChatUserInfoAPI;
