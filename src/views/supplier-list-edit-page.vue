<template>
  <div id="layerContent" class="sys-user-edit">
    <div class="content-panel">
      <div class="main-content">
        <el-form ref="form" :model="form" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="供应商名称">
                <el-input v-model="form.name" />
              </el-form-item>
            </el-col>
            <el-col :span="12"
              ><el-form-item label="建立时间">
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
                <el-select v-model="form.certificateType" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
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
          <el-row>
            <el-col :span="12">
              <el-form-item label="营业执照号">
                <el-input v-model="form.businessLicenseNumber"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="卫生许可证号">
                <el-input v-model="form.sanitaryPermitNumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="营业执照电子图">
                <el-upload
                  class="avatar-uploader"
                  action="http://172.16.0.110/common/upload"
                  :show-file-list="false"
                  :on-success="operateSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="businessLicense"
                    :src="businessLicense"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="卫生许可证电子图">
                <el-upload
                  class="avatar-uploader"
                  action="http://172.16.0.110/common/upload"
                  :show-file-list="false"
                  :on-success="healthSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="healthPermit" :src="healthPermit" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
import lodash from "lodash";
import base from "@/api/base";
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
        certificateType: "0",
        certificateNumber: "",
        phone: "",
        mobilePhone: ""
      },
      submissionStatus: false,
      imageUrl: "",
      businessLicense: "",
      healthPermit: "",
      options: [
        {
          value: "0",
          label: "身份证"
        },
        {
          value: "1",
          label: "护照"
        },
        {
          value: "2",
          label: "其他"
        }
      ]
    };
  },
  mounted() {
    if (lodash.isEqual(this.parentData.state, "update")) {
      this.$api.supplierManageAPI
        .getSupplierInfo({ supplierId: this.parentData.supplierId })
        .then(res => {
          this.form = res.data;
          this.businessLicense =
            base.defaultBaseUrl + res.data.businessLicenseElecChart;
          this.healthPermit =
            base.defaultBaseUrl + res.data.sanitaryPermitElecChart;
        });
    }
  },
  methods: {
    onSubmit() {
      this.submissionStatus = true;
      if (lodash.isEqual(this.parentData.state, "add")) {
        this.$api.supplierManageAPI.addSupplierInfo(this.form).then(res => {
          this.$layer.msg(res.msg);
          // 刷新父页面数据
          this.$parent.search();
          this.$layer.close(this.layerid);
        });
      } else {
        // 更新
        this.form.supplierId = this.parentData.supplierId;
        this.$api.supplierManageAPI.updateSupplierInfo(this.form).then(res => {
          this.$layer.msg(res.msg);
          // 刷新父页面数据
          this.$parent.search();
          this.$layer.close(this.layerid);
        });
      }
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
@import "~@/assets/scss/supplier-list-edit-page";
</style>
