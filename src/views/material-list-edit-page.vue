<template>
  <div id="layerContent" class="sys-user-edit">
    <div class="content-panel">
      <div class="main-content">
        <el-form ref="form" :model="form" :rules="rules" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="商品图" prop="coverFigurePath">
                <el-image
                  :class="{ hide: !form.coverFigurePath }"
                  :src="coverFigurePathAndBase"
                  :preview-src-list="[coverFigurePathAndBase]"
                  class="avatar"
                >
                </el-image>
                <el-upload
                  class="avatar-uploader"
                  :class="{ hide: form.coverFigurePath }"
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
              <el-form-item label="商品名称" prop="name">
                <el-input
                  v-model="form.name"
                  size="small"
                  placeholder="请输入商品名称"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="分类" prop="secondCategoryName">
                <el-select
                  v-model="form.classifyName"
                  value=""
                  size="small"
                  @change="categoryChange"
                  placeholder="请选择大类"
                  ref="classify"
                  @click.native.once="getSelect('classify')"
                >
                  <el-option
                    v-for="(item, index) in firstCategorys"
                    :key="index"
                    :label="item.name"
                    :value="item.classifyId"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="form.categoryName"
                  value=""
                  size="small"
                  placeholder="请选择小类"
                >
                  <el-option
                    v-for="(item, index) in secondCategorys"
                    :key="index"
                    :label="item.name"
                    :value="item.categoryId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="品牌">
                <el-select
                  v-model="form.brandName"
                  value=""
                  size="small"
                  placeholder="请选择品牌"
                  @click.native.once="getSelect('brand')"
                >
                  <el-option
                    v-for="(item, index) in brands"
                    :key="index"
                    :label="item.brandName"
                    :value="item.brandId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="单位" prop="unitName">
                <el-select
                  v-model="form.unitName"
                  value=""
                  size="small"
                  placeholder="请选择单位"
                  @click.native.once="getSelect('unit')"
                >
                  <el-option
                    v-for="(item, index) in units"
                    :key="index"
                    :label="item.unitName"
                    :value="item.unitId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="价格" prop="price">
                <el-input
                  v-model="form.price"
                  size="small"
                  placeholder="请输入商品价格"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="规格">
                <el-input
                  v-model="form.specs"
                  size="small"
                  placeholder="请输入商品规格"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态" prop="statusName">
                <el-select
                  v-model="form.statusName"
                  value=""
                  size="small"
                  placeholder="请选择商品状态"
                  @click.native.once="getSelect('status')"
                >
                  <el-option
                    v-for="(item, index) in statuses"
                    :key="index"
                    :label="item.statusName"
                    :value="item.statusCodeId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="起售数" prop="saleNum">
                <el-input
                  v-model="form.saleNum"
                  size="small"
                  placeholder="请输入商品起售数"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="库存数" prop="inventoryNum">
                <el-input
                  v-model="form.inventoryNum"
                  size="small"
                  placeholder="请输入商品库存数"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否新产品">
                <el-select
                  v-model="form.newProductName"
                  value=""
                  size="small"
                  placeholder="是否新产品"
                >
                  <el-option label="是" :value="true"></el-option>
                  <el-option label="否" :value="false"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否特价">
                <el-select
                  v-model="form.specialName"
                  value=""
                  size="small"
                  placeholder="是否特价"
                >
                  <el-option label="是" :value="true"></el-option>
                  <el-option label="否" :value="false"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="描述">
            <el-input
              v-model="form.describe"
              type="textarea"
              rows="4"
              resize="none"
              placeholder="请输入商品描述"
            ></el-input>
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
import _ from "lodash";
import base from "@/api/base";
export default {
  name: "order-list-edit-page",
  data() {
    return {
      form: {
        name: "", // 商品名
        categoryId: "", // 分类id
        classifyName: "", // 一级分类名
        categoryName: "", // 二级分类名
        coverFigurePath: "", // 商品图地址
        unitId: "", // 单位id
        unitName: "", // 单位名
        brandId: "", // 品牌id
        brandName: "", // 品牌名
        inventoryNum: 0, // 库存数
        statusCode: "", // 数据状态
        statusName: "", // 数据状态名
        special: false, // 是否特价
        specialName: "否", // 是否特价选项名
        specs: "", // 规格
        describe: "", // 描述
        newProduct: false, // 是否新产品
        newProductName: "否", // 是否新产品选项名
        price: "", // 价格
        saleNum: 1 //起售数
      },
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        coverFigurePath: [{ required: true, message: "请上传商品图" }],
        categoryName: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        saleNum: [{ required: true, message: "请输入起售数", trigger: "blur" }],
        unitName: [
          { required: true, message: "请选择单位", trigger: "change" }
        ],
        inventoryNum: [
          { required: true, message: "请输入库存数", trigger: "blur" }
        ],
        statusName: [
          { required: true, message: "请选择商品状态", trigger: "change" }
        ]
      },
      statuses: [], // 状态集合
      firstCategorys: [], // 一级分类集合
      secondCategorys: [], // 二级分类集合
      units: [], // 单位集合
      brands: [], // 品牌集合
      submissionStatus: false // 提交状态
    };
  },
  computed: {
    coverFigurePathAndBase() {
      return base.defaultBaseUrl + this.form.coverFigurePath;
    }
  },
  methods: {
    onSubmit() {
      !_.isNaN(+this.form.categoryName) &&
        (this.form.categoryId = this.form.categoryName);
      !_.isNaN(+this.form.unitName) && (this.form.unitId = this.form.unitName);
      !_.isNaN(+this.form.brandName) &&
        (this.form.brandId = this.form.brandName);
      !_.isNaN(+this.form.statusName) &&
        (this.form.statusCode = this.form.statusName);
      !_.isNaN(+this.form.specialName) &&
        (this.form.special = this.form.specialName);
      !_.isNaN(+this.form.newProductName) &&
        (this.form.newProduct = this.form.newProductName);
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.parentData.state === "add") {
            this.$api.materialManageAPI.addMaterialInfo(this.form).then(res => {
              this.$layer.msg(res.msg);
              this.$parent.search();
              this.$layer.close(this.layerid);
            });
          } else {
            this.form.materialId = this.parentData.materialId;
            this.$api.materialManageAPI
              .updateMaterialInfo(this.form)
              .then(res => {
                this.$layer.msg(res.msg);
                this.$parent.search();
                this.$layer.close(this.layerid);
              });
          }
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.$layer.close(this.layerid);
    },
    uploadSuccess(res) {
      this.form.coverFigurePath = res.data.path;
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
    },
    categoryChange(val) {
      this.form.categoryName = "";
      // 获取二级分类集合
      this.$api.materialManageAPI
        .getMaterialCategory({ classifyId: val })
        .then(res => {
          this.secondCategorys = res.data;
        });
    },
    getSelect(status) {
      switch (status) {
        case "status":
          // 获取商品状态集合
          this.$api.materialManageAPI.getMaterialStatus({}).then(res => {
            this.statuses = res.data;
          });
          break;
        case "unit":
          // 获取商品单位集合
          this.$api.materialManageAPI.getMaterialUnit({}).then(res => {
            this.units = res.data;
          });
          break;
        case "brand":
          // 获取商品品牌集合
          this.$api.materialManageAPI.getMaterialBrand({}).then(res => {
            this.brands = res.data;
          });
          break;
        case "classify":
          // 获取一级分类集合
          this.$api.materialManageAPI.getClassify({}).then(res => {
            this.firstCategorys = res.data;
          });
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    if (this.parentData.state === "update") {
      this.$api.materialManageAPI
        .getMaterialInfo({
          materialId: this.parentData.materialId
        })
        .then(res => {
          if (_.isEqual(res.code, "success")) {
            Object.assign(this.form, res.data);
            this.categoryChange(this.form.classifyId);
          } else {
            this.$vb.plugin.message.error(`获取订单信息失败:${res.code}`);
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
@import "~@/assets/scss/order-list-edit-page";
</style>
