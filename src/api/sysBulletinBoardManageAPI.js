/*系统公告接口*/
import services from "../plugins/axios";
import base from "./base"; // 导入接口域名列表

const sysBulletinManageAPI = {
  // 获取公告列表
  getSysBulletinList(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/sys/bulletinBoard/search`,
      {
        params
      }
    );
  },
  // 获取公告详情
  getSysBulletinInfo(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/sys/bulletinBoard/info`,
      { params }
    );
  },
  // 新增公告
  addSysBulletin(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/bulletinBoard/add`,
      params
    );
  },
  // 变动公告
  updateSysBulletin(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/sys/bulletinBoard/update`,
      params
    );
  }
};

export default sysBulletinManageAPI;
