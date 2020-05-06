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
                  :action="baseUrl + '/common/upload'"
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
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="分类" prop="categoryId">
                <el-select
                  v-model="defaultClassifyId"
                  value=""
                  size="small"
                  @change="categoryChange"
                  placeholder="请选择大类"
                  ref="classify"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in firstCategorys"
                    :key="index"
                    :label="item.name"
                    :value="item.classifyId"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="defaultCategoryId"
                  value=""
                  size="small"
                  placeholder="请选择小类"
                  clearable
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
                  v-model="defaultBrandId"
                  value=""
                  size="small"
                  placeholder="请选择品牌"
                  clearable
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
              <el-form-item label="单位" prop="unitId">
                <el-select
                  v-model="defaultUnitId"
                  value=""
                  size="small"
                  placeholder="请选择单位"
                  clearable
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
                <el-input-number
                  :min="0"
                  v-model="form.price"
                  size="small"
                  :precision="2"
                  :controls="false"
                  placeholder="请输入商品价格"
                  clearable
                ></el-input-number>
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
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态" prop="statusCode">
                <el-select
                  v-model="defaultStatusCode"
                  value=""
                  size="small"
                  placeholder="请选择商品状态"
                  clearable
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
                <el-input-number
                  :min="0"
                  v-model="form.saleNum"
                  size="small"
                  :controls="false"
                  placeholder="请输入商品起售数"
                  :style="{ 'text-align': 'left' }"
                  clearable
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="库存数" prop="inventoryNum">
                <el-input-number
                  :min="0"
                  v-model="form.inventoryNum"
                  size="small"
                  :controls="false"
                  placeholder="请输入商品库存数"
                  clearable
                ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="新产品">
                <el-select
                  v-model="defaultNewProduct"
                  value=""
                  size="small"
                  placeholder="新产品"
                >
                  <el-option label="是" :value="true"></el-option>
                  <el-option label="否" :value="false"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="特价">
                <el-select
                  v-model="defaultSpecial"
                  value=""
                  size="small"
                  placeholder="特价"
                >
                  <el-option label="是" :value="true"></el-option>
                  <el-option label="否" :value="false"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="轮播图">
            <el-upload
              :action="baseUrl + '/common/upload'"
              list-type="picture-card"
              :on-remove="
                (file, fileList) => {
                  return handleRemove(file, fileList);
                }
              "
              :on-success="
                (response, file, fileList) => {
                  return onSuccess(response, file, fileList);
                }
              "
              :file-list="form.pictureList"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input
              v-model="form.describe"
              type="textarea"
              rows="4"
              resize="none"
              placeholder="请输入商品描述"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="商品详情">
            <tinymce-editor
              v-if="isLoaded"
              ref="editor"
              v-model="form.detailContent"
              :value="form.detailContent"
              placeholder="请输入商品详情"
            />
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
import TinymceEditor from "@/components/TinymceEditor";

