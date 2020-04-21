<template>
  <div id="layerContent" class="sys-user-edit">
    <div class="content-panel">
      <div class="main-content">
        <el-form
          ref="form"
          :model="form"
          label-width="140px"
          :rules="formRules"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="供应商名称" prop="name">
                <el-input v-model="form.name" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12"
              ><el-form-item label="建立时间" prop="establTime">
                <el-date-picker
                  v-model="form.establTime"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker> </el-form-item
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="法人" prop="legalPerson">
                <el-input v-model="form.legalPerson" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="注册资金" prop="registerCapital">
                <el-input-number
                  v-model="form.registerCapital"
                  :precision="2"
                  :controls="false"
                  clearable
                ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="固定电话" prop="phone">
                <el-input v-model="form.phone" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机" prop="mobilePhone">
                <el-input v-model="form.mobilePhone" maxlength="11" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="证件类型" prop="certificateType">
                <el-select
                  v-model="defaultCertificateType"
                  placeholder="请选择"
                  value=""
                  clearable
                >
                  <el-option
                    v-for="item in options"
                    :key="item.certificateType"
                    :label="item.certificateName"
                    :value="item.certificateType"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证件号" prop="certificateNumber">
                <el-input v-model="form.certificateNumber" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业性质" prop="enterprisNature">
                <el-input v-model="form.enterprisNature" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="经营范围" prop="scopeBusine">
                <el-input v-model="form.scopeBusine" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="公司地址" prop="companyAddress">
            <el-input type="textarea" v-model="form.companyAddress" clearable></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="营业执照号" prop="businessLicenseNumber">
                <el-input v-model="form.businessLicenseNumber" clearable> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="卫生许可证号" prop="sanitaryPermitNumber">
                <el-input v-model="form.sanitaryPermitNumber" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="营业执照电子图"
                prop="businessLicenseElecChart"
              >
                <el-image
                  :class="{ hide: !businessLicense }"
                  :src="businessLicense"
                  :preview-src-list="[businessLicense]"
                  class="avatar"
                >
                </el-image>
                <el-upload
                  class="avatar-uploader"
                  :class="{ hide: businessLicense }"
                  action="http://172.16.0.110/common/upload"
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
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="卫生许可证电子图"
                prop="sanitaryPermitElecChart"
              >
                <el-image
                  :class="{ hide: !healthPermit }"
                  :src="healthPermit"
                  :preview-src-list="[healthPermit]"
                  class="avatar"
                >
                </el-image>
                <el-upload
                  class="avatar-uploader"
                  :class="{ hide: healthPermit }"
                  action="http://172.16.0.110/common/upload"
                  :show-file-list="false"
                  :on-success="healthSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <i
                    class="el-icon-plus avatar-uploader-icon"
                    ref="uploadFile2"
                  ></i>
                </el-upload>
                <el-button size="mini" plain @click="$refs.uploadFile2.click()"
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
          >确定
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import base from "@/api/base";
export default {
  name: "supplier-list-edit-page",
  data() {
    return {
      form: {
        supplierId: "", // 供应商id
        name: "", // 名称
        establTime: "", // 建立时间
        registerCapital: "", // 注册资金
        scopeBusine: "", // 经营范围
        enterprisNature: "", // 企业性质
        businessLicenseNumber: "", // 营业执照号
        businessLicenseElecChart: "", // 营业执照电子图
        sanitaryPermitNumber: "", // 卫生许可证号
        sanitaryPermitElecChart: "", // 卫生许可证电子图
        companyAddress: "", // 公司地址
        legalPerson: "", // 法人
        certificateType: "", // 证件类型
        certificateNumber: "", // 证件号
        phone: "", // 固定电话
        mobilePhone: "" // 手机
      },
      defaultCertificateType: "",
      formRules: {
        name: [{ required: true, message: "请填入名称", trigger: "blur" }],
        establTime: [
          { required: true, message: "请填入建立时间", trigger: "blur" }
        ],
        registerCapital: [
          { required: true, message: "请填入注册资金", trigger: "blur" }
        ],
        scopeBusine: [
          { required: true, message: "请填入经营范围", trigger: "blur" }
        ],
        enterprisNature: [
          { required: true, message: "请填入企业性质", trigger: "blur" }
        ],
        businessLicenseNumber: [
          { required: true, message: "请填入营业执照号", trigger: "blur" }
        ],
        businessLicenseElecChart: [
          { required: true, message: "请上传营业执照电子图" }
        ],
        sanitaryPermitNumber: [
          { required: true, message: "请填入卫生许可证号", trigger: "blur" }
        ],
        sanitaryPermitElecChart: [
          { required: true, message: "请上传卫生许可证电子图" }
        ],
        companyAddress: [
          { required: true, message: "请填入公司地址", trigger: "blur" }
        ],
        legalPerson: [
          { required: true, message: "请填入法人", trigger: "blur" }
        ],
        certificateType: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        certificateNumber: [
          { required: true, message: "请填入证件号", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请填入固定电话", trigger: "blur" }],
        mobilePhone: [
          { required: true, message: "请填入手机", trigger: "blur" }
        ]
      },
      submissionStatus: false,
      imageUrl: "",
      businessLicense: "",
      healthPermit: "",
      options: []
    };
  },
  mounted() {
    this.$api.supplierManageAPI.getCertificateType({}).then(res => {
      this.options = res.data;
    });
    if (_.isEqual(this.parentData.state, "update")) {
      this.$api.supplierManageAPI
        .getSupplierInfo({ supplierId: this.parentData.supplierId })
        .then(res => {
          this.form = res.data;
          this.businessLicense =
            base.defaultBaseUrl + res.data.businessLicenseElecChart;
          this.healthPermit =
            base.defaultBaseUrl + res.data.sanitaryPermitElecChart;
          this.defaultCertificateType = res.data.certificateType;
        });
    }
  },
  watch: {
    defaultCertificateType() {
      this.form.certificateType = this.defaultCertificateType;
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submissionStatus = true;
          if (_.isEqual(this.parentData.state, "add")) {
            this.$api.supplierManageAPI.addSupplierInfo(this.form).then(res => {
              if (_.isEqual(res.code, "success")) {
                this.$layer.msg(res.msg);
                this.$parent.search();
                this.$layer.close(this.layerid);
              } else {
                self.$vb.plugin.message.error("失败", res.msg);
              }
            });
          } else {
            // 更新
            this.form.supplierId = this.parentData.supplierId;
            this.$api.supplierManageAPI
              .updateSupplierInfo(this.form)
              .then(res => {
                if (_.isEqual(res.code, "success")) {
                  this.$layer.msg(res.msg);
                  this.$parent.search();
                  this.$layer.close(this.layerid);
                } else {
                  self.$vb.plugin.message.error("失败", res.msg);
                }
              });
          }
        }
      });
    },
    cancel() {
      this.$layer.close(this.layerid);
    },
    // 营业执照上传回调
    operateSuccess(res, file) {
      // 营业执照许可证
      this.businessLicense = URL.createObjectURL(file.raw);
      this.form.businessLicenseElecChart = res.data.path;
    },
    healthSuccess(res, file) {
      // 卫生许可证
      this.healthPermit = URL.createObjectURL(file.raw);
      this.form.sanitaryPermitElecChart = res.data.path;
    },
    beforeAvatarUpload(file) {
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
@import "~@/assets/scss/supplier-list-edit-page.scss";
</style>
