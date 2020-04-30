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
    <div>
      <div>审核状态</div>
      <div>{{ detailsInfo.acName }}</div>
    </div>
    <div class="fill" v-if="+detailsInfo.acId === 10070">
      <div>拒绝原因</div>
      <div>{{ detailsInfo.reason }}</div>
    </div>
    <div class="button__bottom" v-if="showButton">
      <el-tooltip
        placement="top"
        width="50"
        :manual="true"
        effect="light"
        v-model="reasonVisible"
      >
        <p slot="content" style="font-size: 14px;">
          <el-icon
            class="el-icon-error"
            style="color: #f78a8a; margin-right: 5px;"
          ></el-icon
          >请填写拒绝原因
        </p>
        <el-input
          ref="rejectInput"
          placeholder="拒绝需填写拒绝原因"
          size="small"
          style="width: 300px;"
          v-model="reason"
        ></el-input>
      </el-tooltip>
      <el-button type="info" size="small" @click="handleClick('reject')"
        >拒绝</el-button
      >
      <el-button type="primary" size="small" @click="handleClick('resolve')"
        >同意</el-button
      >
    </div>
  </div>
</template>

<script>
import lodash from "lodash";
import baseUrl from "@/api/base";
import _ from "lodash";

export default {
  name: "supplier-list-details-page",
  data() {
    return {
      detailsInfo: {},
      showButton: false,
      reason: "",
      reasonVisible: false
    };
  },
  mounted() {
    this.showButton = this.parentData.state === "todo";
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
  methods: {
    handleClick(state) {
      const self = this;
      let sendData = {
        supplierId: this.parentData.supplierId,
        reason: this.reason
      };
      switch (state) {
        case "reject":
          if (this.reason !== "") {
            this.$api.supplierManageAPI
              .auditRejectSupplier(sendData)
              .then(res => {
                if (_.isEqual(res.code, "success")) {
                  this.$layer.msg(res.msg);
                  this.$parent.search();
                  this.$layer.close(this.layerid);
                } else {
                  self.$vb.plugin.message.error("失败", res.msg);
                }
              });
          } else {
            this.reasonVisible = true;
            this.$refs.rejectInput.$el.children[0].focus();
            setTimeout(() => {
              self.reasonVisible = false;
            }, 2500);
          }
          break;
        case "resolve":
          this.$api.supplierManageAPI.auditAgreeSupplier(sendData).then(res => {
            if (_.isEqual(res.code, "success")) {
              this.$layer.msg(res.msg);
              this.$parent.search();
              this.$layer.close(this.layerid);
            } else {
              self.$vb.plugin.message.error("失败", res.msg);
            }
          });
          break;
        default:
          break;
      }
    }
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
