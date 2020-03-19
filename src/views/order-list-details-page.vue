<template>
  <div class="order-detail">
    <el-tabs v-model="activeName" type="card" class="orderDetailTab">
      <el-tab-pane label="订单信息" name="orderInfo">
        <div class="detail-box" :class="parentData.colNum">
          <div class="fill">
            <div>订单号</div>
            <div>{{ detailsInfo.orderNo }}</div>
          </div>
          <div class="fill">
            <div>流水号</div>
            <div>{{ detailsInfo.serialNumber }}</div>
          </div>
          <div>
            <div>订单名称</div>
            <div>{{ detailsInfo.name }}</div>
          </div>
          <div>
            <div>订单用户</div>
            <div>{{ detailsInfo.nickName }}</div>
          </div>
          <div>
            <div>下单时间</div>
            <div>{{ detailsInfo.orderTime }}</div>
          </div>
          <div>
            <div>订单状态</div>
            <div>{{ detailsInfo.orderStateName }}</div>
          </div>
          <div>
            <div>待付金额</div>
            <div>{{ detailsInfo.amountToBePaid || 0 }}</div>
          </div>
          <div>
            <div>折扣金额</div>
            <div>{{ detailsInfo.discountAmount || 0 }}</div>
          </div>
          <div>
            <div>支付金额</div>
            <div>{{ detailsInfo.amountPay || 0 }}</div>
          </div>
          <div>
            <div>运费</div>
            <div>{{ detailsInfo.freight || 0 }}</div>
          </div>
          <div>
            <div>总金额</div>
            <div>{{ detailsInfo.totalAmount || 0 }}</div>
          </div>
          <div>
            <div>付款方式</div>
            <div>{{ detailsInfo.modePayment }}</div>
          </div>
          <div>
            <div>供应商名</div>
            <div>{{ detailsInfo.supplierName }}</div>
          </div>
          <div>
            <div>分配状态</div>
            <div>{{ detailsInfo.osStatusName }}</div>
          </div>
          <div>
            <div>分配时间</div>
            <div>{{ detailsInfo.allocationTime }}</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品信息" name="materialInfo">
        <el-table :data="detailsInfo.orderMaterialList" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品图">
                  <el-image
                    v-if="props.row.coverFigurePath"
                    style="width: 100px; height: 100px"
                    :src="props.row.coverFigurePath"
                    :preview-src-list="[props.row.coverFigurePath]"
                  >
                  </el-image>
                </el-form-item>
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="商品数量">
                  <span>{{ props.row.number }}</span>
                </el-form-item>
                <el-form-item label="商品价格">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="商品单位">
                  <span>{{ props.row.unitName }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name"></el-table-column>
          <el-table-column label="商品数量" prop="number"></el-table-column>
          <el-table-column label="商品价格" prop="price"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div class="button__bottom">
      <el-button type="info" size="small">退回</el-button>
      <el-button type="primary" size="small">接收</el-button>
    </div>
  </div>
</template>

<script>
import lodash from "lodash";
import base from "@/api/base";
export default {
  name: "order-list-details-page",
  data() {
    return {
      detailsInfo: {},
      activeName: "orderInfo"
    };
  },
  mounted() {
    this.$api.orderManageAPI
      .getOrderDetail({
        orderId: this.parentData.orderId
      })
      .then(res => {
        if (lodash.isEqual(res.code, "success")) {
          Array.prototype.forEach.call(res.data.orderMaterialList, item => {
            item.coverFigurePath = base.defaultBaseUrl + item.coverFigurePath;
          });
          console.log(res.data);
          this.detailsInfo = res.data;
        } else {
          this.$vb.plugin.message.error(`获取订单信息失败:${res.code}`);
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
@import "~@/assets/scss/order-list-details-page.scss";
</style>
