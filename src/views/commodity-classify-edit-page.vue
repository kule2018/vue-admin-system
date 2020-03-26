<!--商品分类编辑页面-->
<template>
  <div id="layerContent" class="sys-user-edit">
    <div class="content-panel">
      <div class="main-content">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="类别名" prop="name">
                <el-input
                  v-model="form.name"
                  size="small"
                  placeholder="请输入类别名"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序号" prop="sortNumber">
                <el-input
                  v-model="form.sortNumber"
                  size="small"
                  placeholder="请输入排序号"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
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
import base from "@/api/base";
import lodash from "lodash";
export default {
  name: "commodity-classify-edit-page",
  data() {
    return {
      form: {
        // 类别名
        name: "",
        // 类别图
        icon: "",
        // 排序号
        sortNumber: ""
      },
      rules: {
        name: [{ required: true, message: "请输入类别名", trigger: "blur" }],
        sortNumber: [
          { required: true, message: "请输入排序号", trigger: "blur" }
        ],
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
            this.$api.commodityClassifyMangeAPI
              .addCommodityClassifyInfo(this.form)
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
                  this.$vb.plugin.message.error("商品分类新增失败");
                }
              });
          } else {
            this.$api.commodityClassifyMangeAPI
              .changeCommodityClassifyInfo(this.form)
              .then(res => {
                if (lodash.isEqual(res.code, "success")) {
                  this.submissionStatus = false;
                  this.$vb.plugin.showMsg("变动成功");
                  // 刷新父页面
                  this.$parent.search();
                  // 关闭弹层
                  this.$layer.close(this.layerid);
                } else {
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
      this.$api.commodityClassifyMangeAPI
        .getCommodityClassifyList({
          name: this.parentData.name
        })
        .then(res => {
          if (lodash.isEqual(res.code, "success")) {
            this.form = res.data[0];
          } else {
            this.$vb.plugin.message.error("获取商品类别失败");
          }
        });
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
