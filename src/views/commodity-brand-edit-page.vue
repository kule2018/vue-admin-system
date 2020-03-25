<!--商品分类编辑页面-->
<template>
  <div id="layerContent" class="sys-user-edit">
    <div class="content-panel">
      <div class="main-content">
        <el-form ref="form" :model="form" :rules="rules" label-width="130px">
          <el-form-item label="品牌名" prop="brandName">
            <el-input
              v-model="form.brandName"
              size="small"
              placeholder="请输入品牌名"
            />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="btn-panel">
      <div class="main-content">
        <el-button @click="cancel" size="small">取消</el-button>
        <el-button
          type="primary"
          @click="onSubmit"
          size="small"
          :loading="submissionStatus"
          >确定</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import lodash from "lodash";
export default {
  name: "commodity-classify-edit-page",
  data() {
    return {
      form: {
        // 类别名
        brandName: "",
        // 排序号
        brandId: ""
      },
      rules: {
        brandName: [
          { required: true, message: "请输入品牌名", trigger: "blur" }
        ]
      },
      // 提交状态
      submissionStatus: false
    };
  },
  mounted() {
    this.form.brandId = this.parentData.brandId;
    this.form.brandName = this.parentData.brandName;
  },
  methods: {
    onSubmit() {
      // 表单验证
      this.$refs.form.validate(valid => {
        this.submissionStatus = true;
        if (valid) {
          if (this.parentData.state === "add") {
            this.$api.commodityBrandMangeAPI
              .addCommodityBrand(this.form)
              .then(res => {
                this.submissionStatus = false;
                if (lodash.isEqual(res.code, "success")) {
                  this.submissionStatus = false;
                  this.$vb.plugin.showMsg("新增成功");
                  // 刷新父页面
                  this.$parent.search();
                  // 关闭弹层
                  this.$layer.close(this.layerid);
                } else {
                  this.$vb.plugin.message.error("商品品牌新增失败");
                }
              });
          } else {
            this.$api.commodityBrandMangeAPI
              .changeCommodityBrand(this.form)
              .then(res => {
                if (lodash.isEqual(res.code, "success")) {
                  this.submissionStatus = false;
                  this.$vb.plugin.showMsg("变动成功");
                  // 刷新父页面
                  this.$parent.search();
                  // 关闭弹层
                  this.$layer.close(this.layerid);
                } else {
                  this.$vb.plugin.message.error("商品品牌变动失败");
                }
              });
            this.submissionStatus = false;
          }
        } else {
          // 验证不通过
          this.submissionStatus = false;
          return false;
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

<style scoped lang="scss">
@import "~@/assets/scss/commodity-classify-edit-page";
</style>
