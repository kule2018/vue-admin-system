<template>
  <div id="layerContent" class="sys-bulletin-edit" v-loading="loading">
    <div class="content-panel">
      <div class="main-content">
        <el-form :model="form" :rules="rules" ref="form" label-width="80px">
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
          <el-form-item label="公告内容" prop="content">
            <el-input
              v-model="form.content"
              type="textarea"
              rows="4"
              resize="none"
              placeholder="请输入公告内容"
              size="small"
              clearable
            ></el-input>
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

export default {
  name: "sys-bulletin-edit",
  data() {
    return {
      form: {
        startTime: "",
        endTime: "",
        content: ""
      },
      rules: {
        startTime: [
          { required: true, message: "请选择开始时间", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "请选择结束时间", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请输入公告内容", trigger: "blur" }
        ]
      },
      endTimeOpt: {
        disabledDate: time => {
          if (this.form.startTime) {
            return time.getTime() < this.form.startTime;
          }
        }
      },
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
            this.$api.sysBulletinBoardManageAPI
              .addSysBulletin(this.form)
              .then(res => {
                if (_.isEqual(res.code, "success")) {
                  this.$layer.msg(res.msg);
                  this.$parent.search();
                  this.$layer.close(this.layerid);
                } else {
                  this.$vb.plugin.message.error("失败", res.msg);
                }
              });
          } else {
            this.$api.sysBulletinBoardManageAPI
              .updateSysBulletin(this.form)
              .then(res => {
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
    if (this.parentData.state === "update") {
      this.loading = true;
      this.$api.sysBulletinBoardManageAPI
        .getSysBulletinInfo({
          bulletinBoardId: this.parentData.bulletinBoardId
        })
        .then(res => {
          res.data.startTime = new Date(res.data.startTime);
          res.data.endTime = new Date(res.data.endTime);
          Object.assign(this.form, res.data);
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/sys-user-edit.scss";
</style>
