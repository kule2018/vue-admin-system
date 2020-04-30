<template>
  <div class="table-panel">
    <div class="search-bar" @keydown.enter="search(1)">
      <el-input
        v-model="searchForm.nickName"
        placeholder="请输入用户名"
        size="small"
        clearable
      ></el-input>
      <el-input
        v-model="searchForm.orderNo"
        placeholder="请输入订单号"
        size="small"
        clearable
      ></el-input>
      <el-select
        v-model="searchForm.state"
        placeholder="订单状态"
        value=""
        size="small"
        clearable
      >
        <el-option
          v-for="(item, index) in orderStatus"
          :key="index"
          :label="item.stateName"
          :value="item.stateId"
        ></el-option>
      </el-select>
      <el-date-picker
        v-model="searchForm.startOrderTime"
        placeholder="开始时间"
        type="date"
        size="small"
        clearable
      ></el-date-picker>
      <i style="margin: 0 9px 0 0; color: #bbb;">--</i>
      <el-date-picker
        v-model="searchForm.endOrderTime"
        placeholder="结束时间"
        type="date"
        size="small"
        clearable
      ></el-date-picker>
      <div></div>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="mini"
        @click="search(1)"
        >查询</el-button
      >
    </div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleTabClick"
      v-if="+$store.state.userInfo.roleTypeId !== 450"
    >
      <el-tab-pane label="未分配" name="waitAllot"></el-tab-pane>
      <el-tab-pane label="已分配" name="endAllot"></el-tab-pane>
    </el-tabs>
    <el-table
      :data="tableData"
      style="width: 100%"
      @row-click="openDetails"
      v-loading.fullscreen="isLoading"
    >
      <el-table-column prop="orderNo" label="订单号"></el-table-column>
      <el-table-column prop="name" label="订单名"></el-table-column>
      <el-table-column prop="nickName" label="下单用户"></el-table-column>
      <el-table-column label="下单时间">
        <template slot-scope="scope">
          {{ scope.row.orderTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="总金额">
        <template slot-scope="scope">
          {{ scope.row.totalAmount | formatMoney }}
        </template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          <span :style="{ color: stateColor(scope.row.state) }">{{
            scope.row.orderStateName
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="期望送达时间">
        <template slot-scope="scope">
          {{ scope.row.expectedTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column
        prop="supplierName"
        label="供应商"
        v-if="activeName === 'endAllot'"
      ></el-table-column>
      <el-table-column label="分配状态" v-if="activeName === 'endAllot'">
        <template slot-scope="scope">
          <span :style="{ color: osStateColor(scope.row.osStatusId) }">{{
            scope.row.osStatusName
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="allocationTime"
        label="分配时间"
        v-if="activeName === 'endAllot'"
        fixed="right"
      ></el-table-column>
      <el-table-column label="操作" width="220" fixed="right">
        <template slot-scope="scope">
          <template v-if="+scope.row.state === 200">
            <el-button
              v-if="
                activeName === 'waitAllot' &&
                  $store.state.userInfo.roleTypeId !== 450
              "
              @click.stop="handleClick('allot', scope.row)"
              type="primary"
              size="mini"
              >分配</el-button
            >
            <el-button
              v-if="
                activeName === 'waitAllot' &&
                  +scope.row.state === 200 &&
                  +$store.state.userInfo.roleTypeId === 150 &&
                  +$store.state.userInfo.roleTypeId === 300
              "
              @click.stop="handleClick('shipment', scope.row)"
              type="primary"
              size="mini"
              >发货</el-button
            >
            <el-button
              @click.stop="handleClick('export', scope.row)"
              type="primary"
              size="mini"
              >导出</el-button
            >
            <el-button
              v-if="
                +$store.state.userInfo.roleTypeId === 450 &&
                  activeName === 'endAllot' &&
                  +scope.row.state === 200 &&
                  +scope.row.osStatusId === 10100
              "
              @click.stop="handleClick('shipment', scope.row)"
              type="primary"
              size="mini"
              >发货</el-button
            >
            <el-button
              v-if="
                +$store.state.userInfo.roleTypeId === 450 &&
                  +scope.row.osStatusId === 10000
              "
              @click.stop="handleClick('todo', scope.row)"
              type="primary"
              size="mini"
              >处理</el-button
            >
            <el-button
              v-if="
                +$store.state.userInfo.roleTypeId !== 450 &&
                  activeName === 'endAllot' &&
                  +scope.row.state === 200 &&
                  +scope.row.osStatusId === 10000
              "
              @click.stop="handleClick('withdraw', scope.row)"
              type="primary"
              size="mini"
              >收回</el-button
            >
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchForm.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="searchForm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="page"
    >
    </el-pagination>
  </div>
</template>

<script>
import _ from "lodash";
import orderDetailPage from "@/views/order/order-list-details-page";
import allotSupplierPage from "@/views/supplier/allot-supplier-page";
import base from "@/api/base";
import format from "@/utils/format";

export default {
  name: "order-list-page",
  data() {
    return {
      searchForm: {
        nickName: "", // 下单用户
        orderNo: "", // 订单号
        state: "", // 订单状态
        startOrderTime: "", // 开始时间
        endOrderTime: "", // 结束时间
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      baseUrl: base.defaultBaseUrl,
      isLoading: false,
      total: 0,
      orderStatus: [],
      orderSupplierStatus: [],
      activeName: "waitAllot"
    };
  },
  filters: {
    formatDate(date) {
      return format.formatDate(date, "yyyy-MM-dd hh:mm");
    },
    formatMoney(money) {
      return format.formatMoney(money, 2, "￥");
    }
  },
  methods: {
    stateColor(id) {
      return (
        (id === 100 && "#f56c6c") ||
        (id === 200 && "#e6a23c") ||
        (id === 300 && "#67c23a") ||
        (id === 400 && "#67c23a") ||
        (id === 500 && "#909399") ||
        (id === 600 && "#909399")
      );
    },
    osStateColor(id) {
      return (
        (id === 10000 && "#e6a23c") ||
        (id === 10100 && "#67c23a") ||
        (id === 10200 && "#f56c6c") ||
        (id === 10300 && "#909399")
      );
    },
    search(...state) {
      if (state[0] === 1) {
        this.searchForm.pageNum = 1;
      }
      this.isLoading = true;
      if (this.activeName === "waitAllot") {
        this.$api.orderManageAPI.getOrderList(this.searchForm).then(res => {
          if (_.isEqual(res.code, "success")) {
            this.tableData = res.data;
            this.total = res.total;
            this.isLoading = false;
          } else {
            this.$vb.plugin.message.error(res.msg);
          }
        });
      } else {
        this.$api.orderManageAPI
          .getAllotOrderList(this.searchForm)
          .then(res => {
            if (_.isEqual(res.code, "success")) {
              this.tableData = res.data;
              this.total = res.total;
              this.isLoading = false;
            } else {
              this.$vb.plugin.message.error(res.msg);
            }
          });
      }
    },
    handleClick(state, ...val) {
      switch (state) {
        case "detail":
          this.$vb.plugin.openLayer(
            orderDetailPage,
            this,
            {
              colNum: "two-col",
              orderId: val[0].orderId,
              activeName: this.activeName
            },
            "订单详情",
            800,
            "80%"
          );
          break;
        case "todo":
          this.$vb.plugin.openLayer(
            orderDetailPage,
            this,
            {
              colNum: "two-col",
              orderId: val[0].orderId,
              activeName: this.activeName,
              state: "todo"
            },
            "订单详情",
            800,
            "80%"
          );
          break;
        case "allot":
          this.$vb.plugin.openLayer(
            allotSupplierPage,
            this,
            { state: "order", orderId: val[0].orderId },
            "分配供应商",
            1200,
            "80%"
          );
          break;
        case "shipment":
          this.$confirm("确认发货吗?", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$api.orderManageAPI
                .deliveryOrder({ orderId: val[0].orderId })
                .then(res => {
                  if (_.isEqual(res.code, "success")) {
                    this.$vb.plugin.message.success(res.msg);
                    this.search();
                  } else {
                    this.$vb.plugin.message.error(res.msg);
                  }
                });
            })
            .catch(() => {});
          break;
        case "withdraw":
          this.$confirm("确认收回吗?", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$api.orderManageAPI
                .withdraw({
                  orderSupplierId: val[0].orderSupplierId,
                  orderId: val[0].orderId,
                  supplierId: val[0].supplierId
                })
                .then(res => {
                  if (_.isEqual(res.code, "success")) {
                    this.$vb.plugin.message.success(res.msg);
                    this.search();
                  } else {
                    this.$vb.plugin.message.error(res.msg);
                  }
                });
            })
            .catch(() => {});
          break;
        case "export":
          this.downloadDocument(
            `${this.baseUrl}/sys/order/export?orderId=${val[0].orderId}`,
            val[0].name
          );
          break;
        default:
          break;
      }
    },
    downloadDocument(content, fileName) {
      let aEle = document.createElement("a");
      aEle.download = fileName;
      aEle.href = content;
      aEle.click();
    },
    handleSizeChange(size) {
      this.searchForm.pageSize = size;
      this.search();
    },
    handleCurrentChange(page) {
      this.searchForm.pageNum = page;
      this.search();
    },
    openDetails(row) {
      this.handleClick("detail", row);
    },
    handleTabClick() {
      this.searchForm.pageNum = 1;
      this.search();
    }
  },
  mounted() {
    this.$store.state.userInfo.roleTypeId === 450 &&
      (this.activeName = "endAllot");
    this.search();
    this.$api.orderManageAPI.getOrderState({}).then(res => {
      this.orderStatus = res.data;
    });
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/order-list-page.scss";
</style>
