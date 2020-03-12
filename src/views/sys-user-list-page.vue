<template>
  <div class="table-panel">
    <div class="search-bar">
      <el-input
        v-model="searchParam"
        placeholder="请输入昵称"
        size="small"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="small"
        @click="search"
        >查询</el-button
      >
      <el-button type="primary" plain icon="el-icon-plus" size="small"
        >增加</el-button
      >
      <el-button plain icon="el-icon-refresh-left" size="small" @click="reset"
        >重置</el-button
      >
    </div>
    <el-tabs v-model="tabActiveName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="冻结" name="freeze"></el-tab-pane>
      <el-tab-pane label="黑名单" name="blacklist"></el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="用户头像" width="120" align="center">
        <template slot-scope="scope">
          <el-avatar :src="baseUrl + scope.row.iconPath" />
        </template>
      </el-table-column>
      <el-table-column prop="loginName" label="用户名"></el-table-column>
      <el-table-column prop="roleName" label="用户类型"></el-table-column>
      <el-table-column prop="nickName" label="昵称"></el-table-column>
      <el-table-column label="操作" width="350">
        <template slot-scope="scope">
          <el-button
            @click="showDialog(scope.row.userid)"
            type="primary"
            size="small"
            >查看</el-button
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
      :total="20"
      class="page"
    >
    </el-pagination>
  </div>
</template>

<script>
import baseUrl from "@/api/base";
import sysUserDetail from "@/views/sys-user-detail";
export default {
  name: "sys-user-list-page",
  data() {
    return {
      searchParam: "",
      currentPage: 1,
      tabActiveName: "all",
      tableData: [],
      baseUrl: ""
    };
  },
  methods: {
    search() {
      const self = this;
      this.$api.sysUserInfoAPI
        .getUserInfoList({ name: this.searchParam })
        .then(res => {
          self.tableData = res.data;
        });
    },
    reset() {
      this.searchParam = "";
      this.search();
    },
    showDialog(userid) {
      this.$vb.plugin.openLayer(
        sysUserDetail,
        this,
        { colNum: "one-col", userid: userid },
        "系统用户详情",
        580,
        350,
        function() {
          // 窗口关闭后执行
        }
      );
    },
    handleClick() {},
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  mounted() {
    const self = this;
    this.$api.sysUserInfoAPI.getUserInfoList({}).then(res => {
      console.log(res);
      self.tableData = res.data;
    });
    this.baseUrl = baseUrl.defaultBaseUrl;
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/table-page.scss";
</style>
