<template>
  <div class="table-panel">
    <div class="search-bar" @keydown.enter="search(1)">
      <el-input
        v-model="searchForm.name"
        placeholder="请输入昵称"
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
    <el-tabs v-model="tabActiveName" @tab-click="handleTabClick">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="冻结" name="freeze"></el-tab-pane>
      <el-tab-pane label="黑名单" name="block"></el-tab-pane>
    </el-tabs>
    <el-table
      :data="tableData"
      style="width: 100%"
      @row-click="openDetails"
      v-loading.fullscreen="isLoading"
    >
      <el-table-column label="头像" width="120" align="center">
        <template slot-scope="scope">
          <el-avatar :src="baseUrl + scope.row.iconPath" />
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称"></el-table-column>
      <el-table-column prop="loginName" label="用户名"></el-table-column>
      <el-table-column prop="roleName" label="用户类型"></el-table-column>
      <el-table-column prop="statusName" label="状态"></el-table-column>
      <el-table-column prop="supplierName" label="供应商"></el-table-column>
      <el-table-column label="操作" width="210">
        <template slot-scope="scope">
          <el-button
            v-if="+scope.row.statusCode === 61"
            @click.stop="handleClick('update', scope.row.userid)"
            type="primary"
            size="mini"
            >变动</el-button
          >
          <el-button
            v-if="+scope.row.statusCode === 61"
            @click.stop="handleClick('freeze', scope.row.userid)"
            type="primary"
            size="mini"
            >冻结</el-button
          >
          <el-button
            v-if="+scope.row.statusCode === 61"
            @click.stop="handleClick('block', scope.row.userid)"
            type="primary"
            size="mini"
            >拉黑</el-button
          >
          <el-button
            v-if="+scope.row.statusCode === 71"
            @click.stop="handleClick('unfreeze', scope.row.userid)"
            type="primary"
            size="mini"
            >解除冻结</el-button
          >
          <el-button
            v-if="+scope.row.statusCode === 81"
            @click.stop="handleClick('unblock', scope.row.userid)"
            type="primary"
            size="mini"
            >解除拉黑</el-button
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
import baseUrl from "@/api/base";
import sysUserDetail from "@/views/sysUser/sys-user-detail-page";
import sysUserEdit from "@/views/sysUser/sys-user-edit-page";
export default {
  name: "sys-user-list-page",
  data() {
    return {
      searchForm: {
        name: "",
        pageNum: 1,
        pageSize: 10
      },
      tabActiveName: "all",
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
      switch (this.tabActiveName) {
        case "all":
          this.$api.sysUserInfoAPI
            .getUserInfoList(this.searchForm)
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
          break;
        case "freeze":
          this.$api.sysUserInfoAPI
            .queryFreezeUserInfo(this.searchForm)
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
          break;
        case "block":
          this.$api.sysUserInfoAPI
            .queryDefriendUserInfo(this.searchForm)
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
          break;
        default:
          break;
      }
    },
    handleClick(state, ...userid) {
      const self = this;
      switch (state) {
        case "detail":
          this.$vb.plugin.openLayer(
            sysUserDetail,
            this,
            { colNum: "one-col", userid: userid[0] },
            "系统用户详情",
            420,
            330
          );
          break;
        case "add":
          this.$vb.plugin.openLayer(
            sysUserEdit,
            this,
            { state: state, userid: userid[0] },
            "系统用户增加",
            670,
            460
          );
          break;
        case "update":
          this.$vb.plugin.openLayer(
            sysUserEdit,
            this,
            { state: state, userid: userid[0] },
            "系统用户变动",
            670,
            460
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
                .relieveFreezeUserInfo({ userid: userid[0] })
                .then(res => {
                  if (lodash.isEqual(res.code, "success")) {
                    this.$layer.msg(res.msg);
                    this.search();
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
                .relieveDeFriendUserInfo({ userid: userid[0] })
                .then(res => {
                  if (lodash.isEqual(res.code, "success")) {
                    this.$layer.msg(res.msg);
                    this.search();
                  } else {
                    this.$vb.plugin.message.error(res.msg);
                  }
                });
            })
            .catch(() => {});
          break;
        case "freeze":
          this.$confirm("此操作将冻结该用户, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "primary"
          })
            .then(() => {
              self.$api.sysUserInfoAPI
                .freezeUserInfo({ userid: userid[0] })
                .then(res => {
                  if (lodash.isEqual(res.code, "success")) {
                    this.$layer.msg(res.msg);
                    this.search();
                  } else {
                    this.$vb.plugin.message.error(res.msg);
                  }
                });
            })
            .catch(() => {});
          break;
        case "block":
          this.$confirm("此操作将拉黑该用户, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "primary"
          })
            .then(() => {
              self.$api.sysUserInfoAPI
                .deFriendUserInfo({ userid: userid[0] })
                .then(res => {
                  if (lodash.isEqual(res.code, "success")) {
                    this.$layer.msg(res.msg);
                    this.search();
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
      this.handleClick("detail", row.userid);
    }
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
