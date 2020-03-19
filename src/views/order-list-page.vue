<template>
  <div class="table-panel">
    <div class="search-bar" @keydown.enter="search">
      <el-input
        v-model="searchForm.name"
        placeholder="请输入订单名"
        size="small"
      ></el-input>
      <el-input
        v-model="searchForm.nickName"
        placeholder="请输入用户名"
        size="small"
      ></el-input>
      <el-input
        v-model="searchForm.orderNo"
        placeholder="请输入订单号"
        size="small"
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
      <el-input
        v-model="searchForm.startOrderTime"
        placeholder="开始时间"
        size="small"
      ></el-input>
      <i style="margin: 0 9px 0 0; color: #bbb;">--</i>
      <el-input
        v-model="searchForm.endOrderTime"
        placeholder="结束时间"
        size="small"
      ></el-input>
      <div></div>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="mini"
        @click="search"
        >查询</el-button
      >
    </div>
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
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
      <el-table-column prop="orderTime" label="下单时间"></el-table-column>
      <el-table-column prop="totalAmount" label="总金额"></el-table-column>
      <el-table-column prop="orderStateName" label="订单状态"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            v-if="activeName === 'waitAllot'"
            @click.stop="handleClick('allot', scope.row)"
            type="primary"
            size="mini"
            >分配</el-button
          >
          <el-button
            @click.stop="handleClick('shipment', scope.row)"
            type="primary"
            size="mini"
            >发货</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchForm.pageNum"
      :page-sizes="[5, 10, 15, 20]"
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
import orderDetailPage from "@/views/order-list-details-page";
import orderAllotPage from "@/views/order-allot-page";
export default {
  name: "order-list-page",
  data() {
    return {
      searchForm: {
        name: "", // 订单名
        nickName: "", // 下单用户
        orderNo: "", // 订单号
        state: "", // 订单状态
        startOrderTime: "", // 开始时间
        endOrderTime: "", // 结束时间
        pageNum: 1,
        pageSize: 5
      },
      tableData: [],
      isLoading: false,
      total: 0,
      orderStatus: [],
      orderSupplierStatus: [],
      activeName: "waitAllot"
    };
  },
  methods: {
    search() {
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
        case "allot":
          this.$vb.plugin.openLayer(
            orderAllotPage,
            this,
            { order: val[0] },
            "分配供应商",
            350,
            200
          );
          break;
      }
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
      this.search();
    }
  },
  mounted() {
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
