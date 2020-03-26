<template>
  <div class="table-panel">
    <div class="search-bar" @keydown.enter="search">
      <el-input
        v-model="searchForm.name"
        placeholder="请输入商品名"
        size="small"
      ></el-input>
      <el-input
        v-model="searchForm.startPrice"
        placeholder="最低价"
        size="small"
      ></el-input>
      <i style="margin: 0 9px 0 0; color: #bbb;">--</i>
      <el-input
        v-model="searchForm.endPrice"
        placeholder="最高价"
        size="small"
      ></el-input>
      <el-select
        v-model="searchForm.special"
        placeholder="特价"
        value=""
        size="small"
        clearable
      >
        <el-option label="是" :value="1"></el-option>
        <el-option label="否" :value="0"></el-option>
      </el-select>
      <el-select
        v-model="searchForm.newProduct"
        placeholder="新产品"
        value=""
        size="small"
        clearable
      >
        <el-option label="是" :value="1"></el-option>
        <el-option label="否" :value="0"></el-option>
      </el-select>
      <el-select
        v-model="searchForm.statusCode"
        value=""
        size="small"
        placeholder="请选择商品状态"
        clearable
        @click.native.once="getSelect('status')"
      >
        <el-option
          v-for="(item, index) in statuses"
          :key="index"
          :label="item.statusName"
          :value="item.statusCodeId"
        ></el-option>
      </el-select>
      <el-select
        v-model="searchForm.classifyId"
        value=""
        size="small"
        @change="categoryChange"
        placeholder="请选择大类"
        ref="classify"
        @click.native.once="getSelect('classify')"
        clearable
        @clear="clearClassify"
      >
        <el-option
          v-for="(item, index) in firstCategorys"
          :key="index"
          :label="item.name"
          :value="item.classifyId"
        ></el-option>
      </el-select>
      <el-select
        v-model="searchForm.categoryId"
        value=""
        size="small"
        placeholder="请选择小类"
        clearable
      >
        <el-option
          v-for="(item, index) in secondCategorys"
          :key="index"
          :label="item.name"
          :value="item.categoryId"
        ></el-option>
      </el-select>
      <div></div>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="mini"
        @click="search"
        >查询</el-button
      >
      <el-button type="primary" plain size="mini" @click="handleClick('add')"
        >增加</el-button
      >
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @row-click="openDetails"
      v-loading.fullscreen="isLoading"
    >
      <el-table-column prop="name" label="商品名"></el-table-column>
      <el-table-column prop="categoryName" label="分类名"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="unitName" label="单位名称"></el-table-column>
      <el-table-column prop="inventoryNum" label="库存数"></el-table-column>
      <el-table-column label="新产品">
        <template slot-scope="scope">
          <template v-if="scope.row.newProduct">是</template>
          <template v-else>否</template>
        </template>
      </el-table-column>
      <el-table-column label="特价">
        <template slot-scope="scope">
          <template v-if="scope.row.special">是</template>
          <template v-else>否</template>
        </template>
      </el-table-column>
      <el-table-column prop="statusName" label="状态"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            @click.stop="handleClick('update', scope.row)"
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
import _ from "lodash";
import materialDetailPage from "@/views/material-list-details-page";
import materialEditPage from "@/views/material-list-edit-page";
export default {
  name: "order-list-page",
  data() {
    return {
      searchForm: {
        name: "",
        startPrice: "",
        endPrice: "",
        special: "",
        newProduct: "",
        classifyId: "",
        categoryId: "",
        statusCode: "",
        pageNum: 1,
        pageSize: 10
      },
      currentPage: 1,
      tableData: [],
      isLoading: false,
      total: 0,
      statuses: [],
      firstCategorys: [],
      secondCategorys: []
    };
  },
  methods: {
    search() {
      this.isLoading = true;
      this.$api.materialManageAPI.getMaterialList(this.searchForm).then(res => {
        if (_.isEqual(res.code, "success")) {
          this.tableData = res.data;
          this.total = res.total;
          this.isLoading = false;
        } else {
          this.$vb.plugin.message.error(res.msg);
        }
      });
    },
    handleClick(state, ...val) {
      switch (state) {
        case "detail":
          this.$vb.plugin.openLayer(
            materialDetailPage,
            this,
            { colNum: "two-col", materialId: val[0].materialId },
            "商品详情",
            800,
            "80%"
          );
          break;
        case "add":
          this.$vb.plugin.openLayer(
            materialEditPage,
            this,
            { state: state },
            "商品增加",
            800,
            "80%"
          );
          break;
        case "update":
          this.$vb.plugin.openLayer(
            materialEditPage,
            this,
            { state: state, materialId: val[0].materialId },
            "商品变动",
            800,
            "80%"
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
    categoryChange(val) {
      this.searchForm.categoryId = "";
      // 获取二级分类集合
      this.$api.materialManageAPI
        .getMaterialCategory({ classifyId: val })
        .then(res => {
          this.secondCategorys = res.data;
        });
    },
    getSelect(status) {
      switch (status) {
        case "status":
          // 获取商品状态集合
          this.$api.materialManageAPI.getMaterialStatus({}).then(res => {
            this.statuses = res.data;
          });
          break;
        case "classify":
          // 获取一级分类集合
          this.$api.materialManageAPI.getClassify({}).then(res => {
            this.firstCategorys = res.data;
          });
          break;
        default:
          break;
      }
    },
    clearClassify() {
      this.searchForm.categoryId = "";
      this.secondCategorys = [];
    }
  },
  mounted() {
    this.search();
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/order-list-page.scss";
</style>
