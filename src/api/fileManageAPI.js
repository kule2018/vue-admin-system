/*文件管理接口*/
import services from "../plugins/axios";
import base from "./base"; // 导入接口域名列表

const fileManageAPI = {
  // 单文件上传
  singleFileUpload(file) {
    return services._axios.post(`${base.defaultBaseUrl}/common/upload`, file, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  }
};

export default fileManageAPI;
