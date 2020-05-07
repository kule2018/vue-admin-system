<template>
  <div id="layerContent" class="sys-bulletin-edit" v-loading="loading">
    <div class="content-panel">
      <div class="main-content">
        <el-form :model="form" :rules="rules" ref="form" label-width="80px">
          <el-form-item label="活动封面" prop="coverFigurePath">
            <el-image
              :class="{ hide: !coverFigure }"
              :src="coverFigure"
              :preview-src-list="[coverFigure]"
              class="avatar"
            >
            </el-image>
            <el-upload
              class="avatar-uploader"
              :class="{ hide: coverFigure }"
              :action="baseUrl + '/common/upload'"
              :show-file-list="false"
              :on-success="operateSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <i
                class="el-icon-plus avatar-uploader-icon"
                ref="uploadFile1"
              ></i>
            </el-upload>
            <el-button size="mini" plain @click="$refs.uploadFile1.click()"
              >上传</el-button
            >
          </el-form-item>
          <el-form-item label="活动标题" prop="title">
            <el-input
              v-model="form.title"
              placeholder="请输入活动标题"
              size="small"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker
              v-model="form.startTime"
              type="datetime"
              placeholder="请选择开始时间"
              size="small"
              clearable
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker
              v-model="form.endTime"
              type="datetime"
              placeholder="请选择结束时间"
              size="small"
              :picker-options="endTimeOpt"
              :disabled="!form.startTime && !form.endTime"
              clearable
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="活动详情" prop="detailContent">
            <tinymce-editor
              v-if="isLoaded"
              ref="editor"
              v-model="form.detailContent"
              :value="form.detailContent"
              placeholder="请输入活动详情"
              :height="260"
            />
          </el-form-item>
        </el-form>
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
import base from "@/api/base";
import TinymceEditor from "@/components/TinymceEditor";

export default {
  name: "sys-bulletin-edit",
  components: { TinymceEditor },
  data() {
    return {
      form: {
        coverFigurePath: "",
        title: "",
        startTime: "",
        endTime: "",
        detailContent: ""
      },
      rules: {
        coverFigurePath: [{ required: true, message: "请上传活动封面" }],
        title: [{ required: true, message: "请输入活动标题", trigger: "blur" }],
        startTime: [
          { required: true, message: "请选择开始时间", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "请选择结束时间", trigger: "blur" }
        ],
        detailContent: [{ required: true, message: "请输入活动内容" }]
      },
      endTimeOpt: {
        disabledDate: time => {
          if (this.form.startTime) {
            return time.getTime() < this.form.startTime;
          }
        }
      },
      coverFigure: "",
      baseUrl: "",
      isLoaded: false,
      loading: false
    };
  },
  methods: {
    onSubmit() {
      this.form.startTime = this.$vb.format.formatDate(
        this.form.startTime,
        "yyyy-MM-dd hh:mm:ss"
      );
      this.form.endTime = this.$vb.format.formatDate(
        this.form.endTime,
        "yyyy-MM-dd hh:mm:ss"
      );
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.parentData.state === "add") {
            this.$api.sysSalesManageAPI.addSysSales(this.form).then(res => {
              if (_.isEqual(res.code, "success")) {
                this.$layer.msg(res.msg);
                this.$parent.search();
                this.$layer.close(this.layerid);
              } else {
                this.$vb.plugin.message.error("失败", res.msg);
              }
            });
          } else {
            this.$api.sysSalesManageAPI.updateSysSales(this.form).then(res => {
              if (_.isEqual(res.code, "success")) {
                this.$layer.msg(res.msg);
                this.$parent.search();
                this.$layer.close(this.layerid);
              } else {
                this.$vb.plugin.message.error("失败", res.msg);
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    // 营业执照上传回调
    operateSuccess(res, file) {
      // 营业执照许可证
      this.coverFigure = URL.createObjectURL(file.raw);
      this.form.coverFigurePath = res.data.path;
      console.log(this.coverFigure);
    },
    beforeAvatarUpload(file) {
      const isJPGorPNG =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPGorPNG) {
        this.$message.error("上传的图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传的图片大小不能超过 2MB!");
      }
      return isJPGorPNG && isLt2M;
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
  },
  mounted() {
    const self = this;
    this.$nextTick(() => {
      self.isLoaded = true;
    });
    this.baseUrl = base.defaultBaseUrl;
    if (this.parentData.state === "update") {
      this.loading = true;
      this.$api.sysSalesManageAPI
        .getSysSalesInfo({
          salesPromotionId: this.parentData.salesPromotionId
        })
        .then(res => {
          res.data.startTime = new Date(res.data.startTime);
          res.data.endTime = new Date(res.data.endTime);
          this.coverFigure = this.baseUrl + res.data.coverFigurePath;
          Object.assign(this.form, res.data);
          self.isLoaded = false;
          this.$nextTick(() => {
            self.loading = false;
            self.isLoaded = true;
          });
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/sys-sales-edit.scss";
</style>
