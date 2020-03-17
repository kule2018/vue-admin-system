<template>
  <div id="layerContent" class="sys-user-edit">
    <div class="content-panel">
      <div class="main-content">
        <el-form ref="form" :model="form" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="商品图">
                <el-image
                  :class="{ hide: !form.coverFigurePath }"
                  :src="form.coverFigurePath"
                  :preview-src-list="[form.coverFigurePath]"
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
              <el-form-item label="商品名称">
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
              <el-form-item label="分类">
                <el-select
                  v-model="form.firstCategoryName"
                  value=""
                  size="small"
                  @change="categoryChange"
                  placeholder="请选择大类"
                >
                  <el-option
                    v-for="(item, index) in firstCategorys"
                    :key="index"
                    :label="item.name"
                    :value="item.classifyId"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="form.secondCategoryName"
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
              <el-form-item label="单位">
                <el-select
                  v-model="form.unitName"
                  value=""
                  size="small"
                  placeholder="请选择单位"
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
              <el-form-item label="价格">
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
              <el-form-item label="状态">
                <el-select
                  v-model="form.statusName"
                  value=""
                  size="small"
                  placeholder="请输入商品状态"
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
              <el-form-item label="起售数">
                <el-input
                  v-model="form.saleNum"
                  size="small"
                  placeholder="请输入商品起售数"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="库存数">
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
        firstCategoryName: "", // 一级分类名
        secondCategoryName: "", // 二级分类名
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
        price: 0, // 价格
        saleNum: 1 //起售数
      },
      statuses: [], // 状态集合
      firstCategorys: [], // 一级分类集合
      secondCategorys: [], // 二级分类集合
      units: [], // 单位集合
      brands: [], // 品牌集合
      submissionStatus: false // 提交状态
    };
  },
  methods: {
    onSubmit() {
      if (this.form.secondCategoryName === "") {
        !_.isNaN(+this.form.firstCategoryName) &&
          (this.form.categoryId = this.form.firstCategoryName);
      } else {
        !_.isNaN(+this.form.secondCategoryName) &&
          (this.form.categoryId = this.form.secondCategoryName);
      }
      !_.isNaN(+this.form.unitName) && (this.form.unitId = this.form.unitName);
      !_.isNaN(+this.form.brandName) &&
        (this.form.brandId = this.form.brandName);
      !_.isNaN(+this.form.statusName) &&
        (this.form.statusCode = this.form.statusName);
      !_.isNaN(+this.form.specialName) &&
        (this.form.special = this.form.specialName);
      !_.isNaN(+this.form.newProductName) &&
        (this.form.newProduct = this.form.newProductName);
      console.log(this.form);
      if (this.parentData.state === "add") {
        this.$api.orderManageAPI.addOrderInfo(this.form).then(res => {
          this.$layer.msg(res.msg);
          this.$parent.search();
          this.$layer.close(this.layerid);
        });
      } else {
        this.form.materialId = this.parentData.materialId;
        this.$api.orderManageAPI.updateOrderInfo(this.form).then(res => {
          this.$layer.msg(res.msg);
          this.$parent.search();
          this.$layer.close(this.layerid);
        });
      }
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
      console.log(val);
      this.form.secondCategoryName = "";
      // 获取二级分类集合
      this.$api.orderManageAPI
        .getMaterialCategory({ classifyId: val })
        .then(res => {
          this.secondCategorys = res.data;
        });
    }
  },
  mounted() {
    // 获取商品状态集合
    this.$api.orderManageAPI.getMaterialStatus({}).then(res => {
      this.statuses = res.data;
    });
    // 获取商品单位集合
    this.$api.orderManageAPI.getMaterialUnit({}).then(res => {
      this.units = res.data;
    });
    // 获取商品品牌集合
    this.$api.orderManageAPI.getMaterialBrand({}).then(res => {
      this.brands = res.data;
    });
    // 获取一级分类集合
    this.$api.orderManageAPI.getClassify({}).then(res => {
      this.firstCategorys = res.data;
    });
    if (this.parentData.state === "update") {
      this.$api.orderManageAPI
        .getOrderInfo({
          materialId: this.parentData.materialId
        })
        .then(res => {
          if (_.isEqual(res.code, "success")) {
            res.data.coverFigurePath =
              base.defaultBaseUrl + res.data.coverFigurePath;
            Object.assign(this.form, res.data);
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
