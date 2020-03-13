<template>
  <div>
    <div id="supplierListPanel">
      <div class="table-panel">
        <div class="search-bar">
          <el-input
            v-model="searchParam"
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
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="establTime" label="建立时间" />
          <el-table-column prop="registerCapital" label="注册资金" />
          <el-table-column prop="scopeBusine" label="经营范围" />
          <el-table-column prop="companyAddress" label="公司地址" />
          <el-table-column prop="mobilePhone" label="手机" />
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
  </div>
</template>

<script>
import lodash from "lodash";
import supplierListDetails from "@/views/supplier-list-details-page";

export default {
  name: "supplier-list-page",
  data() {
    return {
      searchParam: "",
      tabActiveName: "all",
      tableData: [],
      currentPage: 1
    };
  },
  created() {
    this.$api.supplierManageAPI.getSupplierList().then(res => {
      if (lodash.isEqual(res.code, "success")) {
        this.tableData = res.data;
      } else {
        this.$vb.plugin.message.error(`获取供应商列表失败,${res.code}`);
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
            supplierListDetails,
            this,
            { personId: val.personId, colNum: "one-col" },
            "查看供应商信息",
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
@import "~@/assets/scss/supplier-list-page";
</style>
