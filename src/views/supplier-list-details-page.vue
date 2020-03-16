<template>
  <div class="detail-box" :class="parentData.colNum">
    <div>
      <div>供应商id</div>
      <div>{{ detailsInfo.supplierId }}</div>
    </div>
    <div>
      <div>企业性质</div>
      <div>{{ detailsInfo.enterprisNature }}</div>
    </div>
    <div>
      <div>营业执照号</div>
      <div>{{ detailsInfo.businessLicenseNumber }}</div>
    </div>
    <div>
      <div>营业执照电子图</div>
      <div>
        <el-image
          style="width: 100px; height: 100px"
          :src="baseUrl + detailsInfo.businessLicenseElecChart"
        >
        </el-image>
      </div>
    </div>
    <div>
      <div>
        卫生许可证号
      </div>
      <div>
        {{ detailsInfo.sanitaryPermitNumber }}
      </div>
    </div>
    <div>
      <div>卫生许可证电子图</div>
      <div>
        <el-image
          style="width: 100px; height: 100px"
          :src="baseUrl + detailsInfo.sanitaryPermitElecChart"
        >
        </el-image>
      </div>
    </div>
    <div>
      <div>法人</div>
      <div>{{ detailsInfo.legalPerson }}</div>
    </div>
    <div>
      <div>证件类型</div>
      <div>{{ detailsInfo.certificateType }}</div>
    </div>
    <div>
      <div>证件类型名称</div>
      <div>{{ detailsInfo.certificateName }}</div>
    </div>
    <div>
      <div>证件号</div>
      <div>{{ detailsInfo.certificateNumber }}</div>
    </div>
    <div>
      <div>固定电话</div>
      <div>{{ detailsInfo.phone }}</div>
    </div>
    <div>
      <div>供应商状态名称</div>
      <div>{{ detailsInfo.supplierStatusName }}</div>
    </div>
  </div>
</template>

<script>
import lodash from "lodash";
import base from "@/api/base";
export default {
  name: "supplier-list-details-page",
  data() {
    return {
      detailsInfo: {},
      baseUrl: ""
    };
  },
  mounted() {
    this.$api.supplierManageAPI
      .getSupplierInfo({
        supplierId: this.parentData.supplierId
      })
      .then(res => {
        if (lodash.isEqual(res.code, "success")) {
          this.detailsInfo = res.data;
          this.baseUrl = base.defaultBaseUrl;
        } else {
          this.$vb.plugin.message.error(`获取供应商信息失败:${res.code}`);
        }
      });
  },
  props: {
    // 父组件传的数据
    parentData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  layerid: {
    // 当前弹层id，用于关闭弹层
    type: String,
    default: ""
  },
  lydata: {
    // 该值为父组件data的浅拷贝,更改父窗口传递的数据的时候，可以直接使用lydata来修改
    type: Object,
    default: () => {
      return {};
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/supplier-list-details-page.scss";
</style>
