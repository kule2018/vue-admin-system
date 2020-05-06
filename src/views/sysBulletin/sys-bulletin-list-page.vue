<template>
  <div class="table-panel">
    <div class="search-bar" @keydown.enter="search(1)">
      <el-input
        v-model="searchForm.name"
        placeholder="请输入公告内容"
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
      <el-table-column
        prop="bulletinBoardId"
        label="公告ID"
        width="100"
      ></el-table-column>
      <el-table-column prop="content" label="公告内容"></el-table-column>
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
            @click.stop="handleClick('update', scope.row.bulletinBoardId)"
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
import sysUserDetail from "@/views/sysBulletin/sys-bulletin-detail-page";
import sysUserEdit from "@/views/sysBulletin/sys-bulletin-edit-page";

export default {
  name: "sys-user-list-page",
  data() {
    return {
      searchForm: {
        content: "",
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
      this.$api.sysBulletinBoardManageAPI
        .getSysBulletinList(this.searchForm)
        .then(res => {
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
      console.log(id[0]);
      switch (state) {
        case "detail":
          this.$vb.plugin.openLayer(
            sysUserDetail,
            this,
            { colNum: "one-col", bulletinBoardId: id[0] },
            "系统公告详情",
            420,
            330
          );
          break;
        case "add":
          this.$vb.plugin.openLayer(
            sysUserEdit,
            this,
            { state: state, bulletinBoardId: id[0] },
            "系统公告增加",
            520,
            380
          );
          break;
        case "update":
          this.$vb.plugin.openLayer(
            sysUserEdit,
            this,
            { state: state, bulletinBoardId: id[0] },
            "系统公告变动",
            520,
            380
          );
          break;
        default:
          break;
      }
    },
    handleTabClick() {
      this.search();
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
      this.handleClick("detail", row.bulletinBoardId);
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
