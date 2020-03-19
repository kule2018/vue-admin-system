<template>
  <div>
    <div id="supplierListPanel">
      <div class="table-panel">
        <div class="search-bar">
          <el-input
            v-model="searchForm.name"
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
          <el-button
            type="primary"
            plain
            size="small"
            @click="handleClick(3, '')"
            >增加</el-button
          >
        </div>
        <el-tabs v-model="tabActiveName" @tab-click="tabsClick(tabActiveName)">
          <el-tab-pane label="全部" name="all" />
          <el-tab-pane label="冻结" name="freeze" />
          <el-tab-pane label="黑名单" name="blacklist" />
        </el-tabs>
        <el-table
          :data="tableData"
          style="width: 100%"
          @row-click="openDetails"
          v-loading.fullscreen="isLoading"
        >
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="establTime" label="建立时间" />
          <el-table-column prop="registerCapital" label="注册资金" />
          <el-table-column prop="scopeBusine" label="经营范围" />
          <el-table-column prop="companyAddress" label="公司地址" />
          <el-table-column prop="mobilePhone" label="手机" />
          <el-table-column fixed="right" width="360" label="操作">
            <template slot-scope="scope">
              <el-button
                @click.stop="handleClick(4, scope.row)"
                type="primary"
                size="mini"
                >编辑</el-button
              >
              <el-button
                v-if="scope.row.statusCode === 71"
                @click.stop="handleClick(5, scope.row)"
                type="primary"
                size="mini"
                >解除冻结</el-button
              >
              <el-button
                v-if="scope.row.statusCode !== 71"
                @click.stop="handleClick(1, scope.row)"
                type="primary"
                size="mini"
                >冻结</el-button
              >
              <el-button
                v-if="scope.row.statusCode === 81"
                @click.stop="handleClick(6, scope.row)"
                type="primary"
                size="mini"
                >解除拉黑</el-button
              >
              <el-button
                v-if="scope.row.statusCode !== 81"
                @click.stop="handleClick(2, scope.row)"
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
          :current-page="searchForm.pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="searchForm.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
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
import supplierListEditPage from "@/views/supplier-list-edit-page";

export default {
  name: "supplier-list-page",
  data() {
    return {
      searchForm: {
        name: "",
        pageNum: 1,
        pageSize: 5
      },
      tabActiveName: "all",
      tableData: [],
      isLoading: false,
      total: 0
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    search() {
      this.isLoading = true;
      this.$api.supplierManageAPI.getSupplierList(this.searchForm).then(res => {
        if (lodash.isEqual(res.code, "success")) {
          this.total = res.total;
          this.tableData = res.data;
          this.isLoading = false;
        } else {
          this.$vb.plugin.message.error(res.msg);
        }
      });
    },
    handleClick(status, ...val) {
      switch (status) {
        case 0:
          // 查看
          this.$vb.plugin.openLayer(
            supplierListDetails,
            this,
            { supplierId: val[0].supplierId, colNum: "one-col" },
            "查看供应商信息",
            "800",
            "80%",
            function() {}
          );
          break;
        case 1:
          // 冻结
          this.$confirm("此操作将冻结该供应商, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$api.supplierManageAPI
                .freezeSupplierInfo({ supplierId: val[0].supplierId })
                .then(res => {
                  if (lodash.isEqual(res.code, "success")) {
                    this.$vb.plugin.message.success(res.msg);
                    // 刷新列表
                    this.tabActiveName = "freeze";
                    this.tabsClick("freeze");
                  } else {
                    this.$vb.plugin.message.error(res.msg);
                  }
                });
            })
            .catch(() => {});
          break;
        case 2:
          // 拉黑
          this.$confirm("此操作将拉黑该供应商, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$api.supplierManageAPI
                .defriendSupplierInfo({ supplierId: val[0].supplierId })
                .then(res => {
                  if (lodash.isEqual(res.code, "success")) {
                    this.$vb.plugin.message.success(res.msg);
                    this.tabActiveName = "blacklist";
                    // 刷新列表
                    this.tabsClick("blacklist");
                  } else {
                    this.$vb.plugin.message.error(res.msg);
                  }
                });
            })
            .catch(() => {});
          break;
        // 增加
        case 3:
          this.$vb.plugin.openLayer(
            supplierListEditPage,
            this,
            { state: "add" },
            "新增供应商",
            960,
            "80%",
            function() {}
          );
          break;
        // 编辑
        case 4:
          this.$vb.plugin.openLayer(
            supplierListEditPage,
            this,
            { state: "update", supplierId: val[0].supplierId },
            "编辑供应商",
            960,
            "80%",
            function() {}
          );
          break;
        // 解除冻结
        case 5:
          this.$confirm("此操作将解除该供应商的冻结状态, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$api.supplierManageAPI
                .relieveFreezeSupplierInfo({ supplierId: val[0].supplierId })
                .then(res => {
                  if (lodash.isEqual(res.code, "success")) {
                    this.$vb.plugin.message.success(res.msg);
                    // 刷新列表
                    this.tabsClick(this.tabActiveName);
                  } else {
                    this.$vb.plugin.message.error(res.msg);
                  }
                });
            })
            .catch(() => {});
          break;
        // 解除拉黑
        case 6:
          this.$confirm(
            "此操作将会把当前供应商从黑名单中移除, 是否继续?",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          )
            .then(() => {
              this.$api.supplierManageAPI
                .relieveRelieveSupplierInfo({ supplierId: val[0].supplierId })
                .then(res => {
                  if (lodash.isEqual(res.code, "success")) {
                    this.$vb.plugin.message.success(res.msg);
                    // 刷新列表
                    this.tabsClick(this.tabActiveName);
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
    tabsClick(val) {
      console.log(val);
      switch (val) {
        // 全部
        case "all":
          this.search();
          break;
        // 查询冻结
        case "freeze":
          this.$api.supplierManageAPI.queryFreezeSuppliers().then(res => {
            if (lodash.isEqual(res.code, "success")) {
              this.tableData = res.data;
            } else {
              this.$vb.plugin.message.error(res.msg);
            }
          });
          break;
        // 查询拉黑
        case "blacklist":
          this.$api.supplierManageAPI.queryPullBlackSuppliers().then(res => {
            if (lodash.isEqual(res.code, "success")) {
              this.tableData = res.data;
            } else {
              this.$vb.plugin.message.error(res.msg);
            }
          });
          break;
        default:
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
      this.handleClick(0, row);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/supplier-list-page";
</style>
