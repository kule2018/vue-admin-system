<!--商品分类列表-->
<template>
  <div class="table-panel">
    <div class="search-bar" @keydown.enter="search(1)">
      <el-input
        v-model="searchForm.name"
        placeholder="请输入类别名"
        size="small"
        clearable
      />
      <el-button
        type="primary"
        icon="el-icon-search"
        size="small"
        @click="search(1)"
        >查询</el-button
      >
      <el-button type="primary" plain size="small" @click="handleClick(0)"
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
      <el-table-column prop="name" label="分类名" />
      <el-table-column prop="sortNumber" label="排序号" />
      <el-table-column fixed="right" width="150" label="操作">
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
import lodash from "lodash";
import base from "@/api/base";
import commodityClassifyEditPage from "@/views/commodity/commodity-classify-edit-page";
import commodityClassifyDetailsPage from "@/views/commodity/commodity-classify-details-page";

export default {
  name: "commodity-classify-list-page",
  data() {
    return {
      tabActiveName: "all",
      tableData: [],
      searchForm: {
        name: "",
        pageNum: 1,
        pageSize: 10
      },
      currentPage: 1,
      isLoading: false,
      total: 0,
      baseUrl: ""
    };
  },
  mounted() {
    this.baseUrl = base.defaultBaseUrl;
    this.search();
  },
  methods: {
    search(...state) {
      if (state[0] === 1) {
        this.searchForm.pageNum = 1;
      }
      this.isLoading = true;
      this.$api.commodityClassifyMangeAPI
        .getCommodityClassifyList(this.searchForm)
        .then(res => {
          if (lodash.isEqual(res.code, "success")) {
            this.tableData = res.data;
            this.total = res.total;
            this.isLoading = false;
          } else {
            this.$vb.plugin.message.error(res.msg);
          }
        });
    },
    handleClick(status, row) {
      switch (status) {
        case 0:
          // 新增
          this.$vb.plugin.openLayer(
            commodityClassifyEditPage,
            this,
            { state: "add" },
            "商品分类增加",
            600,
            350
          );
          break;
        case 1:
          // 变动
          this.$vb.plugin.openLayer(
            commodityClassifyEditPage,
            this,
            { state: "update", name: row.name },
            "商品分类变动",
            600,
            350
          );
          break;
        case 2:
          // 详情
          this.$vb.plugin.openLayer(
            commodityClassifyDetailsPage,
            this,
            { classifyId: row.classifyId, colNum: "one-col" },
            "商品分类详情",
            600,
            350
          );
          break;
      }
    },
    handleSizeChange(size) {
      this.searchForm.pageSize = size;
      this.searchForm.pageNum = 1;
      this.search();
    },
    handleCurrentChange(page) {
      this.searchForm.pageNum = page;
      this.search();
    },
    openDetails(row) {
      this.handleClick(2, row);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/commodity/commodity-classify-list.scss";
</style>
