<template>
  <div class="table-panel">
    <div class="search-bar" @keydown.enter="search(1)">
      <el-input
        v-model="searchForm.title"
        placeholder="请输入活动标题"
        size="small"
        clearable
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="small"
        @click="search(1)"
        >查询</el-button
      >
      <el-button type="primary" plain size="small" @click="handleClick('add')"
        >增加</el-button
      >
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @row-click="openDetails"
      v-loading.fullscreen="isLoading"
    >
      <el-table-column prop="title" label="活动标题"></el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="endTime"
        label="结束时间"
        width="200"
      ></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            @click.stop="handleClick('update', scope.row.salesPromotionId)"
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
import sysSalesDetail from "@/views/sysSales/sys-sales-detail-page";
import sysSalesEdit from "@/views/sysSales/sys-sales-edit-page";

export default {
  name: "sys-user-list-page",
  data() {
    return {
      searchForm: {
        title: "",
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      baseUrl: "",
      isLoading: false,
      total: 0
    };
  },
  methods: {
    search(...state) {
      if (state[0] === 1) {
        this.searchForm.pageNum = 1;
      }
      this.isLoading = true;
      this.$api.sysSalesManageAPI.getSysSalesList(this.searchForm).then(res => {
        if (lodash.isEqual(res.code, "success")) {
          this.tableData = res.data;
          this.total = res.total;
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.$vb.plugin.message.error(res.msg);
        }
      });
    },
    handleClick(state, ...id) {
      switch (state) {
        case "detail":
          this.$vb.plugin.openLayer(
            sysSalesDetail,
            this,
            { colNum: "one-col", salesPromotionId: id[0] },
            "活动详情",
            800,
            "80%"
          );
          break;
        case "add":
          this.$vb.plugin.openLayer(
            sysSalesEdit,
            this,
            { state: state },
            "活动增加",
            800,
            "80%"
          );
          break;
        case "update":
          this.$vb.plugin.openLayer(
            sysSalesEdit,
            this,
            { state: state, salesPromotionId: id[0] },
            "活动变动",
            800,
            "80%"
          );
          break;
        default:
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
      this.handleClick("detail", row.salesPromotionId);
    }
  },
  mounted() {
    this.search();
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/table-page.scss";
</style>
