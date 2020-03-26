/*商品分类接口管理*/
import services from "../plugins/axios";
import base from "./base"; // 导入接口域名列表

const commodityClassifyMangeAPI = {
  // 获取商品分类列表
  getCommodityClassifyList(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/common/classify/search`,
      {
        params
      }
    );
  },
  // 增加商品分类
  addCommodityClassifyInfo(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/common/classify/add`,
      params
    );
  },
  // 变动商品分类
  changeCommodityClassifyInfo(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/common/classify/update`,
      params
    );
  },
  // 商品分类详情
  getCommodityClassifyInfo(params) {
    return services._axios.get(`${base.defaultBaseUrl}/common/classify/info`, {
      params
    });
  }
};

export default commodityClassifyMangeAPI;