export default {
  name: "order-list-edit-page",
  components: { TinymceEditor },
  data() {
    return {
      form: {
        name: "", // 商品名
        categoryId: "", // 分类id
        coverFigurePath: "", // 商品图地址
        unitId: "", // 单位id
        brandId: "", // 品牌id
        inventoryNum: 0, // 库存数
        statusCode: "", // 数据状态
        special: false, // 是否特价
        specs: "", // 规格
        describe: "", // 描述
        detailContent: "", // 详情
        newProduct: false, // 是否新产品
        price: "", // 价格
        saleNum: 1, //起售数
        pictureList: [] // 轮播图
      },
      defaultStatusCode: "",
      defaultClassifyId: "",
      defaultCategoryId: "",
      defaultUnitId: "",
      defaultBrandId: "",
      defaultSpecial: "",
      defaultNewProduct: "",
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        coverFigurePath: [{ required: true, message: "请上传商品图" }],
        categoryId: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        saleNum: [{ required: true, message: "请输入起售数", trigger: "blur" }],
        unitId: [{ required: true, message: "请选择单位", trigger: "change" }],
        inventoryNum: [
          { required: true, message: "请输入库存数", trigger: "blur" }
        ],
        statusCode: [
          { required: true, message: "请选择商品状态", trigger: "change" }
        ]
      },
      statuses: [], // 状态集合
      firstCategorys: [], // 一级分类集合
      secondCategorys: [], // 二级分类集合
      units: [], // 单位集合
      brands: [], // 品牌集合
      submissionStatus: false, // 提交状态
      baseUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      isLoaded: false
    };
  },
  computed: {
    coverFigurePathAndBase() {
      return this.baseUrl + this.form.coverFigurePath;
    }
  },
  watch: {
    defaultCategoryId() {
      this.form.categoryId = this.defaultCategoryId;
    },
    defaultUnitId() {
      this.form.unitId = this.defaultUnitId;
    },
    defaultBrandId() {
      this.form.brandId = this.defaultBrandId;
    },
    defaultStatusCode() {
      this.form.statusCode = this.defaultStatusCode;
    },
    defaultSpecial() {
      this.form.special = this.defaultSpecial;
    },
    defaultNewProduct() {
      this.form.newProduct = this.defaultNewProduct;
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.form);
          if (this.parentData.state === "add") {
            this.$api.materialManageAPI.addMaterialInfo(this.form).then(res => {
              if (_.isEqual(res.code, "success")) {
                this.$layer.msg(res.msg);
                this.$parent.search();
                this.$layer.close(this.layerid);
              } else {
                self.$vb.plugin.message.error("失败", res.msg);
              }
            });
          } else {
            this.form.materialId = this.parentData.materialId;
            this.$api.materialManageAPI
              .updateMaterialInfo(this.form)
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
    },
    uploadSuccess(res) {
      this.form.coverFigurePath = res.data.path;
    },
    beforeUpload(file) {
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
    categoryChange(val) {
      this.defaultCategoryId = "";
      // 获取二级分类集合
      this.getSecondCategorys(val);
    },
    getSecondCategorys(val) {
      // 获取二级分类集合
      this.$api.materialManageAPI
        .getMaterialCategory({ classifyId: val })
        .then(res => {
          this.secondCategorys = res.data;
        });
    },
    getSelect() {
      // 获取商品状态集合
      this.$api.materialManageAPI.getMaterialStatus({}).then(res => {
        this.statuses = res.data;
      });
      // 获取商品单位集合
      this.$api.materialManageAPI.getMaterialUnit({}).then(res => {
        this.units = res.data;
      });
      // 获取商品品牌集合
      this.$api.materialManageAPI.getMaterialBrand({}).then(res => {
        this.brands = res.data;
      });
      // 获取一级分类集合
      this.$api.materialManageAPI.getClassify({}).then(res => {
        this.firstCategorys = res.data;
      });
    },
    // eslint-disable-next-line no-unused-vars
    handleRemove(file) {
      let Pics = this.form.pictureList;
      Pics.forEach((item, index) => {
        if (file.uid === item.uid) {
          Pics.splice(index, 1);
        }
      });
    },
    // 照片墙上传成功的回调
    onSuccess(response, file, fileList) {
      // 照片墙文件列表
      console.log(fileList);
      // 用于el的照片墙图片显示，后台要的数据格式需要重新弄个数组
      file.path = response.data.path;
      this.form.pictureList.push(file);
    }
  },
  mounted() {
    const self = this;
    this.baseUrl = base.defaultBaseUrl;
    this.getSelect();
    this.isLoaded = true;
    if (this.parentData.state === "update") {
      this.$api.materialManageAPI
        .getMaterialInfo({
          materialId: this.parentData.materialId
        })
        .then(res => {
          if (_.isEqual(res.code, "success")) {
            res.data.pictureList.forEach(item => {
              // 用于渲染照片墙,必要的4个参数
              item.name = item.path;
              item.url = this.baseUrl + item.path;
            });
            Object.assign(this.form, res.data);
            this.defaultClassifyId = res.data.classifyId;
            this.defaultCategoryId = res.data.categoryId;
            this.defaultUnitId = res.data.unitId;
            this.defaultBrandId = res.data.brandId;
            this.defaultStatusCode = res.data.statusCode;
            this.defaultSpecial = res.data.special;
            this.defaultNewProduct = res.data.newProduct;
            this.getSecondCategorys(this.form.classifyId);
          } else {
            this.$vb.plugin.message.error(`获取订单信息失败:${res.code}`);
          }
          self.isLoaded = false;
          this.$nextTick(() => {
            self.isLoaded = true;
          });
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
@import "~@/assets/scss/order-list-edit-page.scss";
</style>
