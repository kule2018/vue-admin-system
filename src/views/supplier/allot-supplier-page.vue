<template>
  <div id="layerContent">
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
      </div>
      <el-table
        :data="supplierList"
        style="width: 100%"
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
        <el-table-column fixed="right" width="210" label="操作">
          <template slot-scope="scope">
            <el-button
              @click.stop="handleClick(scope.row)"
              type="primary"
              size="mini"
              >选择</el-button
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
</template>

<script>
import _ from "lodash";
import format from "@/utils/format";

export default {
  data() {
    return {
      searchForm: {
        name: "",
        pageNum: 1,
        pageSize: 10
      },
      form: {
        supplierName: "",
        supplierId: ""
      },
      supplierList: [],
      total: 0,
      isLoading: false
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
      this.$api.supplierManageAPI.allotSupplier(this.searchForm).then(res => {
        this.isLoading = false;
        this.supplierList = res.data;
        this.total = res.total;
      });
    },
    onSubmit() {
      this.form.supplierId = this.form.supplierName;
      this.form.orderId = this.parentData.order.orderId;
      this.$api.orderManageAPI.allotSupplierToOrder(this.form).then(res => {
        if (_.isEqual(res.code, "success")) {
          this.$layer.msg(res.msg);
          this.$parent.search();
          this.$layer.close(this.layerid);
        } else {
          self.$vb.plugin.message.error("失败", res.msg);
        }
      });
    },
    cancel() {
      this.$layer.close(this.layerid);
    },
    handleClick(row) {
      console.log(row);
      let orderFormData = {
        orderId: this.parentData.orderId,
        supplierId: row.supplierId
      };
      switch (this.parentData.state) {
        case "user":
          this.$parent.defaultSupplierId = row.supplierId;
          this.$parent.supplierName = row.name;
          this.$layer.close(this.layerid);
          break;
        case "order":
          this.$api.orderManageAPI
            .allotSupplierToOrder(orderFormData)
            .then(res => {
              if (_.isEqual(res.code, "success")) {
                this.$layer.msg(res.msg);
                this.$parent.search();
                this.$layer.close(this.layerid);
              } else {
                this.$vb.plugin.message.error("失败", res.msg);
              }
            });
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
    }
  },
  props: {
    // 父组件传的数据
    parentData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    layerid: {
      // 当前弹层id，用于关闭弹层
      type: String,
      default: ""
    },
    lydata: {
      // 该值为父组件data的浅拷贝,更改父窗口传递的数据的时候，可以直接使用lydata来修改
      type: Object,
      default: () => {
        return {};
      }
    },
    content: {}
  }
};
</script>

<style scoped lang="scss">
.table-panel {
  padding: 0 10px;
}
</style>
