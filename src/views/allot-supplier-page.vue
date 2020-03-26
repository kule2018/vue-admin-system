<template>
  <div id="layerContent">
    <div class="content-panel">
      <div class="main-content">
        <el-select
          v-model="form.supplierName"
          value=""
          placeholder="请选择供应商"
        >
          <el-option
            v-for="(item, index) in supplierList"
            :key="index"
            :label="item.name"
            :value="item.supplierId"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="btn-panel">
      <div class="main-content">
        <el-button @click="cancel" size="small">取消</el-button>
        <el-button type="primary" @click="onSubmit" size="small"
          >确定
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      form: {
        supplierName: "",
        supplierId: ""
      },
      supplierList: []
    };
  },
  mounted() {
    this.$api.supplierManageAPI.getSupplierList().then(res => {
      console.log(res);
      this.supplierList = res.data;
    });
  },
  methods: {
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

<style scoped lang="scss"></style>
