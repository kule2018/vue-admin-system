<template>
  <div class="detail-box" :class="parentData.colNum">
    <div>
      <div>供应商名称</div>
      <div>{{ detailsInfo.name }}</div>
    </div>
    <div>
      <div>建立时间</div>
      <div>{{ detailsInfo.establTime }}</div>
    </div>
    <div>
      <div>法人</div>
      <div>{{ detailsInfo.legalPerson }}</div>
    </div>
    <div>
      <div>注册资金</div>
      <div>{{ detailsInfo.registerCapital }}</div>
    </div>
    <div>
      <div>固定电话</div>
      <div>{{ detailsInfo.phone }}</div>
    </div>
    <div>
      <div>手机</div>
      <div>{{ detailsInfo.mobilePhone }}</div>
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
      <div>企业性质</div>
      <div>{{ detailsInfo.enterprisNature }}</div>
    </div>
    <div>
      <div>经营范围</div>
      <div>{{ detailsInfo.scopeBusine }}</div>
    </div>
    <div>
      <div>供应商状态</div>
      <div>{{ detailsInfo.supplierStatusName }}</div>
    </div>
    <div class="fill">
      <div>公司地址</div>
      <div>{{ detailsInfo.companyAddress }}</div>
    </div>
    <div>
      <div>营业执照号</div>
      <div>{{ detailsInfo.businessLicenseNumber }}</div>
    </div>
    <div>
      <div>卫生许可证号</div>
      <div>{{ detailsInfo.sanitaryPermitNumber }}</div>
    </div>
    <div>
      <div>营业执照电子图</div>
      <div>
        <el-image
          style="width: 100px; height: 100px"
          v-if="detailsInfo.businessLicenseElecChart"
          :src="detailsInfo.businessLicenseElecChart"
          :preview-src-list="[detailsInfo.businessLicenseElecChart]"
        >
        </el-image>
      </div>
    </div>
    <div>
      <div>卫生许可证电子图</div>
      <div>
        <el-image
          style="width: 100px; height: 100px"
          v-if="detailsInfo.sanitaryPermitElecChart"
          :src="detailsInfo.sanitaryPermitElecChart"
          :preview-src-list="[detailsInfo.sanitaryPermitElecChart]"
        >
        </el-image>
      </div>
    </div>
  </div>
</template>

<script>
import lodash from "lodash";
import baseUrl from "@/api/base";

export default {
  name: "supplier-list-details-page",
  data() {
    return {
      detailsInfo: {}
    };
  },
  mounted() {
    this.$api.supplierManageAPI
      .getSupplierInfo({
        supplierId: this.parentData.supplierId
      })
      .then(res => {
        if (lodash.isEqual(res.code, "success")) {
          // 给相对路径加上baseUrl
          res.data.businessLicenseElecChart =
            baseUrl.defaultBaseUrl + res.data.businessLicenseElecChart;
          res.data.sanitaryPermitElecChart =
            baseUrl.defaultBaseUrl + res.data.sanitaryPermitElecChart;
          // 格式化时间
          res.data.establTime = this.$vb.format.formatDate(
            res.data.establTime,
            "yyyy-MM-dd"
          );
          // 格式化金额
          res.data.registerCapital = this.$vb.format.formatMoney(
            res.data.registerCapital,
            2,
            "￥"
          );
          this.detailsInfo = res.data;
          this.detailsInfo = Object.assign({}, this.detailsInfo);
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
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/supplier-list-details-page.scss";
</style>
