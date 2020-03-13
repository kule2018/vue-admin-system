/*系统用户接口*/
import services from "../plugins/axios";
import base from "./base"; // 导入接口域名列表

const sysUserInfoAPI = {
  // 获取角色列表 {name:"",roleTypeId:""}
  getRoleList(params) {
    return services._axios.get(`${base.defaultBaseUrl}/common/role/list`, {
      params
    });
  },
  // 获取用户列表 {name:""}
  getUserInfoList(params) {
    return services._axios.get(`${base.defaultBaseUrl}/sys/user/search`, {
      params
    });
  },
  // 获取用户详情 {userid:""}
  getUserInfo(params) {
    return services._axios.get(`${base.defaultBaseUrl}/sys/user/info`, {
      params
    });
  },
  // 更新用户信息 {userid:"",roleTypeid:"",nickName:"",loginName:"",loginPwd:"",iconPath:""}
  updateUserInfo(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/user/update`,
      params
    );
  },
  // 新增用户 {roleTypeid:"",nickName:"",loginName:"",loginPwd:"",iconPath:""}
  addUserInfo(params) {
    return services._axios.post(`${base.defaultBaseUrl}/sys/user/add`, params);
  },
  // 查询冻结用户 {name:"",nickName:""}
  queryFreezeUserInfo(params) {
    return services._axios.get(`${base.defaultBaseUrl}/sys/user/freezeSearch`, {
      params
    });
  },
  // 查询拉黑用户  {name:"",nickName:""}
  queryDefriendUserInfo(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/sys/user/defriendSearch`,
      { params }
    );
  },
  // 解除冻结 {personId：“”}
  relieveFreezeUserInfo(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/user/unfreeze`,
      params
    );
  },
  // 解除拉黑 {personId：“”}
  relieveDefriendUserInfo(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/user/relieve`,
      params
    );
  }
};

export default sysUserInfoAPI;
