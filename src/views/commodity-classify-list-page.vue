<!--商品分类列表-->
<template>
  <div class="table-panel">
    <div class="search-bar">
      <el-input v-model="searchParam" placeholder="请输入昵称" size="small" />
      <el-button
        type="primary"
        icon="el-icon-search"
        size="small"
        @click="search"
        >查询</el-button
      >
      <el-button type="primary" plain size="small" @click="handleClick(0, '')"
        >增加</el-button
      >
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @row-click="openDetails"
      v-loading.fullscreen="isLoading"
    >
      <el-table-column label="分类图">
        <template slot-scope="scope">
          <el-avatar :src="baseUrl + scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column prop="sortNumber" label="排序号" />
      <el-table-column prop="name" label="类别名" />
      <el-table-column fixed="right" width="360" label="操作">
        <template slot-scope="scope">
          <el-button
            @click.stop="handleClick(1, scope.row)"
            type="primary"
            size="mini"
            >变动</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="page"
    >
    </el-pagination>
  </div>
</template>
<script>
import lodash from "lodash";
import base from "@/api/base";

export default {
  name: "commodity-classify-list-page",
  data() {
    return {
      searchParam: "",
      tabActiveName: "all",
      tableData: [],
      currentPage: 1,
      isLoading: false,
      total: 0,
      baseUrl: ""
    };
  },
  mounted() {
    this.$api.commodityClassifyMangeAPI.getCommodityClassifyList().then(res => {
      if (lodash.isEqual(res.code, "success")) {
        console.log(res);
        this.total = res.total;
        this.tableData = res.data;
        this.baseUrl = base.defaultBaseUrl;
      } else {
        this.$vb.plugin.message.error(`获取商品分类列表失败,${res.code}`);
      }
    });
  },
  methods: {
    search() {
      this.isLoading = true;
      this.$api.supplierManageAPI
        .getSupplierList({
          name: this.searchParam
        })
        .then(res => {
          if (lodash.isEqual(res.code, "success")) {
            this.tableData = res.data;
            this.isLoading = false;
          } else {
            this.$vb.plugin.message.error(res.msg);
          }
        });
    },
    // eslint-disable-next-line no-unused-vars
    handleClick(status, ...val) {
      switch (status) {
        case 0:
          // 增加
          break;
        case 1:
          // 变动
          break;
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    openDetails(row) {
      this.handleClick(0, row);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/commodity-classify-list";
</style>
