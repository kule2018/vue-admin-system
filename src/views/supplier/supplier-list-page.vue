<template>
  <div>
    <div id="supplierListPanel">
      <div class="table-panel">
        <div class="search-bar" @keydown.enter="search(1)">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入名称"
            size="small"
            clearable
          />
          <el-button
            type="primary"
            icon="el-icon-search"
            size="small"
            @click="search(1)"
            >查询</el-button
          >
          <el-button
            type="primary"
            plain
            size="small"
            @click="handleClick(3, '')"
            >新增</el-button
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
          <el-table-column label="建立时间">
            <template slot-scope="scope">
              {{ scope.row.establTime | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="注册资金">
            <template slot-scope="scope">
              {{ scope.row.registerCapital | formatMoney }}
            </template>
          </el-table-column>
          <el-table-column prop="scopeBusine" label="经营范围" />
          <el-table-column prop="companyAddress" label="公司地址" />
          <el-table-column prop="mobilePhone" label="手机" />
          <el-table-column prop="supplierStatusName" label="状态" />
          <el-table-column prop="acName" label="审核状态" />
          <el-table-column fixed="right" width="275" label="操作">
            <template slot-scope="scope">
              <el-button
                v-if="+scope.row.statusCode === 61"
                @click.stop="handleClick(4, scope.row)"
                type="primary"
                size="mini"
                >变动</el-button
              >
              <el-button
                v-if="
                  (+$store.state.userInfo.roleTypeId === 150 ||
                    +$store.state.userInfo.roleTypeId === 300) &&
                    +scope.row.acId === 10050
                "
                @click.stop="handleClick(7, scope.row)"
                type="primary"
                size="mini"
                >处理</el-button
              >
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
                @click.stop="handleClick(5, scope.row)"
                type="primary"
                size="mini"
                >解除冻结</el-button
              >
              <el-button
                v-if="+scope.row.statusCode === 81"
                @click.stop="handleClick(6, scope.row)"
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
import supplierListDetails from "@/views/supplier/supplier-list-details-page";
import supplierListEditPage from "@/views/supplier/supplier-list-edit-page";
import format from "@/utils/format";

export default {
  name: "supplier-list-page",
  data() {
    return {
      searchForm: {
        name: "",
        pageNum: 1,
        pageSize: 10
      },
      tabActiveName: "all",
      tableData: [],
      isLoading: false,
      total: 0
    };
  },
  filters: {
    formatDate(date) {
      return format.formatDate(date, "yyyy-MM-dd");
    },
    formatMoney(money) {
      return format.formatMoney(money, 2, "￥");
    }
  },
  mounted() {
    this.search();
  },
  methods: {
    search(...state) {
      if (state[0] === 1) {
        this.searchForm.pageNum = 1;
      }
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
            { supplierId: val[0].supplierId, colNum: "two-col" },
            "供应商详情",
            800,
            "80%",
            function() {}
          );
          break;
        case 7:
          // 处理
          this.$vb.plugin.openLayer(
            supplierListDetails,
            this,
            { supplierId: val[0].supplierId, colNum: "two-col", state: "todo" },
            "供应商详情",
            800,
            "80%",
            function() {}
          );
          break;
        // 新增
        case 3:
          this.$vb.plugin.openLayer(
            supplierListEditPage,
            this,
            { state: "add" },
            "供应商增加",
            800,
            "80%",
            function() {}
          );
          break;
        // 变动
        case 4:
          this.$vb.plugin.openLayer(
            supplierListEditPage,
            this,
            { state: "update", supplierId: val[0].supplierId },
            "供应商变动",
            800,
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
      switch (val) {
        // 全部
        case "all":
          this.search();
          break;
        // 查询冻结
        case "freeze":
          this.isLoading = true;
          this.$api.supplierManageAPI.queryFreezeSuppliers().then(res => {
            if (lodash.isEqual(res.code, "success")) {
              this.total = res.total;
              this.tableData = res.data;
              this.isLoading = false;
            } else {
              this.$vb.plugin.message.error(res.msg);
            }
          });
          break;
        // 查询拉黑
        case "blacklist":
          this.isLoading = true;
          this.$api.supplierManageAPI.queryPullBlackSuppliers().then(res => {
            if (lodash.isEqual(res.code, "success")) {
              this.total = res.total;
              this.tableData = res.data;
              this.isLoading = false;
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
@import "~@/assets/scss/supplier-list-page.scss";
</style>
