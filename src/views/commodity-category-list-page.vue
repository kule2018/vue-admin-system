<!--商品类别-->
<template>
  <div class="table-panel">
    <div class="search-bar" @keydown.enter="search">
      <el-input
        v-model="searchForm.name"
        placeholder="请输入类别名"
        size="small"
      />
      <el-button
        type="primary"
        icon="el-icon-search"
        size="small"
        @click="search"
        >查询</el-button
      >
      <el-button type="primary" plain size="small" @click="handleClick(0)"
        >新增</el-button
      >
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @row-click="openDetails"
      v-loading.fullscreen="isLoading"
    >
      <el-table-column label="类别图">
        <template slot-scope="scope">
          <el-avatar :src="baseUrl + scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column prop="sortNumber" label="排序号" />
      <el-table-column prop="classifyName" label="分类名" />
      <el-table-column prop="name" label="类别名" />
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
import commodityCategoryEditPage from "@/views/commodity-category-edit-page.vue";
import commodityCategoryDetailsPage from "@/views/commodity-category-details-page.vue";

export default {
  name: "commodity-category-list-page",
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
    this.$api.commodityCategoryMangeAPI.getCommodityCategoryList().then(res => {
      if (lodash.isEqual(res.code, "success")) {
        this.total = res.total;
        this.tableData = res.data;
        this.baseUrl = base.defaultBaseUrl;
      } else {
        this.$vb.plugin.message.error(`获取商品类别列表失败,${res.code}`);
      }
    });
  },
  methods: {
    search() {
      this.isLoading = true;
      this.$api.commodityCategoryMangeAPI
        .getCommodityCategoryList(this.searchForm)
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
            commodityCategoryEditPage,
            this,
            { state: "add" },
            "商品类别增加",
            650,
            350
          );
          break;
        case 1:
          // 变动
          console.log(row);
          this.$vb.plugin.openLayer(
            commodityCategoryEditPage,
            this,
            Object.assign({ state: "update" }, row),
            "商品类别变动",
            650,
            350
          );
          break;
        case 2:
          // 详情
          this.$vb.plugin.openLayer(
            commodityCategoryDetailsPage,
            this,
            { categoryId: row.categoryId, colNum: "one-col" },
            "商品类别详情",
            650,
            350
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
      this.handleClick(2, row);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/commodity-category-list";
</style>
