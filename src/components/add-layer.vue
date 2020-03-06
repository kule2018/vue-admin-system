<template>
  <div id="layerContent">
    <!--表单组件-->
    <div class="content-panel">
      <div class="main-content">
        <component :is="content" />
      </div>
    </div>
    <!--按钮部分-->
    <div class="btn-panel">
      <div class="main-content">
        <el-button @click="cancel">取消</el-button>
        <el-button @click="onSubmit" type="primary" :loading="submissionStatus"
          >确认</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-layer",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      submissionStatus: false
    };
  },
  methods: {
    onSubmit() {
      this.submissionStatus = true;
      setTimeout(() => {
        this.$layer.msg("提交成功");
        this.$layer.close(this.layerid);
      }, 700);
    },
    cancel() {
      this.$layer.close(this.layerid);
    }
  },
  props: {
    info: {
      // 父组件传的数据
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
@import "~@/assets/scss/add-layer.scss";
</style>
