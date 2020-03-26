/*商品类别接口管理*/
import services from "../plugins/axios";
import base from "./base"; // 导入接口域名列表

const commodityCategoryMangeAPI = {
  // 获取商品类别列表
  getCommodityCategoryList(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/common/materialCategory/search`,
      {
        params
      }
    );
  },
  // 增加商品类别
  addCommodityCategory(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/common/materialCategory/add`,
      params
    );
  },
  // 变动商品类别
  changeCommodityCategory(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/common/materialCategory/update`,
      params
    );
  },
  // 商品类别详情
  getCommodityCategoryInfo(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/common/materialCategory/info`,
      {
        params
      }
    );
  }
};

export default commodityCategoryMangeAPI;
