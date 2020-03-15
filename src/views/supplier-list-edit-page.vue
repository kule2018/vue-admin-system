<template>
  <div id="layerContent" class="sys-user-edit">
    <div class="content-panel">
      <div class="main-content">
        <el-form ref="form" :model="form" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="供应商名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12"
              ><el-form-item label="建立时间">
                <el-date-picker
                  v-model="form.establTime"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker> </el-form-item
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="法人">
                <el-input v-model="form.legalPerson"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="注册资金">
                <el-input v-model="form.registerCapital"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="营业执照号">
                <el-input v-model="form.businessLicenseNumber"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="营业执照电子图">
                <el-input v-model="form.businessLicenseElecChart"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="卫生许可证号">
                <el-input v-model="form.sanitaryPermitNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="卫生许可证电子图">
                <el-input v-model="form.sanitaryPermitElecChart"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="固定电话">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机">
                <el-input v-model="form.mobilePhone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="证件类型">
                <el-input v-model="form.certificateType"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证件号">
                <el-input v-model="form.certificateNumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业性质">
                <el-input v-model="form.enterprisNature"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="经营范围">
                <el-input v-model="form.scopeBusine"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="公司地址">
            <el-input type="textarea" v-model="form.companyAddress"></el-input>
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
          >确定
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "supplier-list-edit-page",
  data() {
    return {
      form: {
        supplierId: "",
        name: "",
        establTime: "",
        registerCapital: "",
        scopeBusine: "",
        enterprisNature: "",
        businessLicenseNumber: "",
        businessLicenseElecChart: "",
        sanitaryPermitNumber: "",
        sanitaryPermitElecChart: "",
        companyAddress: "",
        legalPerson: "",
        certificateType: "",
        certificateNumber: "",
        phone: "",
        mobilePhone: ""
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
@import "~@/assets/scss/supplier-list-edit-page";
</style>
