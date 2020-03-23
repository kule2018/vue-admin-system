<!--商品类别编辑-->
<template>
  <div id="layerContent" class="sys-user-edit">
    <div class="content-panel">
      <div class="main-content">
        <el-form ref="form" :model="form" :rules="rules" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="类别图" prop="icon">
                <el-image
                  :class="{ hide: !form.icon }"
                  :src="iconPathAndBase"
                  :preview-src-list="[iconPathAndBase]"
                  class="avatar"
                >
                </el-image>
                <el-upload
                  class="avatar-uploader"
                  :class="{ hide: form.icon }"
                  action="http://172.16.0.110/common/upload"
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                  :before-upload="beforeUpload"
                >
                  <i
                    class="el-icon-plus avatar-uploader-icon"
                    ref="uploadFile"
                  ></i>
                </el-upload>
                <el-button size="mini" plain @click="$refs.uploadFile.click()"
                  >上传</el-button
                >
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序号" prop="sortNumber">
                <el-input
                  v-model="form.sortNumber"
                  size="small"
                  placeholder="排序号"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="分类" prop="classifyName">
                <el-select
                  v-model="form.classifyName"
                  placeholder="请选择"
                  @change="dropDownReply(0)"
                  value=""
                >
                  <el-option
                    v-for="(item, index) in productCategoryDropDownList"
                    :key="index"
                    :label="item.name"
                    :value="item.classifyId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="类别名" prop="name">
                <el-input
                  v-model="form.name"
                  size="small"
                  placeholder="请输入类别名"
                />
              </el-form-item>
            </el-col>
          </el-row>
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
import base from "@/api/base";

export default {
  name: "commodity-category-edit-page",
  data() {
    return {
      form: {
        // 商品分类id
        classifyId: "",
        // 商品分类名
        classifyName: "",
        // 类别id
        categoryId: "",
        // 类别名
        name: "",
        // 排序号
        sortNumber: "",
        // 类别图
        icon: ""
      },
      // 商品分类下拉列表
      productCategoryDropDownList: [],
      // 类别下拉列表
      categoryDropDownList: [],
      rules: {
        classifyName: [{ required: true, message: "请选择分类" }],
        name: [{ required: true, message: "请输入类别名", trigger: "blur" }],
        icon: [{ required: true, message: "请上传类别图" }]
      },
      // 提交状态
      submissionStatus: false
    };
  },
  methods: {
    onSubmit() {
      // 表单验证
      this.$refs.form.validate(valid => {
        this.submissionStatus = true;
        if (valid) {
          if (this.parentData.state === "add") {
            this.$api.commodityCategoryMangeAPI
              .addCommodityCategory(this.form)
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
                  // 关闭弹层
                  this.$layer.close(this.layerid);
                  this.$vb.plugin.message.error("商品分类新增失败");
                }
              });
          } else {
            this.$api.commodityCategoryMangeAPI
              .changeCommodityCategory(this.form)
              .then(res => {
                if (lodash.isEqual(res.code, "success")) {
                  this.submissionStatus = false;
                  this.$vb.plugin.showMsg("变动成功");
                  // 刷新父页面
                  this.$parent.search();
                  // 关闭弹层
                  this.$layer.close(this.layerid);
                } else {
                  // 关闭弹层
                  this.$layer.close(this.layerid);
                  this.$vb.plugin.message.error("商品分类变动失败");
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
    // 下拉响应
    dropDownReply(status) {
      switch (status) {
        case 0:
          this.productCategoryDropDownList.find(item => {
            if (lodash.isEqual(this.form.classifyName, item.classifyId)) {
              this.form.classifyName = item.name;
              this.form.classifyId = item.classifyId;
            }
          });
          break;
        case 1:
          break;
        default:
          break;
      }
    },
    cancel() {
      this.$layer.close(this.layerid);
    },
    // eslint-disable-next-line no-unused-vars
    uploadSuccess(res) {
      this.form.icon = res.data.path;
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  computed: {
    iconPathAndBase() {
      return base.defaultBaseUrl + this.form.icon;
    }
  },
  mounted() {
    if (this.parentData.state === "update") {
      this.$api.commodityCategoryMangeAPI
        .getCommodityCategoryList({
          classifyId: this.parentData.classifyId
        })
        .then(res => {
          if (lodash.isEqual(res.code, "success")) {
            // 类别默认值
            this.form.name = this.parentData.name;
            // 类别id
            this.form.categoryId = this.parentData.categoryId;
            // 排序号
            this.form.sortNumber = this.parentData.sortNumber;
            // 类别名图
            this.form.icon = this.parentData.icon;
          } else {
            this.$vb.plugin.message.error("获取商品类别失败");
          }
        });
    }
    // 获取商品分类列表
    this.$api.commodityClassifyMangeAPI
      .getCommodityClassifyList({ classifyId: this.parentData.classifyId })
      .then(res => {
        if (lodash.isEqual(res.code, "success")) {
          this.productCategoryDropDownList = res.data;
          // 商品分类默认值
          this.form.classifyName = this.parentData.classifyName;
          this.form.classifyId = this.parentData.classifyId;
        } else {
          this.$message.error(`商品分类类表获取失败:${res.code}`);
        }
      });
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
@import "~@/assets/scss/commodity-category-edit-page";
</style>
