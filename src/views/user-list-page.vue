<template>
  <div id="userListPanel">
    <div class="table-panel">
      <div class="search-bar" @keydown.enter="search">
        <el-input
          v-model="searchForm.nickName"
          placeholder="请输入昵称"
          size="small"
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="search"
          >查询</el-button
        >
      </div>
      <el-tabs v-model="tabActiveName" @tab-click="handleTabClick">
        <el-tab-pane label="全部" name="all" />
        <el-tab-pane label="冻结" name="freeze" />
        <el-tab-pane label="黑名单" name="block" />
      </el-tabs>
      <el-table
        :data="tableData"
        style="width: 100%"
        @row-click="openDetails"
        v-loading.fullscreen="isLoading"
      >
        <el-table-column label="头像" width="120" align="center">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.avatarUrl" />
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" />
        <el-table-column prop="gender" label="性别" />
        <el-table-column prop="province" label="省" />
        <el-table-column prop="statusName" label="状态" />
        <el-table-column fixed="right" width="150" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="+scope.row.statusCode === 61"
              @click.stop="handleClick(1, scope.row)"
              type="primary"
              size="mini"
              >冻结</el-button
            >
            <el-button
              v-if="+scope.row.statusCode === 61"
              @click.stop="handleClick(2, scope.row)"
              type="primary"
              size="mini"
              >拉黑</el-button
            >
            <el-button
              v-if="+scope.row.statusCode === 71"
              @click.stop="handleClick(3, scope.row)"
              type="primary"
              size="mini"
              >解除冻结</el-button
            >
            <el-button
              v-if="+scope.row.statusCode === 81"
              @click.stop="handleClick(4, scope.row)"
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
  </div>
</template>

<script>
import lodash from "lodash";
import userListDetails from "@/views/user-list-details-page";
export default {
  name: "user-list-page",
  data() {
    return {
      searchForm: {
        nickName: "",
        pageNum: 1,
        pageSize: 10
      },
      tabActiveName: "all",
      tableData: [],
      isLoading: false,
      total: 0
    };
  },
  mounted() {
    // 跨域测试
    this.search();
  },
  methods: {
    search() {
      this.tableData = [];
      this.isLoading = true;
      if (this.tabActiveName === "all") {
        this.$api.weChatUserInfoAPI
          .getUserInfoList({
            nickName: this.searchParam
          })
          .then(res => {
            if (lodash.isEqual(res.code, "success")) {
              this.tableData = res.data;
              this.total = res.total;
              this.isLoading = false;
            } else {
              this.$vb.plugin.message.error(res.msg);
            }
          });
      }
      if (this.tabActiveName === "freeze") {
        this.$api.weChatUserInfoAPI
          .getUserFreezeList({
            nickName: this.searchParam
          })
          .then(res => {
            if (lodash.isEqual(res.code, "success")) {
              this.tableData = res.data;
              this.total = res.total;
              this.isLoading = false;
            } else {
              this.$vb.plugin.message.error(res.msg);
            }
          });
      }
      if (this.tabActiveName === "block") {
        this.$api.weChatUserInfoAPI
          .getUserBlockList({
            nickName: this.searchParam
          })
          .then(res => {
            if (lodash.isEqual(res.code, "success")) {
              this.tableData = res.data;
              this.total = res.total;
              this.isLoading = false;
            } else {
              this.$vb.plugin.message.error(res.msg);
            }
          });
      }
    },
    handleClick(status, ...val) {
      switch (status) {
        case 0:
          // 查看
          this.$vb.plugin.openLayer(
            userListDetails,
            this,
            { personId: val[0].personId, colNum: "one-col" },
            "查看用户信息",
            "800",
            "80%",
            function() {}
          );
          break;
        case 1:
          // 冻结
          this.$confirm("此操作将冻结该用户, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$api.weChatUserInfoAPI
                .freezeUserInfo({ personId: val[0].personId })
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
        case 2:
          // 拉黑
          this.$confirm("此操作将拉黑该用户, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$api.weChatUserInfoAPI
                .defriendUserInfo({ personId: val[0].personId })
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
        case 3:
          // 解冻
          this.$confirm("是否将该用户解冻?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$api.weChatUserInfoAPI
                .unfreezeUser({ personId: val[0].personId })
                .then(res => {
                  if (lodash.isEqual(res.code, "success")) {
                    this.$vb.plugin.message.success(res.msg);
                    this.search();
                  } else {
                    this.$vb.plugin.message.error(res.msg);
                  }
                });
            })
            .catch(() => {});
          break;
        case 4:
          // 移出黑名单
          this.$confirm("是否将该用户移出黑名单?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$api.weChatUserInfoAPI
                .unblockUser({ personId: val[0].personId })
                .then(res => {
                  if (lodash.isEqual(res.code, "success")) {
                    this.$vb.plugin.message.success(res.msg);
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
      this.search();
    },
    handleCurrentChange(page) {
      this.searchForm.pageNum = page;
      this.search();
    },
    openDetails(row) {
      this.handleClick(0, row);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/user-list-page.scss";
</style>
