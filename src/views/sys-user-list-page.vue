<template>
  <div class="table-panel">
    <div class="search-bar" @keydown.enter="search">
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
      <el-button
        type="primary"
        plain
        icon="el-icon-plus"
        size="small"
        @click="handleClick('add')"
        >增加</el-button
      >
      <el-button plain icon="el-icon-refresh-left" size="small" @click="reset"
        >重置</el-button
      >
    </div>
    <el-tabs v-model="tabActiveName" @tab-click="handleTabClick">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="冻结" name="freeze"></el-tab-pane>
      <el-tab-pane label="黑名单" name="block"></el-tab-pane>
    </el-tabs>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-if="tabActiveName === 'all'"
    >
      <el-table-column label="头像" width="120" align="center">
        <template slot-scope="scope">
          <el-avatar :src="baseUrl + scope.row.iconPath" />
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称"></el-table-column>
      <el-table-column prop="loginName" label="用户名"></el-table-column>
      <el-table-column prop="roleName" label="用户类型"></el-table-column>
      <el-table-column label="操作" width="350">
        <template slot-scope="scope">
          <el-button
            @click="handleClick('detail', scope.row.userid)"
            type="primary"
            size="mini"
            >查看</el-button
          >
          <el-button
            @click="handleClick('update', scope.row.userid)"
            type="warning"
            size="mini"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="tableData" style="width: 100%" v-else>
      <el-table-column label="头像" width="120" align="center">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.avatarUrl" />
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称"></el-table-column>
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column label="操作" width="350">
        <template slot-scope="scope">
          <el-button
            v-if="tabActiveName === 'freeze'"
            @click="handleClick('unfreeze', scope.row.personId)"
            type="primary"
            size="mini"
            >解冻</el-button
          >
          <el-button
            v-else-if="tabActiveName === 'block'"
            @click="handleClick('unblock', scope.row.personId)"
            type="warning"
            size="mini"
            >移出黑名单</el-button
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
import lodash from "lodash";
import baseUrl from "@/api/base";
import sysUserDetail from "@/views/sys-user-detail-page";
import sysUserEdit from "@/views/sys-user-edit-page";
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
      if (this.tabActiveName === "all") {
        this.$api.sysUserInfoAPI
          .getUserInfoList({ name: this.searchParam })
          .then(res => {
            if (lodash.isEqual(res.code, "success")) {
              self.tableData = res.data;
            } else {
              self.$vb.plugin.message.error(res.msg);
            }
          });
      }
      if (this.tabActiveName === "freeze") {
        this.$api.sysUserInfoAPI
          .queryFreezeUserInfo({
            name: this.searchParam,
            nickName: this.searchParam
          })
          .then(res => {
            if (lodash.isEqual(res.code, "success")) {
              self.tableData = res.data;
            } else {
              self.$vb.plugin.message.error(res.msg);
            }
          });
      }
      if (this.tabActiveName === "block") {
        this.$api.sysUserInfoAPI
          .queryDefriendUserInfo({
            name: this.searchParam,
            nickName: this.searchParam
          })
          .then(res => {
            if (lodash.isEqual(res.code, "success")) {
              self.tableData = res.data;
            } else {
              self.$vb.plugin.message.error(res.msg);
            }
          });
      }
    },
    reset() {
      this.searchParam = "";
      this.search();
    },
    handleClick(state, ...userid) {
      const self = this;
      switch (state) {
        case "detail":
          this.$vb.plugin.openLayer(
            sysUserDetail,
            this,
            { colNum: "one-col", userid: userid },
            "系统用户详情",
            580,
            350
          );
          break;
        case "add":
          this.$vb.plugin.openLayer(
            sysUserEdit,
            this,
            { state: state, userid: userid },
            "新增系统用户",
            620,
            440
          );
          break;
        case "update":
          this.$vb.plugin.openLayer(
            sysUserEdit,
            this,
            { state: state, userid: userid },
            "修改系统用户",
            620,
            380
          );
          break;
        case "unfreeze":
          this.$confirm("是否将该用户解冻?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "primary"
          })
            .then(() => {
              self.$api.sysUserInfoAPI
                .relieveFreezeUserInfo({ personId: userid })
                .then(res => {
                  if (lodash.isEqual(res.code, "success")) {
                    this.$vb.plugin.message.success(res.msg);
                  } else {
                    this.$vb.plugin.message.error(res.msg);
                  }
                });
            })
            .catch(() => {});
          break;
        case "unblock":
          this.$confirm("是否将该用户移出黑名单?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "primary"
          })
            .then(() => {
              self.$api.sysUserInfoAPI
                .relieveDefriendUserInfo({ personId: userid })
                .then(res => {
                  if (lodash.isEqual(res.code, "success")) {
                    this.$vb.plugin.message.success(res.msg);
                  } else {
                    this.$vb.plugin.message.error(res.msg);
                  }
                });
            })
            .catch(() => {});
          break;
        default:
          break;
      }
    },
    handleTabClick() {
      this.search();
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  mounted() {
    this.search();
    this.baseUrl = baseUrl.defaultBaseUrl;
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/table-page.scss";
</style>
