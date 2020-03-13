<template>
  <div id="userListPanel">
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
        <el-button plain icon="el-icon-refresh-left" size="small"
          >重置</el-button
        >
      </div>
      <el-tabs v-model="tabActiveName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all" />
        <el-tab-pane label="冻结" name="freeze" />
        <el-tab-pane label="黑名单" name="blacklist" />
      </el-tabs>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="用户头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatarUrl" width="40" height="40" />
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" />
        <el-table-column prop="gender" label="性别" />
        <el-table-column prop="province" label="省" />
        <el-table-column fixed="right" width="280" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(0, scope.row)"
              type="primary"
              size="mini"
              >查看</el-button
            >
            <el-button
              @click="handleClick(1, scope.row)"
              type="primary"
              size="mini"
              >冻结</el-button
            >
            <el-button
              @click="handleClick(2, scope.row)"
              type="primary"
              size="mini"
              >拉黑</el-button
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
  </div>
</template>

<script>
import lodash from "lodash";
import userListDetails from "@/views/user-list-details-page";
export default {
  name: "user-list-page",
  data() {
    return {
      searchParam: "",
      tabActiveName: "all",
      tableData: [],
      currentPage: 1
    };
  },
  created() {
    // 跨域测试
    this.$api.websiteManageAPI.testMock({}).then(res => {
      console.log(res);
    });
    this.$api.weChatUserInfoAPI.getUserInfoList().then(res => {
      if (lodash.isEqual(res.code, "success")) {
        this.tableData = res.data;
      } else {
        this.$vb.plugin.message.error(`获取用户列表失败,${res.code}`);
      }
    });
  },
  methods: {
    search() {
      this.$api.weChatUserInfoAPI
        .getUserInfoList({
          nickName: this.searchParam
        })
        .then(res => {
          if (lodash.isEqual(res.code, "success")) {
            this.tableData = res.data;
          } else {
            this.$vb.plugin.message.error(res.msg);
          }
        });
    },
    handleClick(status, val) {
      switch (status) {
        case 0:
          // 查看
          this.$vb.plugin.openLayer(
            userListDetails,
            this,
            { personId: val.personId, colNum: "one-col" },
            "查看用户信息",
            "580",
            "330",
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
                .freezeUserInfo({ personId: val.personId })
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
                .defriendUserInfo({ personId: val.personId })
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
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/user-list-page.scss";
</style>
