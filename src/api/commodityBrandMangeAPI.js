/*商品品牌接口管理*/
import services from "../plugins/axios";
import base from "./base"; // 导入接口域名列表

const commodityBrandMangeAPI = {
  // 获取商品品牌列表
  getCommodityBrandList(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/common/materialBrand/search`,
      {
        params
      }
    );
  },
  // 新增商品品牌
  addCommodityBrand(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/common/materialBrand/add`,
      params
    );
  },
  // 变动商品品牌
  changeCommodityBrand(params) {
    return services._axios.post(
      `${base.defaultBaseUrl}/common/materialBrand/update`,
      params
    );
  },
  // 商品品牌详情
  getCommodityBrandInfo(params) {
    return services._axios.get(
      `${base.defaultBaseUrl}/common/materialBrand/info`,
      {
        params
      }
    );
  }
};
export default commodityBrandMangeAPI;
